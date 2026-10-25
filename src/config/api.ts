import Constants from 'expo-constants';
import { Platform } from 'react-native';

function resolveApiBaseUrl(): string {
  const configured = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (configured) return configured.replace(/\/+$/, '');

  if (__DEV__) {
    // Expo supplies the Metro host, so LAN development follows the Mac's current IP.
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      const url = new URL(`http://${hostUri}`);
      url.port = '8080';
      return url.origin;
    }
    if (Platform.OS === 'web') return 'http://localhost:8080';
  }

  throw new Error('Set EXPO_PUBLIC_API_URL, or connect to Expo using LAN mode for local development.');
}

export const API_BASE_URL = resolveApiBaseUrl();
