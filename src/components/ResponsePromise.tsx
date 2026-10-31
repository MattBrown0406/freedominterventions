import { Clock, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

// Single source for the response-time promise and Spanish availability, so the
// wording stays consistent everywhere families see it.
export const RESPONSE_PROMISE =
  "Matt personally returns calls, voicemails, and emails within 4 hours. If he is with a family during an intervention, it may take a little longer.";
export const RESPONSE_PROMISE_SHORT = "Matt replies personally within 4 hours";
export const SPANISH_AVAILABLE =
  "Se habla español. Matt speaks fluent Spanish and can work with your family in Spanish.";

type ResponsePromiseProps = {
  /** "card" = boxed block; "inline" = compact lines for heroes and forms. */
  variant?: "card" | "inline";
  showSpanish?: boolean;
  className?: string;
};

const ResponsePromise = ({ variant = "inline", showSpanish = true, className }: ResponsePromiseProps) => {
  const lines = (
    <>
      <p className="flex items-start gap-2">
        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>{RESPONSE_PROMISE}</span>
      </p>
      {showSpanish && (
        <p className="flex items-start gap-2" lang="es">
          <Languages className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">Se habla español.</strong>{" "}
            <span lang="en">Matt speaks fluent Spanish and can work with your family in Spanish.</span>
          </span>
        </p>
      )}
    </>
  );

  if (variant === "card") {
    return (
      <div className={cn("rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground space-y-2 text-left", className)}>
        {lines}
      </div>
    );
  }
  return <div className={cn("text-sm text-muted-foreground space-y-1.5 text-left", className)}>{lines}</div>;
};

export default ResponsePromise;
