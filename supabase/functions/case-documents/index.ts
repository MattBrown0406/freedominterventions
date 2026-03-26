import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-api-key",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function error(msg: string, status = 400) {
  return json({ error: msg }, status);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // --- Auth: check x-api-key header ---
  const apiKey = req.headers.get("x-api-key");
  const expectedKey = Deno.env.get("CASE_DOCS_API_KEY");
  if (!expectedKey || apiKey !== expectedKey) {
    return error("Unauthorized", 401);
  }

  // Service-role client to bypass RLS
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  const action = url.pathname.split("/").pop(); // upload | list | download | delete

  try {
    // ===================== UPLOAD =====================
    if (req.method === "POST" && action === "upload") {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const metadata = JSON.parse(
        (formData.get("metadata") as string) || "{}"
      );

      const {
        notion_case_id,
        client_name,
        doc_type,
        title,
        notes,
        uploaded_by,
      } = metadata;

      if (!notion_case_id || !client_name || !doc_type || !title) {
        return error(
          "metadata must include notion_case_id, client_name, doc_type, title"
        );
      }

      let file_url: string | null = null;
      let file_path: string | null = null;
      let file_size: number | null = null;
      let mime_type: string | null = null;

      // Upload file to storage if provided
      if (file) {
        const ext = file.name.split(".").pop() || "bin";
        file_path = `${notion_case_id}/${Date.now()}_${title.replace(/[^a-zA-Z0-9_-]/g, "_")}.${ext}`;
        mime_type = file.type || "application/octet-stream";
        file_size = file.size;

        const { error: uploadErr } = await supabase.storage
          .from("case-documents")
          .upload(file_path, file, {
            contentType: mime_type,
            upsert: false,
          });

        if (uploadErr) {
          return error(`Storage upload failed: ${uploadErr.message}`, 500);
        }

        // Generate a signed URL valid for 1 hour
        const { data: signedData } = await supabase.storage
          .from("case-documents")
          .createSignedUrl(file_path, 3600);

        file_url = signedData?.signedUrl || null;
      }

      // Insert row
      const { data, error: insertErr } = await supabase
        .from("case_documents")
        .insert({
          notion_case_id,
          client_name,
          doc_type,
          title,
          file_url,
          file_path,
          file_size,
          mime_type,
          notes: notes || null,
          uploaded_by: uploaded_by || null,
        })
        .select()
        .single();

      if (insertErr) {
        return error(`Insert failed: ${insertErr.message}`, 500);
      }

      return json({ success: true, document: data }, 201);
    }

    // ===================== LIST =====================
    if (req.method === "GET" && action === "list") {
      const notion_case_id = url.searchParams.get("notion_case_id");
      if (!notion_case_id) {
        return error("notion_case_id query param required");
      }

      const { data, error: listErr } = await supabase
        .from("case_documents")
        .select("*")
        .eq("notion_case_id", notion_case_id)
        .order("created_at", { ascending: false });

      if (listErr) {
        return error(`List failed: ${listErr.message}`, 500);
      }

      return json({ documents: data });
    }

    // ===================== DOWNLOAD =====================
    if (req.method === "GET" && action === "download") {
      const file_path = url.searchParams.get("file_path");
      if (!file_path) {
        return error("file_path query param required");
      }

      const { data, error: signErr } = await supabase.storage
        .from("case-documents")
        .createSignedUrl(file_path, 3600);

      if (signErr) {
        return error(`Signed URL failed: ${signErr.message}`, 500);
      }

      return json({ signed_url: data.signedUrl });
    }

    // ===================== DELETE =====================
    if (req.method === "DELETE" && action === "delete") {
      const id = url.searchParams.get("id");
      if (!id) {
        return error("id query param required");
      }

      // Get file_path first so we can delete from storage
      const { data: doc, error: fetchErr } = await supabase
        .from("case_documents")
        .select("file_path")
        .eq("id", id)
        .single();

      if (fetchErr) {
        return error(`Document not found: ${fetchErr.message}`, 404);
      }

      // Delete from storage if file exists
      if (doc?.file_path) {
        await supabase.storage
          .from("case-documents")
          .remove([doc.file_path]);
      }

      // Delete row
      const { error: deleteErr } = await supabase
        .from("case_documents")
        .delete()
        .eq("id", id);

      if (deleteErr) {
        return error(`Delete failed: ${deleteErr.message}`, 500);
      }

      return json({ success: true, deleted_id: id });
    }

    return error(
      "Unknown action. Use /upload (POST), /list (GET), /download (GET), /delete (DELETE)",
      404
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return error(`Unexpected error: ${message}`, 500);
  }
});
