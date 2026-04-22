import { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    Square: any;
  }
}

interface SquareCardFormProps {
  applicationId: string;
  locationId: string;
  onTokenize: (token: string) => void;
  onError: (error: string) => void;
  onReady: () => void;
}

export const SquareCardForm = ({ 
  applicationId, 
  locationId, 
  onTokenize, 
  onError,
  onReady 
}: SquareCardFormProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState<any>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadSquareScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.Square) {
          resolve();
          return;
        }

        const existingScript = document.querySelector('script[src*="squarecdn.com"]');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve());
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://web.squarecdn.com/v1/square.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Square SDK'));
        document.head.appendChild(script);
      });
    };

    const initializeCard = async () => {
      try {
        await loadSquareScript();
        
        if (!window.Square) {
          throw new Error('Square SDK not available');
        }

        const payments = window.Square.payments(applicationId, locationId);
        const cardInstance = await payments.card({
          includeInputLabels: true,
          postalCode: true,
        });
        
        if (cardContainerRef.current) {
          await cardInstance.attach(cardContainerRef.current);
          setCard(cardInstance);
          setIsLoading(false);
          onReady();
        }
      } catch (err: any) {
        console.error('Square init error:', err);
        onError(err.message || 'Failed to initialize payment form');
        setIsLoading(false);
      }
    };

    initializeCard();

    return () => {
      if (card) {
        card.destroy();
      }
    };
  }, [applicationId, locationId, onError, onReady]);

  // Expose tokenize method via callback
  useEffect(() => {
    if (card) {
      (window as any).__squareTokenize = async () => {
        try {
          const result = await card.tokenize();
          if (result.status === 'OK') {
            onTokenize(result.token);
            return result.token;
          } else {
            const errorMsg = result.errors?.[0]?.message || 'Card verification failed';
            onError(errorMsg);
            return null;
          }
        } catch (err: any) {
          onError(err.message || 'Payment processing failed');
          return null;
        }
      };
    }
    return () => {
      delete (window as any).__squareTokenize;
    };
  }, [card, onTokenize, onError]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        Card Details
      </label>
      <div 
        ref={cardContainerRef}
        className="min-h-[50px] border rounded-md bg-background p-3"
      >
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading payment form...</span>
          </div>
        )}
      </div>
    </div>
  );
};
