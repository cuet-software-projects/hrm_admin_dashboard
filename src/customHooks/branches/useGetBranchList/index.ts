import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import { utils } from '../../../helpers/utility';
import BranchService from '../../../service/branch.service';
import { PaginationQueryParams } from '../../../types';

export function useGetBranchList({
  page,
  limit,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.BRANCH_LISTS,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      BranchService.getBranches({ page, limit, filters, includes, search, sorts }),
  });
}
