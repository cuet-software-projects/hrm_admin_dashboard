import * as yup from 'yup';

import { INVOICE_DISCOUNT_TYPE_VALUES } from '../types/values';

export const InvoiceItemSchema = yup.object({
  name: yup.string().required('Enter Item Name'),
  price: yup.number().required('Enter Item Price').min(1, 'Enter proper price'),
  quantity: yup.number().required('Enter Item Quantity').min(1, 'Enter proper quantity'),
});

export const InvoiceSchema = yup.object({
  user_id: yup.string().required('Select a user'),
  invoice_id: yup.string().required('Enter Invoice ID'),
  issue_date: yup.string().required('Select Issue Date'),
  due_date: yup.string().required('Select Due Date'),
  invoice_subject: yup.string().required('Enter Subject for the Invoice'),
  invoice_items: yup
    .array()
    .of(InvoiceItemSchema)
    .required('Add at least one item to the invoice'),
  tax_percentage: yup
    .number()
    .optional()
    .min(0, 'Must be positive')
    .max(100, 'Tax must below 100'),
  discount_type: yup.string().oneOf(INVOICE_DISCOUNT_TYPE_VALUES).optional(),
  discount: yup
    .number()
    .min(0, 'Can not be negative')
    .optional()
    .when(['discount_type'], (values, schema) => {
      if (values[0] === 'percentage') {
        return schema.max(100, 'Maximum 100% allowed');
      }
      return schema;
    }),
  note: yup.string().optional(),
  status: yup.string().required('Select a status'),
  amount_paid: yup.number().optional().min(0, 'Can not be negative'),
  parent_invoice_id: yup.string().optional(),
  received_by_id: yup.string().optional(),
});

export type InvoiceItemSchemaType = yup.InferType<typeof InvoiceItemSchema>;
export type InvoiceSchemaType = yup.InferType<typeof InvoiceSchema>;
