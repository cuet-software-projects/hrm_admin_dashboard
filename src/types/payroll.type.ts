import { PAYROLL_TYPE } from '.';
import { IEmployee } from './employee.type';

export type IPayroll = {
  id: string;
  salary: number;
  status: PAYROLL_TYPE;
  date: Date;
  employee_id: string;
  employee_info?: IEmployee;
};

export type IPayrollOverviewForAdmin = {
  month: string;
  totalPayroll: number | null;
  totalBonus: number | null;
};

export type PayrollOverviewAdminReqBody = {
  date: Date;
  payrollStatus: PAYROLL_TYPE;
  bonusStatus: PAYROLL_TYPE;
};

export type monthWiseAmountType = {
  month: string;
  payroll: number | null;
  bonus: number | null;
};

export type IPayrollOverviewForEmployee = {
  monthWiseAmountList: monthWiseAmountType[];
  lifeTimeIncome: number;
  lifeTimeBonus: number;
};
