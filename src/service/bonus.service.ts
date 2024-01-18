import { BONUS, BONUSES, EMPLOYEES, newDatesFirst } from '../constants/api';
import { apiGet, apiPost, apiPut } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { BonusCreateSchemaType, BonusUpdateSchemaType } from '../schema/BonusSchema';
import { PaginateResponse, PaginationQueryParams } from '../types';
import { IBonus } from '../types/bonus.type';
import { IEmployee } from '../types/employee.type';

export default class BonusService {
  // Get paginated bonuses of a single employee
  static async getBonusesOfEmployee({
    employeeId,
    page,
    limit,
    filters,
    includes = 'employee_info.user',
    search = '',
    sorts = '-date',
  }: PaginationQueryParams & {
    employeeId: IEmployee['id'];
  }): Promise<PaginateResponse<IBonus>> {
    try {
      const bonusResponse = await apiGet<PaginateResponse<IBonus>>({
        apiPath: `${EMPLOYEES}/${employeeId}${BONUSES}?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(bonusResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get paginated bonuses for all employees
  static async getBonusesOfAllEmployees({
    page,
    limit,
    filters,
    includes = 'employee_info.user',
    search = '',
    sorts = newDatesFirst,
  }: PaginationQueryParams): Promise<PaginateResponse<IBonus>> {
    try {
      const bonusResponse = await apiGet<PaginateResponse<IBonus>>({
        apiPath: `${EMPLOYEES}${BONUSES}?&page=${page}&limit=${limit}&includes=${includes}&sorts=${sorts}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(bonusResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Create bonus for an employee
  static async createBonus({
    employeeId,
    bonusData,
  }: {
    employeeId: IEmployee['id'];
    bonusData: BonusCreateSchemaType;
  }): Promise<void> {
    try {
      await apiPost({ apiPath: `${EMPLOYEES}/${employeeId}${BONUS}`, data: bonusData });
      SuccessHandler.handle('Successfully created.');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update bonus of an employee
  static async updateBonus({
    bonusId,
    bonusUpdateData,
  }: {
    bonusId: IBonus['id'];
    bonusUpdateData: BonusUpdateSchemaType;
  }): Promise<void> {
    try {
      await apiPut({
        apiPath: `${EMPLOYEES}${BONUSES}/${bonusId}`,
        data: bonusUpdateData,
      });
      SuccessHandler.handle('Successfully updated.');
    } catch (error) {
      return Promise.reject();
    }
  }
}
