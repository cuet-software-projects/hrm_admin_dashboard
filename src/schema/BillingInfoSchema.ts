import * as yup from 'yup';

export const BillingInfoSchema = yup.object({
  user_id: yup.string().required('Select a user'),
  address_line_1: yup.string().required('Address line 1 is must'),
  address_line_2: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  country: yup.string().optional(),
  zip_code: yup.string().optional(),
});

export type BillingInfoSchemaType = yup.InferType<typeof BillingInfoSchema>;
