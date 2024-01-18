import { create } from 'zustand';

export interface DrawerStore {
  drawerOpen: boolean;
  mode: 'create' | 'update' | 'none';
  isOpenClientDrawer: boolean;
  handleDrawerOpen: (drawerMode: 'update' | 'create') => void;
  handleDrawerClose: () => void;
  setIsOpenClientDrawer: (value: boolean) => void;
}

const useDrawerStore = create<DrawerStore>((set) => ({
  drawerOpen: false,
  mode: 'none',
  isOpenClientDrawer: false,
  handleDrawerOpen: (drawerMode) => {
    set({ drawerOpen: true, mode: drawerMode });
  },
  handleDrawerClose: () => {
    set({ drawerOpen: false });
  },
  setIsOpenClientDrawer: (value) => set({ isOpenClientDrawer: value }),
}));

export default useDrawerStore;
