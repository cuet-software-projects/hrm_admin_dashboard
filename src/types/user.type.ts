import {
  RELIGION_TYPE,
  TSHIRT_TYPE,
  USER_GENDER_TYPE,
  USER_MARITAL_STATUS_TYPE,
} from '.';
import { IBillingInfo } from './billing-info.type';
import { IEmployee } from './employee.type';
import { IRole } from './role.type';
import { IUserSocialMedia } from './user-social-media.type';

export type IUser = {
  id: string;
  first_name: string;
  last_name: string;
  userName: string;
  email: string;
  dob: string;
  fathers_name?: string;
  mothers_name?: string;
  blood_group?: string;
  contact_number?: string;
  emergency_contact_number?: string;
  nid: string;
  permanent_address?: string;
  present_address?: string;
  tshirt?: TSHIRT_TYPE;
  tin_number?: string;
  gender: USER_GENDER_TYPE;
  marital_status?: USER_MARITAL_STATUS_TYPE;
  religion: RELIGION_TYPE;
  profile_picture?: string;
  is_registered: boolean;
  employment_infos?: IEmployee[];
  reporting_officers?: IEmployee[];
  current_employment_info?: IEmployee;
  current_employee_id?: string;
  password: string;
  roles?: Omit<IRole, 'description'>[];
  social_media?: IUserSocialMedia;
  billing_info?: IBillingInfo;
};

export type LoginSuccessType = {
  expiresIn: number;
  token: string;
};
