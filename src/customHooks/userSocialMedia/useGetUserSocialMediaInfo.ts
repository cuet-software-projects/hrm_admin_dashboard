/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import UserSocialMediaService from '../../service/user-social-media.service';
import { IUser } from '../../types';

export function useGetUserSocialMediaInfo({ userId }: { userId: IUser['id'] }) {
  return useQuery({
    queryKey: [QUERY_KEYS.SOCIAL_MEDIA, userId],
    queryFn: () => UserSocialMediaService.getSocialMediaInfoOfUser(userId),
  });
}
