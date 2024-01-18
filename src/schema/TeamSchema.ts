import * as Yup from 'yup';

export const TeamSchema = Yup.object({
  name: Yup.string().required('Team Name is required!'),
  description: Yup.string().optional(),
});

export type TeamSchemaType = Yup.InferType<typeof TeamSchema>;
