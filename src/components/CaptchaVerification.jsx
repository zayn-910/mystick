import React, { useEffect, useRef, useState } from 'react';
import { WidgetInstance } from 'friendly-challenge';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

const CaptchaVerification = ({ onVerified, onError }) => {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const siteKey = import.meta.env.VITE_FRIENDLY_CAPTCHA_SITE_KEY;
    
    if (!siteKey || siteKey === 'your_friendly_captcha_site_key') {
      // Fallback for demo purposes - simulate verification after delay
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsVerified(true);
        onVerified('demo-solution-token');
      }, 2000);
      
      return () => clearTimeout(timer);
    }

    try {
      const widget = new WidgetInstance(containerRef.current, {
        sitekey: siteKey,
        doneCallback: (solution) => {
          setIsVerified(true);
          setError(null);
          onVerified(solution);
        },
        errorCallback: (err) => {
          setError('Verification failed. Please try again.');
          setIsVerified(false);
          onError && onError(err);
        }
      });

      widgetRef.current = widget;

      return () => {
        if (widgetRef.current) {
          widgetRef.current.destroy();
        }
      };
    } catch (err) {
      console.error('Error initializing CAPTCHA:', err);
      setError('Failed to load verification. Please refresh the page.');
      onError && onError(err);
    }
  }, [onVerified, onError]);

  const handleRetry = () => {
    setError(null);
    setIsVerified(false);
    if (widgetRef.current) {
      widgetRef.current.reset();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg border">
      <div className="text-center mb-4">
        <Shield className="h-12 w-12 mx-auto mb-3 text-primary" />
        <h2 className="text-xl font-semibold mb-2">Verify You're Human</h2>
        <p className="text-sm text-muted-foreground">
          Complete the verification below to access the anonymous chat
        </p>
      </div>

      {error ? (
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-3 text-destructive" />
          <p className="text-sm text-destructive mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Try Again
          </button>
        </div>
      ) : isVerified ? (
        <div className="text-center">
          <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-500" />
          <p className="text-sm text-green-600 font-medium">
            Verification successful! Connecting to chat...
          </p>
        </div>
      ) : isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">
            Processing verification...
          </p>
        </div>
      ) : (
        <div>
          <div ref={containerRef} className="mb-4" />
          <p className="text-xs text-muted-foreground text-center">
            This verification helps ensure only real users can access the chat
          </p>
        </div>
      )}
    </div>
  );
};

export default CaptchaVerification;

