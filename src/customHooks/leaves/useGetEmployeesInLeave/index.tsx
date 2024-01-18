import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import LeaveService from '../../../service/leave.service';
import { PaginationQueryParams } from '../../../types';

export function useGetEmployeesInLeave({
  page,
  limit,
  date,
}: PaginationQueryParams & { date: Date }) {
  return useQuery({
    queryKey: [QUERY_KEYS.IN_LEAVE, page, limit, date],
    queryFn: () => LeaveService.getEmployeesInLeave({ page, limit, date }),
  });
}
