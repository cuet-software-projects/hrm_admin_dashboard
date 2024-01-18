import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import { utils } from '../../../helpers/utility';
import LeaveService from '../../../service/leave.service';
import { PaginationQueryParams } from '../../../types';
import { IEmployee } from '../../../types/employee.type';

export function useGetSingleEmployeeLeaveList({
  employeeId,
  page,
  limit,
  filters,
  includes,
  search,
  sorts,
}: {
  employeeId: IEmployee['id'];
} & PaginationQueryParams) {
  const query = useQuery({
    queryKey: [
      QUERY_KEYS.SINGLE_EMPLOYEE_LEAVE_LIST,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      LeaveService.getLeavesOfAnEmployee({
        employeeId: employeeId,
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
    enabled: !!employeeId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!employeeId,
  };
}
