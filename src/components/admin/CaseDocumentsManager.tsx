import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Trash2, FileText, Image, File, RefreshCw } from "lucide-react";

const API_BASE = "https://rizfkjgwhcpwiryyqejx.supabase.co/functions/v1/case-documents";
const API_KEY = import.meta.env.VITE_CASE_DOCS_API_KEY || "";

const DOC_TYPES: { value: string; label: string }[] = [
  { value: "insurance_card", label: "Insurance Card" },
  { value: "intervention_letter", label: "Intervention Letter" },
  { value: "treatment_plan", label: "Treatment Plan" },
  { value: "assessment", label: "Assessment" },
  { value: "medical_record", label: "Medical Record" },
  { value: "legal_document", label: "Legal Document" },
  { value: "consent_form", label: "Consent Form" },
  { value: "correspondence", label: "Correspondence" },
  { value: "photo", label: "Photo / Screenshot" },
  { value: "other", label: "Other" },
];

interface CaseDoc {
  id: string;
  notion_case_id: string;
  client_name: string;
  doc_type: string;
  title: string;
  mime_type: string;
  file_size: number;
  file_path: string;
  notes?: string;
  created_at: string;
}

function fileIcon(mime: string) {
  if (mime?.startsWith("image/")) return <Image className="w-4 h-4 text-blue-500" />;
  if (mime === "application/pdf") return <FileText className="w-4 h-4 text-red-500" />;
  return <File className="w-4 h-4 text-gray-400" />;
}

function formatBytes(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function docTypeLabel(value: string) {
  return DOC_TYPES.find(d => d.value === value)?.label || value;
}

export default function CaseDocumentsManager() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [caseId, setCaseId] = useState("");
  const [caseIdInput, setCaseIdInput] = useState("");
  const [clientName, setClientName] = useState("");
  const [docs, setDocs] = useState<CaseDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Upload form state
  const [docType, setDocType] = useState("other");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const headers = { "x-api-key": API_KEY };

  const fetchDocs = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/list?notion_case_id=${encodeURIComponent(id)}`, { headers });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setDocs(data.documents || data || []);
    } catch (err: unknown) {
      toast({ title: "Error loading documents", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const id = caseIdInput.trim();
    setCaseId(id);
    fetchDocs(id);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !caseId) return;
    if (!title.trim()) {
      toast({ title: "Please enter a title for this document", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      const metadata = {
        notion_case_id: caseId,
        client_name: clientName.trim() || "Unknown",
        doc_type: docType,
        title: title.trim(),
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      };
      const metaBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
      form.append("metadata", metaBlob);
      form.append("file", file, file.name);

      const res = await fetch(`${API_BASE}/upload`, { method: "POST", headers, body: form });
      if (!res.ok) throw new Error(await res.text());

      toast({ title: "Upload successful", description: `${file.name} added to case` });
      setTitle("");
      setNotes("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchDocs(caseId);
    } catch (err: unknown) {
      toast({ title: "Upload failed", description: String(err), variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: CaseDoc) => {
    try {
      const res = await fetch(`${API_BASE}/download?file_path=${encodeURIComponent(doc.file_path)}`, { headers });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      window.open(data.url || data.signedUrl || data.file_url, "_blank");
    } catch (err: unknown) {
      toast({ title: "Download failed", description: String(err), variant: "destructive" });
    }
  };

  const handleDelete = async (doc: CaseDoc) => {
    if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_BASE}/delete?id=${encodeURIComponent(doc.id)}`, { method: "DELETE", headers });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Document deleted" });
      setDocs(prev => prev.filter(d => d.id !== doc.id));
    } catch (err: unknown) {
      toast({ title: "Delete failed", description: String(err), variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4" /> Case Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Notion Case ID..."
              value={caseIdInput}
              onChange={e => setCaseIdInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={!caseIdInput.trim() || loading} size="sm">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Load"}
            </Button>
          </div>

          {/* Upload form */}
          {caseId && (
            <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50/50">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Upload Document</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Client Name</label>
                  <input
                    className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    placeholder="e.g. Rokas Gedbudas"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Document Type</label>
                  <select
                    className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white"
                    value={docType}
                    onChange={e => setDocType(e.target.value)}
                  >
                    {DOC_TYPES.map(dt => (
                      <option key={dt.value} value={dt.value}>{dt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Title <span className="text-red-400">*</span></label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="e.g. United Healthcare Insurance Card"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Notes (optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="e.g. Member ID: 12345, Group: 67890"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
                />
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || !title.trim()}
                  className="gap-2"
                >
                  {uploading
                    ? <><RefreshCw className="w-4 h-4 animate-spin" /> Uploading...</>
                    : <><Upload className="w-4 h-4" /> Choose File & Upload</>
                  }
                </Button>
                <span className="text-xs text-muted-foreground">Images, PDFs, Word, Excel</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document list */}
      {caseId && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              {docs.length} document{docs.length !== 1 ? "s" : ""} on file
            </h3>
            <Button variant="ghost" size="sm" onClick={() => fetchDocs(caseId)} className="gap-1 text-xs">
              <RefreshCw className="w-3 h-3" /> Refresh
            </Button>
          </div>

          {loading ? (
            <p className="text-center text-sm text-muted-foreground py-8">Loading documents...</p>
          ) : docs.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground text-sm">
                No documents found for this case. Upload one above.
              </CardContent>
            </Card>
          ) : (
            docs.map(doc => (
              <Card key={doc.id}>
                <CardContent className="py-3 px-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {fileIcon(doc.mime_type)}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                      <div className="flex gap-2 flex-wrap mt-0.5 items-center">
                        <Badge variant="secondary" className="text-xs">{docTypeLabel(doc.doc_type)}</Badge>
                        <span className="text-xs text-muted-foreground">{formatBytes(doc.file_size)}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(doc.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        {doc.notes && <span className="text-xs text-muted-foreground italic truncate max-w-[200px]">"{doc.notes}"</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc)} className="gap-1">
                      <Download className="w-3.5 h-3.5" /> View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(doc)} className="gap-1 text-red-600 hover:text-red-700 hover:border-red-300">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
