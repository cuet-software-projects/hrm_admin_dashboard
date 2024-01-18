import { FEEDBACK, FEEDBACKS, USERS } from '../constants/api';
import { apiGet, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { FeedbackSchemaType } from '../schema/FeedbackSchema';
import { PaginateResponse, PaginationQueryParams } from '../types';
import { IFeedback } from '../types/feedback.type';

export default class FeedbackService {
  // Get feedbacks of all user with pagination
  static async getFeedbacks({
    page = 1,
    limit = 10,
    filters,
  }: PaginationQueryParams): Promise<PaginateResponse<IFeedback>> {
    try {
      const allUserFeedbacks = await apiGet<PaginateResponse<IFeedback>>({
        apiPath: `${FEEDBACKS}?page=${page}&limit=${limit}${
          filters ? `${utils.createFilterString(filters)}` : ''
        }`,
      });
      return Promise.resolve(allUserFeedbacks);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // This is for getting paginated feedbacks for a single user
  static async getFeedbacksOfuser({
    userId,
    page = 1,
    limit = 10,
  }: PaginationQueryParams & { userId: string }): Promise<PaginateResponse<IFeedback>> {
    try {
      const userFeedbacks = await apiGet<PaginateResponse<IFeedback>>({
        apiPath: `${USERS}/${userId}${FEEDBACKS}?page=${page}&limit=${limit}`,
      });
      return Promise.resolve(userFeedbacks);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Create a feedback by user
  static async createFeedback({
    userId,
    feedbackData,
  }: {
    userId: string;
    feedbackData: FeedbackSchemaType;
  }): Promise<void> {
    try {
      await apiPost({ apiPath: `${USERS}/${userId}${FEEDBACK}`, data: feedbackData });
      SuccessHandler.handle('Successfully Created.');
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
