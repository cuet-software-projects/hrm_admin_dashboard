import * as Yup from 'yup';

export const RolesSchema = Yup.object({
  name: Yup.string().required('Role name is required'),
  description: Yup.string().optional(),
});

export type RolesSchemaType = Yup.InferType<typeof RolesSchema>;
