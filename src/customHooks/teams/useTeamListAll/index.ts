import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import TeamService from '../../../service/team.service';

export function useGetTeamListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.TEAM_LIST_ALL],
    queryFn: () => TeamService.getAllTeams(),
  });
}
