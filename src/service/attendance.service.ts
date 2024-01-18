import dayjs from 'dayjs';

import { ALL_ATTENDANCE, ATTENDANCE, ATTENDANCES, newDatesFirst } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { modifyFilterString } from '../helpers/utility/antdTableHelpers';
import {
  CombinedCreateUpdateAttendanceSchemaType,
  CreateAttendanceSchemaType,
} from '../schema/AttendanceSchema';
import {
  AttendanceOverviewType,
  IAttendance,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
import { IEmployee } from '../types/employee.type';

export default class AttendanceService {
  static async getAttendances({
    page = 1,
    limit = 10,
    includes = '',
    sorts = newDatesFirst,
    filters,
    search = '',
  }: PaginationQueryParams): Promise<PaginateResponse<IAttendance>> {
    try {
      const attendanceResponse = await apiGet<PaginateResponse<IAttendance>>({
        apiPath: `${ATTENDANCES}?&page=${page}&limit=${limit}&includes=${includes}&sorts=${sorts}${
          filters ? modifyFilterString(utils.createFilterString(filters)) : ''
        }&search=${search}`,
      });

      return Promise.resolve(attendanceResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getSingleEmployeeAttendances({
    id,
    page = 1,
    limit = 10,
    sorts = newDatesFirst,
  }: PaginationQueryParams & { id: IEmployee['id'] | null }): Promise<
    PaginateResponse<IAttendance>
  > {
    try {
      const attendanceResponse = await apiGet<PaginateResponse<IAttendance>>({
        apiPath: `/employees/${id}/attendances?&page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(attendanceResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllAttendances(): Promise<IAttendance[]> {
    try {
      const allAttendance = await apiGet<ResponseSuccess<IAttendance[]>>({
        apiPath: ALL_ATTENDANCE,
      });
      return Promise.resolve(allAttendance.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createAttendance(
    attendanceData: CreateAttendanceSchemaType,
  ): Promise<ResponseSuccess<IAttendance[]>> {
    try {
      const attendanceResponse = await apiPost<ResponseSuccess<IAttendance[]>>({
        apiPath: ATTENDANCE,
        data: attendanceData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(attendanceResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateAttendance({
    updatedData,
    id,
  }: {
    updatedData: Partial<CombinedCreateUpdateAttendanceSchemaType>;
    id: string | null;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${ATTENDANCES}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async deleteAttendance(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${ATTENDANCES}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getAttendanceDetails(id: IAttendance['id']): Promise<IAttendance> {
    try {
      const attendanceResponse = await apiGet<ResponseSuccess<IAttendance>>({
        apiPath: `${ATTENDANCES}/${id}`,
      });
      return Promise.resolve(attendanceResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  static async updateMarking({
    id,
    updatedMark,
  }: {
    id: IAttendance['id'];
    updatedMark: number;
  }): Promise<void> {
    try {
      await apiPut({
        apiPath: `${ATTENDANCES}/markings/${id}`,
        data: { markings: updatedMark },
      });
      SuccessHandler.handle('Successfully Updated.');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  }

  // This is to get the attendance overview on the desired date
  static async getAttendanceOverview({
    date,
  }: {
    date: Date;
  }): Promise<AttendanceOverviewType> {
    try {
      const AttendanceOverview = await apiGet<ResponseSuccess<AttendanceOverviewType>>({
        apiPath: `${ATTENDANCES}/${dayjs(date).format('YYYY-MM-DD')}/attendance-overview`,
      });
      return Promise.resolve(AttendanceOverview.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
