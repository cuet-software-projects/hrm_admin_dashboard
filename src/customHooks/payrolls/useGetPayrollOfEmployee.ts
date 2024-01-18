import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import { utils } from '../../helpers/utility';
import PayrollService from '../../service/salary.service';
import { PaginationQueryParams } from '../../types';
import { IEmployee } from '../../types/employee.type';

export function useGetPayrollOfEmployee({
  employeeId,
  page = 1,
  limit = 10,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams & {
  employeeId: IEmployee['id'];
}) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.PAYROLL_LISTS,
      employeeId,
      page,
      limit,
      search,
      sorts,
      includes,
      filters ? utils.createFilterString(filters) : '',
    ],
    queryFn: () =>
      PayrollService.getSalaryOfEmployee({
        employeeId,
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
  });
}
