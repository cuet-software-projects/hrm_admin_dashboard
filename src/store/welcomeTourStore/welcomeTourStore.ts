import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WelcomeTourStore = {
  run: boolean;
  showWelcomeTourModal: boolean;
  stepDisplay: number;
  setRun: (value: boolean) => void;
  setShowWelcomeTourModal: (value: boolean) => void;
  setStepDisplay: (value: number) => void;
};
const useWelcomeTourStore = create<WelcomeTourStore>()(
  persist(
    (set) => ({
      showWelcomeTourModal: true,
      run: false,
      stepDisplay: 0,
      setRun: (value) => set({ run: value }),
      setShowWelcomeTourModal: (value) => set({ showWelcomeTourModal: value }),
      setStepDisplay: (value) => set(() => ({ stepDisplay: value })),
    }),
    {
      name: 'welcome-tour-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ showWelcomeTourModal: state.showWelcomeTourModal }),
    },
  ),
);

export default useWelcomeTourStore;
