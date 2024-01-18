import * as Yup from 'yup';

export const CreateLeaveSchema = Yup.object({
  started_at: Yup.string().required('Must choose leave start date.'),
  ended_at: Yup.string().required('Must choose leave end date.'),
  leave_type: Yup.string().required('Must choose why you want this leave.'),
  description: Yup.string().optional().max(190, 'Maximum 190 characters allowed.'),
});

export const UpdateLeaveSchema = Yup.object({
  started_at: Yup.string().required('Must choose leave start date.'),
  ended_at: Yup.string().required('Must choose leave end date.'),
  leave_type: Yup.string().required('Must choose why you want this leave.'),
  description: Yup.string().optional().max(190, 'Maximum 190 characters allowed.'),
});

export type CreateLeaveSchemaType = Yup.InferType<typeof CreateLeaveSchema>;
export type UpdateLeaveSchemaType = Yup.InferType<typeof UpdateLeaveSchema>;
