import Cookies from "js-cookie";
import { setAccessToken } from "./AuthToken";

// src/utils/auth.ts
export const setAuthData = (token: string, profile: any) => {
  // Store token
  setAccessToken(token);
  
  // Store profile in localStorage
  Cookies.set('userProfile', JSON.stringify(profile));
};

export const getPersistedProfile = (): any | null => {
  const profile = Cookies.get('userProfile');
  return profile ? JSON.parse(profile) : null;
};

export const clearAuthData = () => {
  setAccessToken(null);
 Cookies.remove('userProfile');
};
