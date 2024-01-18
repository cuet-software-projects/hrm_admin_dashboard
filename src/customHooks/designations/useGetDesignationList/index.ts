import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import DesignationService from '../../../service/designation.service';
import { PaginationQueryParams } from '../../../types';

export function useGetDesignationList({ page, limit }: PaginationQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.DESIGNATION_LISTS, page, limit],
    queryFn: () => DesignationService.getDesignations({ page, limit }),
  });
}
