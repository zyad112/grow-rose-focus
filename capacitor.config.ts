import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7441b4ddb1fc400590f8823c27f456b5',
  appName: 'grow-rose-focus',
  webDir: 'dist',
  server: {
    url: 'https://7441b4dd-b1fc-4005-90f8-823c27f456b5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f8fafc",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#f8fafc'
    }
  }
};

export default config;