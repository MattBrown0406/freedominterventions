import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, CreditCard, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface InsuranceCardUploadProps {
  frontUrl: string;
  backUrl: string;
  onUpload: (field: string, url: string) => void;
}

const InsuranceCardUpload = ({ frontUrl, backUrl, onUpload }: InsuranceCardUploadProps) => {
  const [uploadingFront, setUploadingFront] = useState(false);
  const [uploadingBack, setUploadingBack] = useState(false);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadFile = async (file: File, side: 'front' | 'back') => {
    const isUploading = side === 'front' ? setUploadingFront : setUploadingBack;
    isUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${side}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('insurance-cards')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the file path (not public URL since bucket is private)
      const fieldName = side === 'front' ? 'insuranceCardFrontUrl' : 'insuranceCardBackUrl';
      onUpload(fieldName, filePath);

      toast({
        title: "Upload successful",
        description: `Insurance card ${side} uploaded successfully.`,
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload insurance card. Please try again.",
        variant: "destructive",
      });
    } finally {
      isUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, WebP, or PDF file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    uploadFile(file, side);
  };

  const removeFile = (side: 'front' | 'back') => {
    const fieldName = side === 'front' ? 'insuranceCardFrontUrl' : 'insuranceCardBackUrl';
    onUpload(fieldName, '');
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Health Insurance Card (Optional)
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Uploading your loved one's insurance card helps us coordinate treatment options in advance. 
          We'll verify benefits with potential treatment centers to ensure they accept the patient's 
          insurance, so you'll have vetted options ready when the time comes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Front of Card */}
        <div className="space-y-2">
          <Label>Front of Insurance Card</Label>
          <input
            ref={frontInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => handleFileChange(e, 'front')}
          />
          
          {frontUrl ? (
            <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Check className="h-4 w-4" />
                  <span>Front uploaded</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('front')}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full h-24 border-dashed border-2 hover:border-primary/50"
              onClick={() => frontInputRef.current?.click()}
              disabled={uploadingFront}
            >
              {uploadingFront ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload front of card</span>
                </div>
              )}
            </Button>
          )}
        </div>

        {/* Back of Card */}
        <div className="space-y-2">
          <Label>Back of Insurance Card</Label>
          <input
            ref={backInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => handleFileChange(e, 'back')}
          />
          
          {backUrl ? (
            <div className="border-2 border-primary/30 rounded-lg p-4 bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Check className="h-4 w-4" />
                  <span>Back uploaded</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('back')}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full h-24 border-dashed border-2 hover:border-primary/50"
              onClick={() => backInputRef.current?.click()}
              disabled={uploadingBack}
            >
              {uploadingBack ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload back of card</span>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Accepted formats: JPG, PNG, WebP, or PDF. Maximum file size: 10MB.
        Your insurance information is kept confidential and secure.
      </p>
    </div>
  );
};

export default InsuranceCardUpload;