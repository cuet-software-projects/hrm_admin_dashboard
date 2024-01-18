import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import UserService from '../../../service/user.service';
import { PaginationQueryParams } from '../../../types';

const useGetUsersWhoAreCurrentEmployee = ({
  page,
  limit,
  sorts,
  includes,
}: PaginationQueryParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_EMPLOYEE_LISTS, page, limit, sorts, includes],
    queryFn: () =>
      UserService.getUsersWithCurrentEmployment({ page, limit, sorts, includes }),
  });
};

export default useGetUsersWhoAreCurrentEmployee;
