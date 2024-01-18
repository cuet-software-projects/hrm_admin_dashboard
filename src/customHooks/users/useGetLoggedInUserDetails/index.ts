/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import AuthService from '../../../service/auth.service';

export function useGetLoggedInUserDetails() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.USER_DETAILS],
    queryFn: () => AuthService.fetchLoggedInUserInfo(),
  });
  return query;
}
