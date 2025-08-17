# Anonymous Chat - Real-time Anonymous Messaging

A real-time anonymous chat application built with React, Firebase, and deployed on Vercel. Features user verification through CAPTCHA while maintaining complete anonymity.

## Features

- 🔒 **Anonymous Authentication**: Users can chat without revealing their identity
- 🛡️ **Bot Protection**: Integrated CAPTCHA verification to ensure only real users
- ⚡ **Real-time Messaging**: Instant message delivery using Firebase Firestore
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚫 **No Demo Data**: Clean slate - no pre-existing messages or demo users
- 🌐 **Vercel Deployment**: Optimized for serverless deployment

## Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Firestore, Authentication)
- **Verification**: Friendly Captcha
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Firebase project with Firestore and Authentication enabled
- (Optional) Friendly Captcha account for production

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zayn-910/mystick
   cd anonymous-chat
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Firebase configuration and optionally your Friendly Captcha site key.

4. Start the development server:
   ```bash
   pnpm run dev
   ```

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and select "Anonymous" as a sign-in method
3. Create a Firestore database in production mode
4. Set up Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /messages/{messageId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
5. Copy your Firebase config to `.env.local`

## Deployment to Vercel

### Automatic Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

### Environment Variables for Vercel

Set these environment variables in your Vercel project settings:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FRIENDLY_CAPTCHA_SITE_KEY` (optional)

## Security Considerations

- **Anonymous Authentication**: Users are authenticated anonymously through Firebase
- **Firestore Security Rules**: Ensure only authenticated users can read/write messages
- **CAPTCHA Verification**: Prevents automated bot access
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Rate Limiting**: Consider implementing rate limiting for message sending

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Firebase       │    │  Friendly       │
│   (Vercel)      │◄──►│   (Firestore +   │    │  Captcha        │
│                 │    │   Auth)          │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

- **Frontend**: React SPA hosted on Vercel
- **Real-time Database**: Firebase Firestore for message storage and real-time updates
- **Authentication**: Firebase Anonymous Authentication
- **Bot Protection**: Friendly Captcha integration
- **Deployment**: Vercel serverless platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

