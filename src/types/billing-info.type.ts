import { IUser } from './user.type';

export interface IBillingInfo {
  id: string;
  user_id: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  user?: IUser;
}
