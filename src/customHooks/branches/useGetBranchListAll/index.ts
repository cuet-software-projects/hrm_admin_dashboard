import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import BranchService from '../../../service/branch.service';

export function useGetBranchListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCH_LIST_ALL],
    queryFn: () => BranchService.getAllBranches(),
  });
}
