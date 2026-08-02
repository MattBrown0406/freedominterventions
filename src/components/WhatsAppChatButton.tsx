import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "5038362136";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("shrink-0 block", className)}
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.09-1.33A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.4a8.38 8.38 0 01-4.28-1.17l-.31-.18-3.17.83.84-3.09-.19-.31A8.41 8.41 0 003.6 12c0-4.64 3.76-8.4 8.4-8.4 2.25 0 4.36.88 5.95 2.47A8.38 8.38 0 0120.4 12c0 4.64-3.76 8.4-8.4 8.4zm3.97-5.93c-.22-.11-1.29-.64-1.49-.72-.2-.08-.34-.12-.48.11-.14.22-.54.71-.66.85-.12.15-.24.16-.44.08-.2-.08-.85-.32-1.62-.98-.59-.53-.99-1.19-1.11-1.39-.12-.2-.01-.3.09-.4.09-.09.19-.23.29-.35.09-.13.13-.22.19-.35.06-.14.03-.26-.02-.35-.05-.1-.43-1.03-.58-1.41-.16-.37-.31-.32-.43-.33-.11-.01-.24-.01-.36-.01-.13 0-.34.05-.52.24-.18.2-.68.69-.68 1.68 0 .99.71 1.95.81 2.09.1.14 1.41 2.16 3.41 3.03.48.21.85.33 1.14.43.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.17-.47.17-.87.12-.95-.05-.08-.18-.14-.36-.23z" />
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
    default: "h-5 w-5",
    lg: "h-5 w-5",
    xl: "h-6 w-6",
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
