import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import UserService from '../../../service/user.service';

const useGetAllUsersWhoAreCurrentlyEmployed = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_EMPLOYEE_LIST_ALL],
    queryFn: () => UserService.getAllUsersWhoAreCurrentlyEmployed(),
  });
};

export default useGetAllUsersWhoAreCurrentlyEmployed;
