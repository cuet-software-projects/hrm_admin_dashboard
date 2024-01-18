import * as Yup from 'yup';

export const BranchSchema = Yup.object({
  name: Yup.string().required('Branch Name is required.'),
  code: Yup.string()
    .required('Branch ID is required')
    .length(3, 'Branch ID must have 3 characters'),
  address: Yup.string().optional(),
});

export type BranchSchemaType = Yup.InferType<typeof BranchSchema>;
