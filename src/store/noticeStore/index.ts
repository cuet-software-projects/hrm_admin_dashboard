import { create } from 'zustand';

import { INotice } from '../../types/notice.type';

export interface NoticeStore {
  noticeId: INotice['id'];
  openMode: 'create' | 'update';
  sizingMode: 'minimized' | 'maximized' | 'default' | '';
  isOpenNoticeModal: boolean;
  isPinningConfirmationModalOpen: boolean;
  isPinningLoading: boolean;
  setNoticeId: (value: INotice['id']) => void;
  handleNoticeOpenMode: (value: 'create' | 'update') => void;
  handleSelectSizingMode: (mode: 'minimized' | 'maximized' | 'default') => void;
  handleNoticeClose: () => void;
  togglePinningConfirmationModal: () => void;
  togglePinningLoading: () => void;
}

const useNoticeStore = create<NoticeStore>((set) => {
  return {
    noticeId: '',
    openMode: 'create',
    isOpenNoticeModal: false,
    sizingMode: 'default',
    isPinningConfirmationModalOpen: false,
    isPinningLoading: false,
    togglePinningConfirmationModal: () =>
      set((state) => ({
        isPinningConfirmationModalOpen: !state.isPinningConfirmationModalOpen,
      })),
    togglePinningLoading: () =>
      set((state) => ({
        isPinningLoading: !state.isPinningLoading,
      })),
    setNoticeId: (value) => set({ noticeId: value }),
    handleNoticeOpenMode: (value) => set({ openMode: value }),
    handleSelectSizingMode: (mode) => set({ isOpenNoticeModal: true, sizingMode: mode }),
    handleNoticeClose: () => set({ isOpenNoticeModal: false, sizingMode: '' }),
  };
});

export default useNoticeStore;
