import * as Yup from 'yup';

export const DesignationSchema = Yup.object({
  name: Yup.string().required('Designation is required.'),
});

export type DesignationSchemaType = Yup.InferType<typeof DesignationSchema>;
