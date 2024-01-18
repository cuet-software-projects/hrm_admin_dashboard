import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import BonusService from '../../service/bonus.service';
import { PaginationQueryParams } from '../../types';
import { IEmployee } from '../../types/employee.type';

export function useGetBonusListOfEmployee({
  employeeId,
  page = 1,
  limit = 10,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams & {
  employeeId: IEmployee['id'];
}) {
  return useQuery({
    queryKey: [QUERY_KEYS.BONUS_LISTS, employeeId, page, limit],
    queryFn: () =>
      BonusService.getBonusesOfEmployee({
        employeeId,
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
  });
}
