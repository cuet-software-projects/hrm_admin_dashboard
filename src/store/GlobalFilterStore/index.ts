import { create } from 'zustand';

interface SearchStoreState {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const useGlobalFilterStore = create<SearchStoreState>((set) => ({
  searchValue: '',
  setSearchValue: (newValue: string) => set({ searchValue: newValue }),
}));

export default useGlobalFilterStore;
