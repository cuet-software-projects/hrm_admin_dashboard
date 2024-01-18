import { LEAVE_STATUS_TYPE, LEAVE_TYPE } from '.';
import { IEmployee } from './employee.type';

export type ILeave = {
  id: string;
  employee_id: string;
  action_taken_by_id?: string;
  employee_info?: IEmployee;
  started_at: Date;
  ended_at: Date;
  leave_type: LEAVE_TYPE;
  leave_status?: LEAVE_STATUS_TYPE;
  action_taken_by?: IEmployee;
  description?: string;
};
