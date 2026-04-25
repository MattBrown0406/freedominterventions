import jsPDF from "jspdf";

export type ContractPdfPayload = {
  contractTitle: string;
  contractVersion: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  signerName: string;
  signedAt: string;
  bookingTypeLabel: string;
  amountLabel: string;
  discountCode?: string;
  discountLabel?: string;
  metadata?: Record<string, string | null | undefined>;
  agreementText: string;
};

const addWrappedText = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight = 6) => {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
};

export const generateContractPdf = (payload: ContractPdfPayload): Blob => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 54;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed = 60) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(payload.contractTitle, margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(`Version ${payload.contractVersion}`, margin, y);
  y += 24;
  doc.setTextColor(20, 20, 20);

  const details: Array<[string, string]> = [
    ["Client", payload.clientName],
    ["Email", payload.clientEmail],
    ["Phone", payload.clientPhone],
    ["Signer", payload.signerName],
    ["Signed", new Date(payload.signedAt).toLocaleString()],
    ["Type", payload.bookingTypeLabel],
    ["Amount", payload.amountLabel],
  ];

  if (payload.discountCode) details.push(["Discount code", payload.discountCode]);
  if (payload.discountLabel) details.push(["Discount applied", payload.discountLabel]);

  if (payload.metadata) {
    for (const [key, value] of Object.entries(payload.metadata)) {
      if (value) details.push([key, value]);
    }
  }

  details.forEach(([label, value]) => {
    ensureSpace(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, value, margin + 88, y, maxWidth - 88, 14);
    y += 2;
  });

  y += 10;
  ensureSpace(40);
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Agreement Text", margin, y);
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const paragraphs = payload.agreementText.split(/\n{2,}/);
  for (const paragraph of paragraphs) {
    ensureSpace(32);
    y = addWrappedText(doc, paragraph.replace(/\n/g, " "), margin, y, maxWidth, 14);
    y += 8;
  }

  ensureSpace(70);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Electronic Signature", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.text(`Signed electronically by ${payload.signerName}`, margin, y);
  y += 14;
  doc.text(`Timestamp: ${new Date(payload.signedAt).toLocaleString()}`, margin, y);

  return doc.output("blob");
};
