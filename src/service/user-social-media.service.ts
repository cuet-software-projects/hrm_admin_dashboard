import { SOCIAL_MEDIA } from '../constants/api';
import { apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { IUser, ResponseSuccess } from '../types';
import {
  IUserSocialMedia,
  UserSocialMediaReqBody,
} from '../types/user-social-media.type';

class UserSocialMediaService {
  // Get Social media info of a user
  static async getSocialMediaInfoOfUser(userId: IUser['id']): Promise<IUserSocialMedia> {
    try {
      const socialMediaInfo = await apiGet<ResponseSuccess<IUserSocialMedia>>({
        apiPath: `${SOCIAL_MEDIA}/${userId}`,
      });
      return socialMediaInfo.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Create Social Media info of a user
  static async createSocialMediaInfo(
    socialMediaData: UserSocialMediaReqBody,
  ): Promise<void> {
    try {
      await apiPost({
        apiPath: `${SOCIAL_MEDIA}`,
        data: socialMediaData,
      });
      SuccessHandler.handle('Successfully Created.');
    } catch (error) {
      Promise.reject(error);
    }
  }

  // Update social media info of a user
  static async updateSocialMediaInfo({
    socialMediaId,
    updatedData,
  }: {
    socialMediaId: string;
    updatedData: Partial<UserSocialMediaReqBody>;
  }): Promise<void> {
    try {
      await apiPatch({ apiPath: `${SOCIAL_MEDIA}/${socialMediaId}`, data: updatedData });
      SuccessHandler.handle('Successfully updated');
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export default UserSocialMediaService;
