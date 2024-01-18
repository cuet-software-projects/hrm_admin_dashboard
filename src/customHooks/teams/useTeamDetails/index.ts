/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import TeamService from '../../../service/team.service';
import { ITeam } from '../../../types';

export function useTeamDetails({ teamId }: { teamId?: ITeam['id'] | null }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.TEAM_DETAILS, teamId],
    queryFn: () => TeamService.getTeamDetails(teamId!),
    enabled: !!teamId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!teamId,
  };
}
