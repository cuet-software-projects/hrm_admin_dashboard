import { ALL_BRANCHES, BRANCH, BRANCHES } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { BranchSchemaType } from '../schema/BranchSchema';
import {
  IBranch,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';

export default class BranchService {
  static async getBranches({
    page = 1,
    limit = 10,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<IBranch>> {
    try {
      const branchResponse = await apiGet<PaginateResponse<IBranch>>({
        apiPath: `${BRANCHES}?page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(branchResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllBranches(): Promise<IBranch[]> {
    try {
      const allBranch = await apiGet<ResponseSuccess<IBranch[]>>({
        apiPath: ALL_BRANCHES,
      });
      return Promise.resolve(allBranch.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createBranch(
    branchData: BranchSchemaType,
  ): Promise<ResponseSuccess<IBranch[]>> {
    try {
      const branchResponse = await apiPost<ResponseSuccess<IBranch[]>>({
        apiPath: BRANCH,
        data: branchData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(branchResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateBranch({
    updatedData,
    id,
  }: {
    updatedData: BranchSchemaType;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${BRANCHES}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async deleteBranch(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${BRANCHES}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getBranchDetails(id: IBranch['id']): Promise<IBranch> {
    try {
      const branchResponse = await apiGet<ResponseSuccess<IBranch>>({
        apiPath: `${BRANCHES}/${id}`,
      });
      return Promise.resolve(branchResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }
}
