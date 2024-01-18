import { IUser } from './user.type';

export type IRole = {
  name: string;
  description: string | null;
  id: string;
  users?: IUser[];
};

export const ROLES_TYPES = ['admin', 'manager', 'user', 'client'];
