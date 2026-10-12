import { escapeHtml } from "./resend.ts";

export const MAX_CLIENT_NOTES_LENGTH = 5000;

export class InvalidClientNotesError extends Error {}

// Preserve the client's words, whitespace and Unicode; never repurpose operational notes.
// Validate before any booking, payment, storage or notification side effects.
export function validateClientNotes(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string" || value.length > MAX_CLIENT_NOTES_LENGTH || value.includes("\u0000")) {
    throw new InvalidClientNotesError("Client notes must be text of no more than 5,000 characters.");
  }
  return value.trim() ? value : null;
}

// Only call inside the owner's email body, never client mail, subjects or Zoom metadata.
export function renderOwnerClientNotes(value: string | null): string {
  const content = value?.trim()
    ? escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>")
    : "No notes provided";
  return `<div style="margin: 20px 0; overflow-wrap: anywhere;"><h2>Client notes</h2><p style="white-space: pre-wrap;">${content}</p></div>`;
}
