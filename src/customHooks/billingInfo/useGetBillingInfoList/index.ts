import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import { utils } from '../../../helpers/utility';
import BillingInfoService from '../../../service/billing-info.service';
import { PaginationQueryParams } from '../../../types';

export function useGetBillingInfoList({
  page,
  limit,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.BILLING_INFO_LISTS,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      BillingInfoService.getBillingInfos({
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
  });
}
