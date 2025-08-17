import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInAnonymous } from './lib/firebase';
import ChatRoom from './components/ChatRoom';
import { Loader2, MessageCircle } from 'lucide-react';
import './App.css';

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    // Auto sign in anonymously if not already signed in
    if (!loading && !user && !error) {
      handleSignIn();
    }
  }, [user, loading, error]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInAnonymous();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to connect. Please refresh the page and try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading || isSigningIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Connecting to chat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h1 className="text-xl font-semibold mb-2">Connection Error</h1>
          <p className="text-muted-foreground mb-4">
            Unable to connect to the chat service.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto h-screen">
        <ChatRoom />
      </div>
    </div>
  );
}

export default App;
