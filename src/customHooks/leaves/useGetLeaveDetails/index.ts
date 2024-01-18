/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import LeaveService from '../../../service/leave.service';
import { ILeave } from '../../../types/leave.type';

export function useLeaveDetails({ leaveId }: { leaveId?: ILeave['id'] | null }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.LEAVE_DETAILS, leaveId],
    queryFn: () => LeaveService.getLeaveDetails({ leaveId: leaveId! }),
    enabled: !!leaveId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!leaveId,
  };
}
