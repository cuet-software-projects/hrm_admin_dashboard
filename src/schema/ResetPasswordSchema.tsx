import * as yup from 'yup';

export const ResetPasswordSchema = yup.object({
  old_password: yup.string().required('Enter Your Old Password.'),
  new_password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Enter Your New Password'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords must match')
    .required('Confirm Your Password'),
});

export type ResetPasswordSchemaType = yup.InferType<typeof ResetPasswordSchema>;
