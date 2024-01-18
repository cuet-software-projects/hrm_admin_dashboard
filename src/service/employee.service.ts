import { ALL_EMPLOYEE, EMPLOYEE, EMPLOYEES } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import {
  CreateEmployeeSchemaType,
  UpdateEmployeeSchemaType,
} from '../schema/EmployeeSchema';
import { PaginateResponse, PaginationQueryParams, ResponseSuccess } from '../types';
import { IEmployee, IEmployeeDesignationSalary } from '../types/employee.type';

export default class EmployeeService {
  static async getEmployees({
    page = 1,
    limit = 10,
    filters,
    includes = 'user',
    search = '',
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<IEmployee>> {
    try {
      const employeeResponse = await apiGet<PaginateResponse<IEmployee>>({
        apiPath: `${EMPLOYEES}?&page=${page}&limit=${limit}&includes=${includes}&sorts=${sorts}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(employeeResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllEmployees(): Promise<IEmployee[]> {
    try {
      const allEmployee = await apiGet<ResponseSuccess<IEmployee[]>>({
        apiPath: ALL_EMPLOYEE,
      });
      return Promise.resolve(allEmployee.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createEmployee(
    employeeData: CreateEmployeeSchemaType,
  ): Promise<ResponseSuccess<IEmployee[]>> {
    try {
      const employeeResponse = await apiPost<ResponseSuccess<IEmployee[]>>({
        apiPath: EMPLOYEE,
        data: employeeData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(employeeResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateEmployee({
    updatedData,
    id,
  }: {
    updatedData: Partial<UpdateEmployeeSchemaType>;
    id: string;
  }): Promise<void> {
    if (Object.keys(updatedData).length === 0) {
      alert('You have not changed any information.');
      return Promise.reject();
    }
    try {
      await apiPatch({
        apiPath: `${EMPLOYEES}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async deleteEmployee(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${EMPLOYEES}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getEmployeeDetails(id: IEmployee['id']): Promise<IEmployee> {
    try {
      const employeeResponse = await apiGet<ResponseSuccess<IEmployee>>({
        apiPath: `${EMPLOYEES}/${id}`,
      });
      return Promise.resolve(employeeResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getDesignationHistory({
    id,
    page,
    limit,
    sorts,
    filters,
    includes,
    search,
  }: PaginationQueryParams & { id: IEmployee['id'] | null }): Promise<
    PaginateResponse<IEmployeeDesignationSalary>
  > {
    try {
      const designationHistoryResponse = await apiGet<
        PaginateResponse<IEmployeeDesignationSalary>
      >({
        apiPath: `${EMPLOYEES}/${id}/designation-salary/history?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(designationHistoryResponse);
    } catch (error) {
      return Promise.reject();
    }
  }
}
