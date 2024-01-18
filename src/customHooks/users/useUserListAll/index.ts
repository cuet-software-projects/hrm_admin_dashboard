import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import UserService from '../../../service/user.service';

export function useGetUserListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_LIST_ALL],
    queryFn: () => UserService.getAllUsers(),
  });
}
