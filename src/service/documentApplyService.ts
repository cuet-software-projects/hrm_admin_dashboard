import { SALARY_CERTIFICATES } from '../constants/api';
import { apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import {
  SalaryCertificateApprovalSchemaType,
  SalaryCertificateSchemaType,
} from '../schema/SalaryCertificateSchema';
import {
  IUser,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
import {
  ILastApprovedSalaryCertificate,
  ISalaryCertificate,
} from '../types/salary-certificate.type';

export default class DocuemntApplyService {
  //********* Section 1: Related to salary certificate ***********//

  // get paginated salary certificates of all users
  static async getSalaryCertificates({
    page,
    limit,
    includes = '',
    filters,
    search,
    sorts,
  }: PaginationQueryParams): Promise<PaginateResponse<ISalaryCertificate>> {
    try {
      const salaryCertificates = await apiGet<PaginateResponse<ISalaryCertificate>>({
        apiPath: `${SALARY_CERTIFICATES}?&page=${page}&limit=${limit}${
          filters ? utils.createFilterString(filters) : ''
        }&includes=${includes}&search=${search}&sorts=${sorts}`,
      });
      return Promise.resolve(salaryCertificates);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // get the last approved salary certificate of a single user
  static async getLastApprovedSalaryCertificateOfUser({
    userId,
  }: {
    userId: IUser['id'];
  }): Promise<ILastApprovedSalaryCertificate> {
    try {
      const lastApprovedCertData = await apiGet<
        ResponseSuccess<ILastApprovedSalaryCertificate>
      >({
        apiPath: `${SALARY_CERTIFICATES}/${userId}/last-approved`,
      });
      return Promise.resolve(lastApprovedCertData.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Create an application for an salary certificate
  static async createSalaryCertApplication({
    userId,
    salaryCertData,
  }: {
    userId: IUser['id'];
    salaryCertData: SalaryCertificateSchemaType;
  }): Promise<void> {
    try {
      await apiPost({
        apiPath: `${SALARY_CERTIFICATES}/${userId}`,
        data: salaryCertData,
      });
      SuccessHandler.handle('Your application successfully submitted.');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Update salary certificcate status (only for admin)
  static async updateSalaryCertificateStatus({
    salaryCertificateId,
    statusUpdateData,
  }: {
    salaryCertificateId: string;
    statusUpdateData: SalaryCertificateApprovalSchemaType;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${SALARY_CERTIFICATES}/${salaryCertificateId}/status`,
        data: statusUpdateData,
      });
      SuccessHandler.handle('Successfully updated.');
    } catch (error) {
      return Promise.reject();
    }
  }

  //********* Section 1: Related to salary certificate Ended ***********//
}
