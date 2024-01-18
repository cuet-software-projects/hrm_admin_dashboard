import dayjs from 'dayjs';

import { newDatesFirst, NOTICES } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { NoticeSchemaType } from '../schema/NoticeSchema';
import {
  IUser,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';
import {
  IActiveNoticeNumber,
  INotice,
  NoticePinningPayloadType,
} from '../types/notice.type';

export default class NoticeService {
  // Get all notices
  static async getAllNotices(): Promise<INotice[]> {
    try {
      const noticeResponse = await apiGet<ResponseSuccess<INotice[]>>({
        apiPath: `${NOTICES}/all`,
      });
      return Promise.resolve(noticeResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get paginated notices of all notices
  static async getNoticesOfAllUsers({
    page,
    limit,
    sorts = newDatesFirst,
    includes = 'sender',
    filters,
    search = '',
  }: PaginationQueryParams): Promise<PaginateResponse<INotice>> {
    try {
      const noticeResponse = await apiGet<PaginateResponse<INotice>>({
        apiPath: `${NOTICES}?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(noticeResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get notices of a single user as pagination
  static async getNoticesOfUser({
    page,
    limit,
    sorts = newDatesFirst,
    includes = 'sender',
    filters,
    search = '',
    userId,
  }: PaginationQueryParams & {
    userId: IUser['id'];
  }): Promise<PaginateResponse<INotice>> {
    try {
      const noticeResponse = await apiGet<PaginateResponse<INotice>>({
        apiPath: `${NOTICES}/recipients/${userId}?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(noticeResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get the details of a single notice
  static async getNoticeDetails(id: INotice['id']): Promise<INotice> {
    try {
      const noticeResponse = await apiGet<ResponseSuccess<INotice>>({
        apiPath: `${NOTICES}/${id}`,
      });
      return Promise.resolve(noticeResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  // Create a Notice
  static async createNotice({
    noticeData,
  }: {
    noticeData: NoticeSchemaType;
  }): Promise<void> {
    try {
      const formData = new FormData();
      if (noticeData.status) {
        formData.append('status', noticeData.status);
      }
      formData.append('issue_date', dayjs(noticeData.issue_date).toISOString());
      formData.append('subject', noticeData.subject);
      formData.append('content', noticeData.content);
      formData.append('sender_id', noticeData.sender_id);
      if (
        noticeData.recipient_ids !== undefined &&
        Array.isArray(noticeData.recipient_ids)
      ) {
        formData.append('recipient_ids', JSON.stringify(noticeData.recipient_ids));
      }

      if (noticeData.attachments !== undefined) {
        noticeData.attachments.forEach((attachment) => {
          const file = attachment as File;
          formData.append('files', file);
        });
      }

      await apiPost({
        apiPath: `${NOTICES}`,
        data: formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });
      SuccessHandler.handle('Successfully created.');
    } catch (error) {
      return Promise.reject();
    }
  }

  // Update a notice
  static async updateNotice({
    noticeId,
    noticeUpdateData,
  }: {
    noticeId: INotice['id'];
    noticeUpdateData: Partial<NoticeSchemaType>;
  }): Promise<void> {
    try {
      const formData = new FormData();
      if (noticeUpdateData.status) {
        formData.append('status', noticeUpdateData.status);
      }
      if (noticeUpdateData.issue_date) {
        formData.append('issue_date', dayjs(noticeUpdateData.issue_date).toISOString());
      }
      if (noticeUpdateData.subject) {
        formData.append('subject', noticeUpdateData.subject);
      }
      if (noticeUpdateData.content) {
        formData.append('content', noticeUpdateData.content);
      }
      if (noticeUpdateData.sender_id) {
        formData.append('sender_id', noticeUpdateData.sender_id);
      }

      if (
        noticeUpdateData.recipient_ids !== undefined &&
        Array.isArray(noticeUpdateData.recipient_ids)
      ) {
        formData.append('recipient_ids', JSON.stringify(noticeUpdateData.recipient_ids));
      }

      if (noticeUpdateData.attachments !== undefined) {
        noticeUpdateData.attachments.forEach((attachment) => {
          const file = attachment as File;
          formData.append('files', file);
        });
      }

      await apiPatch({
        apiPath: `${NOTICES}/${noticeId}`,
        data: formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });
      SuccessHandler.handle('Successfully updated.');
    } catch (error) {
      return Promise.reject();
    }
  }

  // Delete an attachment
  static async deleteAttachmentOfNotice({
    noticeId,
    file_path,
  }: {
    noticeId: INotice['id'];
    file_path: string;
  }): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${NOTICES}/${noticeId}?file_path=${file_path}`,
      });
      SuccessHandler.handle('Successfully Deleted.');
    } catch (error) {
      return Promise.reject();
    }
  }

  // Get number of active notices
  // This will give total number of sent notices which has issue date from today to future
  static async findTotalActiveNoticeOfUser(
    userId: IUser['id'],
  ): Promise<IActiveNoticeNumber> {
    try {
      const response = await apiGet<ResponseSuccess<IActiveNoticeNumber>>({
        apiPath: `${NOTICES}/active/${userId}`,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  // Get the pinned notice
  static async getPinnedNotice(userId: IUser['id']): Promise<INotice> {
    try {
      const noticeResponse = await apiGet<ResponseSuccess<INotice>>({
        apiPath: `${NOTICES}/pinned/${userId}`,
      });
      return Promise.resolve(noticeResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  // Make a notice pinned
  static async makeNoticePinned({
    noticeId,
    payload,
  }: {
    noticeId: INotice['id'];
    payload: NoticePinningPayloadType;
  }) {
    try {
      await apiPatch({
        apiPath: `${NOTICES}/${noticeId}/pinned`,
        data: { ...payload },
      });
      SuccessHandler.handle('The operation was successfull');
    } catch (error) {
      return Promise.reject();
    }
  }
}
