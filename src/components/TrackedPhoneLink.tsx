import { ReactNode } from 'react';
import { useCallTracking } from '@/hooks/useCallTracking';

interface TrackedPhoneLinkProps {
  phoneNumber?: string;
  children: ReactNode;
  className?: string;
  metadata?: Record<string, unknown>;
  onClick?: () => void;
}

const TrackedPhoneLink = ({ 
  phoneNumber = '+15418386009', 
  children, 
  className,
  metadata = {},
  onClick,
}: TrackedPhoneLinkProps) => {
  const { trackCallClick } = useCallTracking();

  const handleClick = () => {
    // Format phone for display (remove + and country code formatting)
    const displayNumber = phoneNumber.replace(/\D/g, '').slice(-10);
    const formattedNumber = `${displayNumber.slice(0, 3)}-${displayNumber.slice(3, 6)}-${displayNumber.slice(6)}`;
    trackCallClick(formattedNumber, metadata);
    onClick?.();
  };

  return (
    <a 
      href={`tel:${phoneNumber}`} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};

export default TrackedPhoneLink;
