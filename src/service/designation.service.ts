import { ALL_DESIGNATIONS, DESIGNATION, DESIGNATIONS } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { DesignationSchemaType } from '../schema/DesignationSchema';
import {
  IDesignation,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
export default class DesignationService {
  static async getDesignations({
    page = 1,
    limit = 10,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<IDesignation>> {
    try {
      const designationResponse = await apiGet<PaginateResponse<IDesignation>>({
        apiPath: `${DESIGNATIONS}?page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(designationResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllDesignations(): Promise<IDesignation[]> {
    try {
      const allDesignation = await apiGet<ResponseSuccess<IDesignation[]>>({
        apiPath: ALL_DESIGNATIONS,
      });
      return Promise.resolve(allDesignation.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createDesignation(
    designationData: DesignationSchemaType,
  ): Promise<ResponseSuccess<IDesignation[]>> {
    try {
      const designationResponse = await apiPost<ResponseSuccess<IDesignation[]>>({
        apiPath: DESIGNATION,
        data: designationData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(designationResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateDesignation({
    updatedData,
    id,
  }: {
    updatedData: DesignationSchemaType;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${DESIGNATIONS}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async deleteDesignation(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${DESIGNATIONS}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getDesignationDetails(id: IDesignation['id']): Promise<IDesignation> {
    try {
      const designationResponse = await apiGet<ResponseSuccess<IDesignation>>({
        apiPath: `${DESIGNATIONS}/${id}`,
      });
      return Promise.resolve(designationResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }
}
