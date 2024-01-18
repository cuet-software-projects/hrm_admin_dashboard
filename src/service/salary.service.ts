import dayjs from 'dayjs';

import { EMPLOYEES, PAYROLL, PAYROLLS } from '../constants/api';
import { apiGet, apiPost, apiPut } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import {
  PayrollCreateSchemaType,
  PayrollUpdateSchemaType,
} from '../schema/PayrollSchema';
import { PaginateResponse, PaginationQueryParams, ResponseSuccess } from '../types';
import { IEmployee } from '../types/employee.type';
import {
  IPayroll,
  IPayrollOverviewForAdmin,
  IPayrollOverviewForEmployee,
  PayrollOverviewAdminReqBody,
} from '../types/payroll.type';

export default class PayrollService {
  // Get paginated salaries of a single employee
  static async getSalaryOfEmployee({
    employeeId,
    page,
    limit,
    filters,
    includes = 'employee_info.user',
    search = '',
    sorts = '-date',
  }: PaginationQueryParams & {
    employeeId: IEmployee['id'];
  }): Promise<PaginateResponse<IPayroll>> {
    try {
      const payrollResponse = await apiGet<PaginateResponse<IPayroll>>({
        apiPath: `${EMPLOYEES}/${employeeId}${PAYROLLS}?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(payrollResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get salaries of all employees as pagination
  static async getSalaryOfAllEmployee({
    page,
    limit,
    filters,
    includes = 'employee_info.user',
    search,
    sorts = '-date',
  }: PaginationQueryParams): Promise<PaginateResponse<IPayroll>> {
    try {
      const payrollResponse = await apiGet<PaginateResponse<IPayroll>>({
        apiPath: `${EMPLOYEES}/${PAYROLLS}?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(payrollResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Here salary and bonus can be created at the same time. Hence named createPayroll
  static async createPayroll({
    employeeId,
    payrollData,
  }: {
    employeeId: IEmployee['id'];
    payrollData: PayrollCreateSchemaType;
  }): Promise<void> {
    try {
      await apiPost({
        apiPath: `${EMPLOYEES}/${employeeId}${PAYROLL}`,
        data: payrollData,
      });
      SuccessHandler.handle('Successfully created.');
    } catch (error) {
      return Promise.reject();
    }
  }
  static async updateSalary({
    salaryId,
    payrollUpdateData,
  }: {
    salaryId: IPayroll['id'];
    payrollUpdateData: PayrollUpdateSchemaType;
  }): Promise<void> {
    try {
      await apiPut({
        apiPath: `${EMPLOYEES}${PAYROLLS}/${salaryId}`,
        data: payrollUpdateData,
      });
      SuccessHandler.handle('Successfully updated.');
    } catch (error) {
      return Promise.reject();
    }
  }

  // This will fetch payroll overview for admin
  static async getPayrollOverviewForAdmin({
    date,
    payrollStatus = 'SENT',
    bonusStatus = 'SENT',
  }: PayrollOverviewAdminReqBody): Promise<IPayrollOverviewForAdmin[]> {
    try {
      const payrollOverview = await apiGet<ResponseSuccess<IPayrollOverviewForAdmin[]>>({
        apiPath: `${EMPLOYEES}${PAYROLLS}/${dayjs(date).format(
          'YYYY-MM-DD',
        )}/payroll-overview?payrollStatus=${payrollStatus}&bonusStatus=${bonusStatus}`,
      });
      return Promise.resolve(payrollOverview.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // This will fetch payroll overview for admin
  static async getPayrollOverviewForEmployee({
    employeeId,
    date,
    payrollStatus = 'SENT',
    bonusStatus = 'SENT',
  }: {
    employeeId: string;
  } & PayrollOverviewAdminReqBody): Promise<IPayrollOverviewForEmployee> {
    try {
      const payrollOverview = await apiGet<ResponseSuccess<IPayrollOverviewForEmployee>>({
        apiPath: `${EMPLOYEES}/${employeeId}${PAYROLLS}/${dayjs(date).format(
          'YYYY-MM-DD',
        )}/payroll-overview?payrollStatus=${payrollStatus}&bonusStatus=${bonusStatus}`,
      });
      return Promise.resolve(payrollOverview.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
