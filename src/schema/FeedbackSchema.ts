import * as yup from 'yup';

export const FeedbackSchema = yup.object({
  feedback_type: yup.string().required('Select the feedback type.'),
  description: yup.string().required('You must write the feedback in detail.'),
});

export type FeedbackSchemaType = yup.InferType<typeof FeedbackSchema>;
