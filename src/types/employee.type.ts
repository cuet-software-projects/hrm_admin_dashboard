import {
  EMPLOYEE_PROMOTION_REASON_TYPE,
  EMPLOYEE_WORK_TYPE,
  IBranch,
  IDepartment,
  IDesignation,
  ITeam,
} from '.';
import { IUser } from './user.type';

export type IEmployee = {
  id: string;
  employee_id: string;
  user_id: string;
  user?: IUser;
  reporting_officer_id: string;
  reporting_officer?: IUser;
  joined_at: string;
  left_at?: string;
  work_type: EMPLOYEE_WORK_TYPE;
  branch_id: string;
  branch?: IBranch;
  department_id: string;
  department?: IDepartment;
  teams?: ITeam[];
  isCurrent: boolean;
  is_available: boolean;
  created_at: string;
  updated_at?: string;
  current_salary?: number;
  current_designation_id?: string;
  current_employee_designation?: IDesignation;
  reason: EMPLOYEE_PROMOTION_REASON_TYPE;
};

export type IEmployeeDesignationSalary = {
  id: string;
  created_at: string;
  designation?: IDesignation;
  designation_id: string;
  salary: number;
  employee_id: string;
  employee_info?: IEmployee;
  reason: EMPLOYEE_PROMOTION_REASON_TYPE;
};
