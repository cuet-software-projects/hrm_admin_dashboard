import * as yup from 'yup';

export const ForgotPasswordSchema = yup.object({
  email: yup.string().required().email(),
});

export type ForgotPasswordSchemaType = yup.InferType<typeof ForgotPasswordSchema>;
