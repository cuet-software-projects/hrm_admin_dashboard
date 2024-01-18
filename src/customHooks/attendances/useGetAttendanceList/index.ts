import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import AttendanceService from '../../../service/attendance.service';
import { PaginationQueryParams } from '../../../types';

export function useGetAttendanceList({
  page,
  limit,
  includes,
  sorts,
  search,
  filters,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.ATTENDANCE_LISTS,
      page,
      limit,
      includes,
      sorts,
      search,
      filters,
    ],
    queryFn: () =>
      AttendanceService.getAttendances({ page, limit, includes, sorts, search, filters }),
  });
}
