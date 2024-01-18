import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import DocuemntApplyService from '../../service/documentApplyService';
import { PaginationQueryParams } from '../../types';

export function useGetSalaryCertificates({
  page,
  limit,
  filters,
  includes,
  search,
  sorts,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.SALARY_CERTIFICATE_LIST,
      page,
      limit,
      filters,
      includes,
      search,
      sorts,
    ],
    queryFn: () =>
      DocuemntApplyService.getSalaryCertificates({
        page,
        limit,
        filters,
        includes,
        search,
        sorts,
      }),
  });
}
