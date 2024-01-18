import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import LeaveService from '../../../service/leave.service';

export function useGetLeavesOverallOfAnEmployee({ employeeId }: { employeeId: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.LEAVE_OVERVIEW, employeeId],
    queryFn: () => LeaveService.getLeavesOverviewOfAnEmployee({ employeeId: employeeId }),
  });
}
