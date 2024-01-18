import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import { utils } from '../../../helpers/utility';
import LeaveService from '../../../service/leave.service';
import { PaginationQueryParams } from '../../../types';

export function useGetLeaveList({
  page,
  limit,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.LEAVE_LISTS,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      LeaveService.getLeaves({ page, limit, filters, includes, search, sorts }),
  });
}
