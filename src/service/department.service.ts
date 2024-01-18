import { ALL_DEPARTMENTS, DEPARTMENT, DEPARTMENTS } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { DepartmentSchemaType } from '../schema/DepartmentSchema';
import {
  IDepartment,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';

export default class DepartmentService {
  static async getDepartments({
    page = 1,
    limit = 10,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<IDepartment>> {
    try {
      const departmentsResponse = await apiGet<PaginateResponse<IDepartment>>({
        apiPath: `${DEPARTMENTS}?page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(departmentsResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllDepartments(): Promise<IDepartment[]> {
    try {
      const allDepartments = await apiGet<ResponseSuccess<IDepartment[]>>({
        apiPath: ALL_DEPARTMENTS,
      });
      return Promise.resolve(allDepartments.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createDepartment(
    departmentData: DepartmentSchemaType,
  ): Promise<ResponseSuccess<IDepartment[]>> {
    try {
      const departmentResponse = await apiPost<ResponseSuccess<IDepartment[]>>({
        apiPath: DEPARTMENT,
        data: departmentData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(departmentResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateDepartment({
    updatedData,
    id,
  }: {
    updatedData: DepartmentSchemaType;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${DEPARTMENTS}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async deleteDepartment(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${DEPARTMENTS}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getDepartmentDetails(id: IDepartment['id']): Promise<IDepartment> {
    try {
      const departmentResponse = await apiGet<ResponseSuccess<IDepartment>>({
        apiPath: `${DEPARTMENTS}/${id}`,
      });
      return Promise.resolve(departmentResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }
}
