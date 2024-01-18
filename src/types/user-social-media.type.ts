import { IUser } from '.';

export type IUserSocialMedia = {
  id: string;
  user?: IUser;
  user_id: string;
  facebook?: string | null;
  linkedin?: string | null;
};

export type UserSocialMediaReqBody = {
  user_id: string;
  facebook: string;
  linkedin: string;
};
