import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import { utils } from '../../../helpers/utility';
import UserService from '../../../service/user.service';
import { PaginationQueryParams } from '../../../types';

export function useGetUserList({
  page,
  limit,
  includes,
  filters,
  search,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.USER_LISTS,
      page,
      limit,
      includes,
      filters ? utils.createFilterString(filters) : '',
      search,
    ],
    queryFn: () => UserService.getUsers({ page, limit, includes, filters, search }),
  });
}
