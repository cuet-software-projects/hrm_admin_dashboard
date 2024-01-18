import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import EmployeeService from '../../../service/employee.service';
import { PaginationQueryParams } from '../../../types';

export function useGetEmploymeeList({
  page,
  limit,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.EMPLOYEE_LISTS, page, limit, filters, includes, search, sorts],
    queryFn: () =>
      EmployeeService.getEmployees({ page, limit, filters, includes, search, sorts }),
  });
}
