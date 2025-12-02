import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    Square: any;
  }
}

// Square Application ID - this is a public key, safe for frontend
const SQUARE_APPLICATION_ID = 'sq0idp-34je5bVBSLY-rwjmh47qrw';
const SQUARE_LOCATION_ID = '3CJ7Z2V1KEZR5';

interface UseSquarePaymentsReturn {
  card: any;
  isReady: boolean;
  error: string | null;
  tokenize: () => Promise<string | null>;
}

export const useSquarePayments = (containerId: string): UseSquarePaymentsReturn => {
  const [payments, setPayments] = useState<any>(null);
  const [card, setCard] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSquareScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.Square) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://web.squarecdn.com/v1/square.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Square SDK'));
        document.head.appendChild(script);
      });
    };

    const initializeSquare = async () => {
      try {
        await loadSquareScript();
        
        if (!window.Square) {
          throw new Error('Square SDK not loaded');
        }

        const paymentsInstance = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
        setPayments(paymentsInstance);

        const cardInstance = await paymentsInstance.card();
        await cardInstance.attach(`#${containerId}`);
        setCard(cardInstance);
        setIsReady(true);
      } catch (err: any) {
        console.error('Square initialization error:', err);
        setError(err.message || 'Failed to initialize payment form');
      }
    };

    // Small delay to ensure container is mounted
    const timer = setTimeout(() => {
      const container = document.getElementById(containerId);
      if (container) {
        initializeSquare();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (card) {
        card.destroy();
      }
    };
  }, [containerId]);

  const tokenize = useCallback(async (): Promise<string | null> => {
    if (!card) {
      setError('Card form not initialized');
      return null;
    }

    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        return result.token;
      } else {
        const errorMessage = result.errors?.[0]?.message || 'Card verification failed';
        setError(errorMessage);
        return null;
      }
    } catch (err: any) {
      console.error('Tokenization error:', err);
      setError(err.message || 'Failed to process card');
      return null;
    }
  }, [card]);

  return { card, isReady, error, tokenize };
};
