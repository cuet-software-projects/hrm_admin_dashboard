import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import TeamService from '../../../service/team.service';
import { PaginationQueryParams } from '../../../types';

export function useGetTeamList({ page, limit }: PaginationQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.TEAM_LISTS, page, limit],
    queryFn: () => TeamService.getTeams({ page, limit }),
  });
}
