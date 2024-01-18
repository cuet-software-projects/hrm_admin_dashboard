import * as yup from 'yup';

export const ResetPasswordWhenForgotSchema = yup.object({
  token: yup.string().required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Enter Your New Password'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Your Password'),
});

export type ResetPasswordWhenForgotSchemaType = yup.InferType<
  typeof ResetPasswordWhenForgotSchema
>;
