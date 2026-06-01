import appStoreBadge from "@/assets/app-store-badge.svg";

const APP_STORE_URL = "https://apps.apple.com/app/id6744403069";

interface AppStoreBadgeProps {
  className?: string;
  height?: number;
}

const AppStoreBadge = ({ className = "", height = 48 }: AppStoreBadgeProps) => {
  const width = Math.round(height * 2.9916);

  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block hover:opacity-80 transition-opacity ${className}`}
      aria-label="Download FamilyBridge on the App Store"
    >
      <img
        src={appStoreBadge}
        alt="Download on the App Store"
        width={width}
        height={height}
        style={{ height: `${height}px`, width: "auto" }}
      />
    </a>
  );
};

export default AppStoreBadge;
