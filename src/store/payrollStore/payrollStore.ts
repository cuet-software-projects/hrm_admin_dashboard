import { create } from 'zustand';

interface payrollStore {
  employeeId: string | null;
  setEmployeeId: (value: string | null) => void;
  salaryId: string | null;
  setSalaryId: (value: string | null) => void;
  bonusId: string | null;
  setBonusId: (value: string | null) => void;
  isConfirmEmployeeChange: boolean;
  setIsConfirmEmployeeChange: (value: boolean) => void;
}

export const usePayrollStore = create<payrollStore>((set) => ({
  employeeId: null,
  setEmployeeId: (value) => set({ employeeId: value }),
  salaryId: null,
  setSalaryId: (value) => set({ salaryId: value }),
  bonusId: null,
  setBonusId: (value) => set({ bonusId: value }),
  isConfirmEmployeeChange: false,
  setIsConfirmEmployeeChange: (value) => set({ isConfirmEmployeeChange: value }),
}));
