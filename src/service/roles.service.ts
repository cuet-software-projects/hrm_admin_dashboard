import { ALL_ROLES, ROLE, ROLES } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { RolesSchemaType } from '../schema/RolesSchema';
import { PaginateResponse, PaginationQueryParams, ResponseSuccess } from '../types';
import { IRole } from '../types/role.type';

export default class RoleService {
  //get roles with pagination
  static async getRoles({
    page = 1,
    limit = 10,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<IRole>> {
    try {
      const roleResponse = await apiGet<PaginateResponse<IRole>>({
        apiPath: `${ROLES}?page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(roleResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get all roles
  static async getAllRoles(): Promise<IRole[]> {
    try {
      const allRole = await apiGet<ResponseSuccess<IRole[]>>({
        apiPath: ALL_ROLES,
      });
      return Promise.resolve(allRole.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Create a role
  static async createRole(roleData: RolesSchemaType): Promise<ResponseSuccess<IRole[]>> {
    try {
      const roleResponse = await apiPost<ResponseSuccess<IRole[]>>({
        apiPath: ROLE,
        data: roleData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(roleResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update a role
  static async updateRole({
    updatedData,
    id,
  }: {
    updatedData: RolesSchemaType;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${ROLES}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // Delete a role
  static async deleteRole(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${ROLES}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  // Get the details of a role
  static async getRoleDetails(id: IRole['id']): Promise<IRole> {
    try {
      const roleResponse = await apiGet<ResponseSuccess<IRole>>({
        apiPath: `${ROLES}/${id}`,
      });
      return Promise.resolve(roleResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }
}
