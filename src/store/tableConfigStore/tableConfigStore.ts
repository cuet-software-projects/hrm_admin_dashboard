import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TableConfigStoreProps = {
  stickyColumn: 'left' | 'right' | undefined;
  toggleStickyColumn: (value: 'left' | 'right' | undefined) => void;
};

const useTableConfigStore = create<TableConfigStoreProps>()(
  persist(
    (set) => ({
      stickyColumn: undefined,
      toggleStickyColumn(value) {
        set({ stickyColumn: value });
      },
    }),
    {
      name: 'table-config',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ stickyColumn: state.stickyColumn }),
    },
  ),
);

export default useTableConfigStore;
