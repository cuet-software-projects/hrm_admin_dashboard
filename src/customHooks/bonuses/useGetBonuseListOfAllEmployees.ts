import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import { utils } from '../../helpers/utility';
import BonusService from '../../service/bonus.service';
import { PaginationQueryParams } from '../../types';

export function useGetBonusListOfAllEmployees({
  page = 1,
  limit = 10,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.BONUS_LISTS,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      BonusService.getBonusesOfAllEmployees({
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
  });
}
