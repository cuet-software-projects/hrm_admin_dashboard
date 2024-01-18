import dayjs from 'dayjs';

import { EMPLOYEES, LEAVE, LEAVES } from '../constants/api';
import { apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { CreateLeaveSchemaType, UpdateLeaveSchemaType } from '../schema/LeaveSchema';
import {
  LeaveOverview,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
import { IEmployee } from '../types/employee.type';
import { ILeave } from '../types/leave.type';

export default class LeaveService {
  // This is for creating a leave request by user
  static async createLeave({
    employeeId,
    data,
  }: {
    employeeId: IEmployee['id'];
    data: CreateLeaveSchemaType;
  }): Promise<void> {
    try {
      await apiPost({ apiPath: `${EMPLOYEES}/${employeeId}${LEAVE}`, data: data });
      SuccessHandler.handle('Successfully created.');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  }

  // This is for updating the leave request by user
  static async updateLeave({
    employeeId,
    leaveId,
    data,
  }: {
    employeeId: string;
    leaveId: string;
    data: UpdateLeaveSchemaType;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${EMPLOYEES}/${employeeId}${LEAVE}/${leaveId}`,
        data: data,
      });
      SuccessHandler.handle('Successfully Updated.');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // This is for giving approval to a leave
  static async makeApprovalToLeave({
    employeeId,
    leaveId,
    leaveStatus,
  }: {
    employeeId: string;
    leaveId: string;
    leaveStatus: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${EMPLOYEES}/${employeeId}/leave-approval/${leaveId}`,
        data: { leave_status: leaveStatus },
      });
      SuccessHandler.handle('Successfully updated.');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // This is for getting details of single leave
  static async getLeaveDetails({ leaveId }: { leaveId: ILeave['id'] }): Promise<ILeave> {
    try {
      const leaveResponse = await apiGet<ResponseSuccess<ILeave>>({
        apiPath: `${EMPLOYEES}${LEAVES}/${leaveId}`,
      });
      return Promise.resolve(leaveResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // This to get paginated leaves of all employees
  static async getLeaves({
    page = 1,
    limit = 10,
    filters,
    includes,
    search,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<ILeave>> {
    try {
      const leaveResponse = await apiGet<PaginateResponse<ILeave>>({
        apiPath: `${EMPLOYEES}${LEAVES}?&page=${page}&limit=${limit}${
          filters ? utils.createFilterString(filters) : ''
        }&includes=${includes}&search=${search}&sorts=${sorts}`,
      });
      return Promise.resolve(leaveResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // This is to get all leaves of a single employee
  static async getLeavesOfAnEmployee({
    employeeId,
    page,
    limit,
    filters,
    includes,
    search,
    sorts = '-created_at',
  }: PaginationQueryParams & { employeeId: IEmployee['id'] }): Promise<
    PaginateResponse<ILeave>
  > {
    try {
      const leaveResponse = await apiGet<PaginateResponse<ILeave>>({
        apiPath: `${EMPLOYEES}/${employeeId}${LEAVES}?&page=${page}&limit=${limit}${
          filters ? utils.createFilterString(filters) : ''
        }&includes=${includes}&search=${search}&sorts=${sorts}`,
      });
      return Promise.resolve(leaveResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // This is to get leave overview of an employee
  static async getLeavesOverviewOfAnEmployee({
    employeeId,
  }: {
    employeeId: string;
  }): Promise<LeaveOverview> {
    try {
      const leaveResponseAll = await apiGet<ResponseSuccess<LeaveOverview>>({
        apiPath: `${EMPLOYEES}/${employeeId}/leave-overview`,
      });
      return Promise.resolve(leaveResponseAll.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // This is to get employees who are in leave today
  static async getEmployeesInLeave({
    page = 1,
    limit = 5,
    date,
  }: PaginationQueryParams & { date: Date }): Promise<PaginateResponse<ILeave>> {
    try {
      const employeesInLeave = await apiGet<PaginateResponse<ILeave>>({
        apiPath: `${EMPLOYEES}/${dayjs(date).format(
          'YYYY-MM-DD',
        )}/in-leave?&page=${page}&limit=${limit}`,
      });
      return Promise.resolve(employeesInLeave);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
