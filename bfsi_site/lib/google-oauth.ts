// Google OAuth Configuration
// For production, add your Google OAuth Client ID to environment variables
export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/google/callback`,
}

// Load Google API Script
export const loadGoogleScript = () => {
  if (typeof window !== 'undefined' && !(window as any).google) {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
}

// Initialize Google Sign-In
export const initializeGoogleSignIn = (clientId: string, onSuccess: (response: any) => void, onError: () => void) => {
  if ((window as any).google) {
    (window as any).google.accounts.id.initialize({
      client_id: clientId,
      callback: onSuccess,
      ux_mode: 'popup',
    })
    ;(window as any).google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
      }
    )
  }
}
