import { create } from 'zustand';

interface userProfileSelection {
  personalInfoSelect: boolean;
  officeInfoSelect: boolean;
  paymentInfoSelect: boolean;
  socialMediaSelect: boolean;
  documentSelect: boolean;
}

interface userProfileStoreProps {
  activeProfileSection: userProfileSelection;
  setActiveProfileSection: (newProfile: userProfileSelection) => void;
  isOwnProfile: boolean;
  setIsOwnProfile: (value: boolean) => void;
  userId: string;
  setUserId: (value: string) => void;
  isOpenSocialMediaModal: boolean;
  toggleSocialMediaModal: () => void;
  isProfilePictureModalOpen: boolean;
  toggleProfilePictureModal: () => void;
}

const useUserProfileStore = create<userProfileStoreProps>((set) => ({
  activeProfileSection: {
    personalInfoSelect: true,
    officeInfoSelect: false,
    paymentInfoSelect: false,
    socialMediaSelect: false,
    documentSelect: false,
  },
  setActiveProfileSection: (newProfile) => set({ activeProfileSection: newProfile }),
  isOwnProfile: true,
  setIsOwnProfile: (value) => set({ isOwnProfile: value }),
  userId: '',
  setUserId: (value) => set({ userId: value }),
  isOpenSocialMediaModal: false,
  toggleSocialMediaModal: () =>
    set((state) => ({ isOpenSocialMediaModal: !state.isOpenSocialMediaModal })),
  isProfilePictureModalOpen: false,
  toggleProfilePictureModal: () =>
    set((state) => ({ isProfilePictureModalOpen: !state.isProfilePictureModalOpen })),
}));

export default useUserProfileStore;
