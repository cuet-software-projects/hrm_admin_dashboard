import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import DesignationService from '../../../service/designation.service';

export function useGetDesignationListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.DESIGNATION_LIST_ALL],
    queryFn: () => DesignationService.getAllDesignations(),
  });
}
