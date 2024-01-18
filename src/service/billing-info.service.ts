import { BILLING_INFO, BILLING_INFOS } from '../constants/api';
import { apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { BillingInfoSchemaType } from '../schema/BillingInfoSchema';
import {
  IUser,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
import { IBillingInfo } from '../types/billing-info.type';

export default class BillingInfoService {
  // Get the paginate billing infos
  static async getBillingInfos({
    page = 1,
    limit = 10,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<IBillingInfo>> {
    try {
      const billingInfoResponse = await apiGet<PaginateResponse<IBillingInfo>>({
        apiPath: `${BILLING_INFOS}?page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(billingInfoResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get the details of a billing info
  static async getBillingInfoDetails(userId: IUser['id']): Promise<IBillingInfo> {
    try {
      const billingInfoResponse = await apiGet<ResponseSuccess<IBillingInfo>>({
        apiPath: `users/${userId}${BILLING_INFO}`,
      });
      return Promise.resolve(billingInfoResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  // Create a billing info of a user
  static async createBillingInfo(
    billingInfoData: BillingInfoSchemaType,
  ): Promise<ResponseSuccess<IBillingInfo>> {
    try {
      const billingInfoResponse = await apiPost<ResponseSuccess<IBillingInfo>>({
        apiPath: BILLING_INFO,
        data: billingInfoData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(billingInfoResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update the billing info of a user
  static async updateBillingInfo({
    updatedData,
    billingInfoId,
  }: {
    updatedData: BillingInfoSchemaType;
    billingInfoId: IUser['id'];
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${BILLING_INFO}/${billingInfoId}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
}
