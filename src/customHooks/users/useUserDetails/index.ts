/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import UserService from '../../../service/user.service';
import { IUser } from '../../../types';

export function useUserDetails({ userId }: { userId?: IUser['id'] | null }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_DETAILS, userId],
    queryFn: () => UserService.getUserDetails(userId!),
    enabled: !!userId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!userId,
  };
}
