import { BONUS_TYPE } from '.';
import { IEmployee } from './employee.type';

export type IBonus = {
  id: string;
  status: BONUS_TYPE;
  date: Date;
  bonus: number;
  employee_id: string;
  employee_info?: IEmployee;
  reason: string;
};
