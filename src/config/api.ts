import { Platform } from 'react-native';

// Set EXPO_PUBLIC_API_URL to your Mac's LAN address when testing on a phone.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL
  ?? (Platform.OS === 'web' ? 'http://localhost:8080' : 'http://192.168.0.236:8080');
