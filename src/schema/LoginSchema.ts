import * as Yup from 'yup';
export const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required!'),
  password: Yup.string()
    .min(6, 'Password must be 8 characters long')
    .required('Password is required!')
    .matches(/[0-9]/, 'Password requires a number'),
  // .matches(/[a-z]/, 'Password requires a lowercase letter')
  // .matches(/[A-Z]/, 'Password requires an uppercase letter')
  // .matches(/[^\w]/, 'Password requires a symbol'),
});

export type LoginSchemaType = Yup.InferType<typeof LoginSchema>;
