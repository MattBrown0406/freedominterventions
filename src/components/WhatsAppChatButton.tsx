import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "5038362136";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("shrink-0", className)}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 3.499h-.004a9.363 9.363 0 01-4.713-1.279l-.337-.201-3.49.914.932-3.399-.217-.346a9.67 9.67 0 01-1.469-5.162c0-5.352 4.353-9.705 9.711-9.705 2.595 0 5.035 1.01 6.871 2.841a9.633 9.633 0 012.84 6.867c0 5.353-4.353 9.705-9.704 9.705m8.291-18.202c-2.349-2.348-5.47-3.645-8.786-3.645-6.854 0-12.431 5.577-12.431 12.431 0 2.19.573 4.331 1.656 6.216l-1.756 6.416 6.565-1.721a12.39 12.39 0 005.946 1.517h.005c6.854 0 12.431-5.577 12.431-12.432 0-3.316-1.291-6.437-3.64-8.786" />
  </svg>
);

interface WhatsAppChatButtonProps {
  phoneNumber?: string;
  variant?: "solid" | "outline" | "dark";
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

const WhatsAppChatButton = ({
  phoneNumber = WHATSAPP_NUMBER,
  variant = "solid",
  size = "default",
  className,
  children,
  label = "WhatsApp",
}: WhatsAppChatButtonProps) => {
  const handleClick = () => {
    trackEvent("whatsapp_click", {
      page_path: window.location.pathname,
      phone_number: phoneNumber,
    });
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full";

  const variantStyles = {
    solid:
      "bg-[#25D366] text-white hover:bg-[#128C7E] focus-visible:ring-[#25D366] shadow-md hover:shadow-lg",
    outline:
      "border-2 border-[#25D366] bg-transparent text-[#25D366] hover:bg-[#25D366] hover:text-white focus-visible:ring-[#25D366]",
    dark:
      "border-2 border-white/30 bg-white/10 text-white hover:bg-[#25D366] hover:border-[#25D366] hover:text-white focus-visible:ring-white",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    default: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base",
    xl: "h-14 px-10 text-base",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    default: "h-4 w-4",
    lg: "h-5 w-5",
    xl: "h-5 w-5",
  };

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className={iconSizes[size]} />
      {children || label}
    </a>
  );
};

export default WhatsAppChatButton;
