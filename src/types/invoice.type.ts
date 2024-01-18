import { INVOICE_DISCOUNT_TYPE, INVOICE_STATUS_TYPE, IUser } from '.';

export type InvoiceItemType = {
  name: string;
  price: number;
  quantity: number;
};

export type IInvoice = {
  issue_date: string;
  id: string;
  invoice_subject: string;
  invoice_items?: InvoiceItemType[];
  sub_total: number;
  tax_percentage: number;
  discount?: number;
  discount_type?: INVOICE_DISCOUNT_TYPE;
  total: number;
  note?: string;
  status: INVOICE_STATUS_TYPE;
  user_id: string;
  user?: IUser;
  due_date: string;
  parent_invoice_id: string;
  received_by_id: string;
  amount_paid: number;
  child_invoices?: IInvoice[];
  received_by?: IUser;
  parent_invoice?: IInvoice;
};
