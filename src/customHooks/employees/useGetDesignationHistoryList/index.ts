import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import EmployeeService from '../../../service/employee.service';
import { PaginationQueryParams } from '../../../types';
import { IEmployee } from '../../../types/employee.type';

export function useGetDesignationHistoryList({
  employeeId,
  page,
  limit,
  sorts,
  filters,
  includes,
  search,
}: PaginationQueryParams & { employeeId: IEmployee['id'] | null }) {
  const query = useQuery({
    queryKey: [
      QUERY_KEYS.DESIGNATION_HISTORY_LIST,
      page,
      limit,
      sorts,
      filters,
      includes,
      search,
    ],
    queryFn: () => EmployeeService.getDesignationHistory({ id: employeeId, page, limit }),
    enabled: !!employeeId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!employeeId,
  };
}
