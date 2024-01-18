import * as yup from 'yup';

import { NOTICE_STATUS_VALUES } from '../types/values';

export const NoticeSchema = yup.object({
  issue_date: yup.string().required('Issue date is required'),
  subject: yup.string().required('Subject is required'),
  content: yup.string().required('Content is required'),
  status: yup.string().oneOf(NOTICE_STATUS_VALUES),
  recipient_ids: yup
    .array()
    .of(yup.string().required('Recipient ID is required'))
    .min(1, 'At least one recipient ID is required'),
  sender_id: yup.string().required('Sender ID is required'),
  attachments: yup
    .array()
    .of(yup.mixed())
    .max(5, 'Maximum 5 files are allowed to attach.')
    .optional(),
});

export type NoticeSchemaType = yup.InferType<typeof NoticeSchema>;
