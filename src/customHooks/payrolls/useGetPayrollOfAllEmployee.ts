import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import { utils } from '../../helpers/utility';
import PayrollService from '../../service/salary.service';
import { PaginationQueryParams } from '../../types';

export function useGetPayrollOfAllEmployees({
  page = 1,
  limit = 10,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.PAYROLL_LISTS,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      PayrollService.getSalaryOfAllEmployee({
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
  });
}
