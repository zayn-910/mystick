import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Authentication functions
export const signInAnonymous = () => signInAnonymously(auth);

// Firestore functions
export const addMessage = async (message, userId) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      text: message,
      userId: userId,
      timestamp: serverTimestamp(),
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding message: ', error);
    throw error;
  }
};

export const subscribeToMessages = (callback, messageLimit = 50) => {
  const q = query(
    collection(db, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(messageLimit)
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    // Reverse to show oldest first
    callback(messages.reverse());
  });
};

