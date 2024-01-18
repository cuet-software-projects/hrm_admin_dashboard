import { create } from 'zustand';

import { LoginSchemaType } from '../schema/LoginSchema';
import AuthService, { AuthInfo } from '../service/auth.service';
import { IUser } from '../types';

export interface AuthStore {
  isLoggedIn: boolean;
  role: string;
  setRole: (role: string) => void;
  userProfileData: IUser | null;
  setUserProfileData: (userData: IUser) => void;
  login: (credentials: LoginSchemaType) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => {
  function getLoggedInStatus() {
    const authDataString: string | null = localStorage.getItem('auth');
    const authData: AuthInfo | null = authDataString ? JSON.parse(authDataString) : null;
    return !!(
      authData?.expiresIn &&
      authData?.accessToken &&
      Date.now() < authData.expiresIn
    );
  }

  return {
    isLoggedIn: getLoggedInStatus(),
    loginError: '',
    role: localStorage.getItem('role')
      ? JSON.parse(localStorage.getItem('role') as string)
      : '',
    setRole: (role: string) => set({ role: role }),
    userProfileData: null,
    setUserProfileData: (userData: IUser) => set({ userProfileData: userData }),
    login: async (credentials: LoginSchemaType) => {
      try {
        await AuthService.login(credentials);
        set({
          isLoggedIn: getLoggedInStatus(),
        });
      } catch (error) {
        //
      }
    },
    logout: () => {
      set({ isLoggedIn: false });
      localStorage.clear();
    },
  };
});

export default useAuthStore;
