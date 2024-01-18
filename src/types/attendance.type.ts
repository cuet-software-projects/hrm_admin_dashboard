import { EMPLOYEE_WORK_TYPE } from '.';
import { IEmployee } from './employee.type';

export type IAttendance = {
  id: string;
  created_at: string;
  updated_at: string;
  date: string;
  employee_id: string;
  entry_time: string;
  work_plan: string;
  exit_time?: string;
  work_descriptions?: string;
  break_duration?: number;
  reason_of_break?: string;
  work_type?: EMPLOYEE_WORK_TYPE;
  markings?: number;
  employee_info?: IEmployee;
};

export type AttendanceOverviewType = {
  totalEmployees: number;
  totalEmployeesInLeave: number;
  totalPresentEmployees: number;
  totalAbsentEmployees: number;
};

export type AttendanceChartDataPoint = {
  name: string;
  mark: number | null;
  date: string | null;
};

export type WorkingHours = {
  hours: number;
  minutes: number;
};
