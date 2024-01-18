import {
  ALL_USERS,
  CLIENT,
  CURRENT_EMPLOYEES,
  CURRENT_EMPLOYEES_ALL,
  newDatesFirst,
  USER,
  USERS,
} from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { ClientSchemaType } from '../schema/ClientSchema';
import { ResetPasswordSchemaType } from '../schema/ResetPasswordSchema';
import { CreateUserSchemaType, UpdateUserSchemaType } from '../schema/UserSchema';
import useAuthStore from '../store/authStore';
import {
  IUser,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
import { IEmployee } from '../types/employee.type';

export default class UserService {
  // get users with pagination
  static async getUsers({
    page = 1,
    limit = 10,
    includes = 'current_employment_info.department,current_employment_info.current_employee_designation,user_roles.role',
    filters,
    sorts = newDatesFirst,
    search = '',
  }: PaginationQueryParams): Promise<PaginateResponse<IUser>> {
    try {
      const userResponse = await apiGet<PaginateResponse<IUser>>({
        apiPath: `${USERS}?page=${page}&limit=${limit}&includes=${includes}&sorts=${sorts}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });

      return Promise.resolve(userResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // get all users
  static async getAllUsers(): Promise<IUser[]> {
    try {
      const allUser = await apiGet<ResponseSuccess<IUser[]>>({
        apiPath: ALL_USERS,
      });
      return Promise.resolve(allUser.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get users with current employement (with pagination)
  static async getUsersWithCurrentEmployment({
    page = 1,
    limit = 10,
    filters,
    includes = '',
    search,
    sorts = newDatesFirst,
  }: PaginationQueryParams): Promise<PaginateResponse<IUser>> {
    try {
      const currentEmployees = await apiGet<PaginateResponse<IUser>>({
        apiPath: `${CURRENT_EMPLOYEES}?&page=${page}&limit=${limit}&includes=${includes}&sorts=${sorts}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(currentEmployees);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get all users with current employement
  static async getAllUsersWhoAreCurrentlyEmployed(): Promise<IUser[]> {
    try {
      const allCurrentEmployees = await apiGet<ResponseSuccess<IUser[]>>({
        apiPath: `${CURRENT_EMPLOYEES_ALL}`,
      });
      return Promise.resolve(allCurrentEmployees.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // create a user
  static async createUser(
    userData: CreateUserSchemaType,
  ): Promise<ResponseSuccess<IUser>> {
    try {
      const userResponse = await apiPost<ResponseSuccess<IUser>>({
        apiPath: USER,
        data: userData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(userResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update a user
  static async updateUser({
    updatedData,
    id,
  }: {
    updatedData: UpdateUserSchemaType;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${USER}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // delete a user
  static async deleteUser(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${USERS}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // get details of a user
  static async getUserDetails(id: IUser['id']): Promise<IUser> {
    try {
      const userResponse = await apiGet<ResponseSuccess<IUser>>({
        apiPath: `${USERS}/${id}`,
      });
      return Promise.resolve(userResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  // Set the current employment info of a user
  static async updateCurrentEmploymentInfo({
    userId,
    employeeId,
  }: {
    userId: IUser['id'];
    employeeId: IEmployee['id'];
  }): Promise<void> {
    try {
      await apiPut({
        apiPath: `${USERS}/${userId}/set-employment-info`,
        data: { current_employee_id: employeeId },
      });
      SuccessHandler.handle('Successfully Updated.');
      return Promise.resolve();
    } catch (error) {
      return await Promise.reject();
    }
  }

  //  update the roles of a user
  static async updateRolesOfUser({
    userId,
    roleIdList,
  }: {
    userId: IUser['id'];
    roleIdList: string[];
  }): Promise<void> {
    try {
      await apiPost({
        apiPath: `${USERS}/${userId}/roles`,
        data: { role_ids: roleIdList },
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // Update profile picture of a user
  static async updateProfilePicture({
    userId,
    data,
  }: {
    userId: IUser['id'];
    data: FormData;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${USERS}/${userId}/profile-picture`,
        data: data,
      });
      SuccessHandler.handle('Profile Picture Successfully Updated.');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // Reset password
  static async resetPassword({
    userId,
    new_password,
    old_password,
  }: ResetPasswordSchemaType & { userId: IUser['id'] }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${USERS}/${userId}/reset-password`,
        data: { new_password, old_password },
      });
      SuccessHandler.handle('Your Password is updated.');
      useAuthStore.getState().logout();
    } catch (error) {
      return Promise.reject();
    }
  }

  // create a Client
  static async createClient(userData: ClientSchemaType): Promise<ResponseSuccess<IUser>> {
    try {
      const clientResponse = await apiPost<ResponseSuccess<IUser>>({
        apiPath: CLIENT,
        data: userData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(clientResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update a Client
  static async updateClient({
    updatedData,
    id,
  }: {
    updatedData: Partial<ClientSchemaType>;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${CLIENT}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
}
