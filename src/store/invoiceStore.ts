import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { IUser } from '../types';

const PREVIEW_MODE = 'preview';
const EDIT_MODE = 'edit';

type InvoiceStore = {
  invoiceMode: typeof PREVIEW_MODE | typeof EDIT_MODE;
  changeInvoiceMode: (mode: typeof PREVIEW_MODE | typeof EDIT_MODE) => void;
  invoiceId: string | null;
  setInvoiceId: (value: string | null) => void;
  billingInfoId: string | null;
  setBillingInfoId: (value: string | null) => void;
  selectedUser: IUser | undefined;
  setSelectedUser: (user: IUser | undefined) => void;
  selectedReceiver: IUser | undefined;
  setSelectedReceiver: (user: IUser | undefined) => void;
  drawerToBeOpenedAtSpecificMode:
    | 'clientDrawerCreate'
    | 'clientDrawerUpdate'
    | 'billingInfoDrawerCreate'
    | 'billingInfoDrawerUpdate'
    | undefined;
  setDrawerToBeOpenedAtSpecificMode: (
    value:
      | 'clientDrawerCreate'
      | 'clientDrawerUpdate'
      | 'billingInfoDrawerCreate'
      | 'billingInfoDrawerUpdate'
      | undefined,
  ) => void;
};

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoiceMode: EDIT_MODE,
      changeInvoiceMode: (mode) => set({ invoiceMode: mode }),
      invoiceId: null,
      setInvoiceId: (value) => set({ invoiceId: value }),
      billingInfoId: null,
      setBillingInfoId: (value) => set({ billingInfoId: value }),
      selectedUser: undefined,
      selectedReceiver: undefined,
      setSelectedUser: (user) => set({ selectedUser: user }),
      setSelectedReceiver: (user) => set({ selectedReceiver: user }),
      drawerToBeOpenedAtSpecificMode: undefined,
      setDrawerToBeOpenedAtSpecificMode: (value) =>
        set({ drawerToBeOpenedAtSpecificMode: value }),
    }),
    {
      name: 'invoiceMode',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ mode: state.invoiceMode }),
    },
  ),
);
