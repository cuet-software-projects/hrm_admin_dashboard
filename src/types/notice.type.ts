import { NOTICE_STATUS_TYPE } from '.';
import { IDocument } from './document.type';
import { IUser } from './user.type';

export type INotice = {
  id: string;
  subject: string;
  content: string;
  created_at: string;
  issue_date: string;
  status: NOTICE_STATUS_TYPE;
  is_pinned: boolean;
  unpinning_date?: string;
  recipients: {
    id: string;
    notice_id: string;
    recipient_id: string;
    recipient: Omit<IUser, 'is_registered'>;
    recipients: Omit<IUser, 'is_registered'>[];
  }[];
  sender?: Omit<IUser, 'is_registered'>;
  sender_id: string;
  attachments?: IDocument[];
};

export type IActiveNoticeNumber = {
  totalNumber: number;
};

export type NoticePinningPayloadType = { is_pinned: boolean; unpinning_date?: Date };
