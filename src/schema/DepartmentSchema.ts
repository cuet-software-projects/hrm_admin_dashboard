import * as Yup from 'yup';

export const DepartmentSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  code: Yup.string()
    .required('Code is required')
    .max(2, 'Code must be at most 2 characters')
    .min(1, 'Code must be at least 1 character'),
  description: Yup.string(),
  prefix_code: Yup.string()
    .required('Prefix Code is required')
    .max(2, 'Prefix Code must be at most 2 characters')
    .min(1, 'Prefix Code must be at least 1 character'),
});

export type DepartmentSchemaType = Yup.InferType<typeof DepartmentSchema>;
