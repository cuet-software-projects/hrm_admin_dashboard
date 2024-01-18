import { FEEDBACK_TYPE } from '.';
import { IUser } from './user.type';

export type IFeedback = {
  id: string;
  user_id: string;
  created_at: Date;
  feedback_type: FEEDBACK_TYPE;
  description: string;
  user?: IUser;
};

export type FeedbackDto = {
  feedback_type: FEEDBACK_TYPE;
  description: string;
};
