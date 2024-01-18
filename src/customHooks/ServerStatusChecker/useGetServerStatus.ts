import { useQuery } from '@tanstack/react-query';

import ServerStatusService from '../../service/server-status.service';

export function useGetServerStatus() {
  return useQuery({
    queryKey: [],
    queryFn: () => ServerStatusService.getServerStatus(),
  });
}
