import * as yup from 'yup';

export const SalaryCertificateSchema = yup.object({
  issue_date: yup.string().required('Choose issue date.'),
  reason: yup.string().required('Enter a reason.'),
});

export const SalaryCertificateApprovalSchema = yup.object({
  status: yup.string().required('Choose a status.'),
});

export type SalaryCertificateSchemaType = yup.InferType<typeof SalaryCertificateSchema>;
export type SalaryCertificateApprovalSchemaType = yup.InferType<
  typeof SalaryCertificateApprovalSchema
>;
