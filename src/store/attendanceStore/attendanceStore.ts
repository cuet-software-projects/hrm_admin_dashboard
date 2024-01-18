import { create } from 'zustand';

import { IAttendance } from '../../types';

const markingOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
];

interface AttendanceStore {
  isAttendanceModalOpen: boolean;
  markOptions: { label: string; value: string }[];
  singleAttendanceData: IAttendance | null;
  entryTime: string | undefined;
  setAttendanceItem: (item: IAttendance | null) => void;
  handleCloseAttendanceModal: () => void;
  handleOpenAttendanceModal: (item: IAttendance) => void;
  setEntryTime: (time: string) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  isAttendanceModalOpen: false,
  markOptions: markingOptions,
  singleAttendanceData: null,
  entryTime: undefined,
  setAttendanceItem: (item) => set({ singleAttendanceData: item }),
  handleOpenAttendanceModal(item) {
    set({ singleAttendanceData: item, isAttendanceModalOpen: true });
  },
  handleCloseAttendanceModal: () =>
    set({ isAttendanceModalOpen: false, singleAttendanceData: null }),
  setEntryTime: (time: string) => set({ entryTime: time }),
}));
