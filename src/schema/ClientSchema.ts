import * as Yup from 'yup';

import { BillingInfoSchema } from './BillingInfoSchema';

export const ClientSchema = Yup.object()
  .shape({
    // Basic Info
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contact_number: Yup.string().optional(),
    client_role_id: Yup.string().required('Client role is required'),
  })
  // Billing info in concatenated with the basic info
  .concat(BillingInfoSchema)
  .shape({
    user_id: Yup.string().strip(),
  });

export type ClientSchemaType = Yup.InferType<typeof ClientSchema>;
