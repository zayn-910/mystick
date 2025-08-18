import { useState, useEffect } from 'react';

const useVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously verified in this session
    const storedToken = sessionStorage.getItem('verification_token');
    if (storedToken) {
      setVerificationToken(storedToken);
      setIsVerified(true);
    }
    setIsLoading(false);
  }, []);

  const handleVerificationSuccess = (token) => {
    setVerificationToken(token);
    setIsVerified(true);
    // Store in session storage to persist during the session
    sessionStorage.setItem('verification_token', token);
  };

  const handleVerificationError = (error) => {
    console.error('Verification error:', error);
    setIsVerified(false);
    setVerificationToken(null);
    sessionStorage.removeItem('verification_token');
  };

  const resetVerification = () => {
    setIsVerified(false);
    setVerificationToken(null);
    sessionStorage.removeItem('verification_token');
  };

  return {
    isVerified,
    verificationToken,
    isLoading,
    handleVerificationSuccess,
    handleVerificationError,
    resetVerification
  };
};

export default useVerification;

