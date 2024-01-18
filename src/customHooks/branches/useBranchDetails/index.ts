/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import BranchService from '../../../service/branch.service';
import { IBranch } from '../../../types';

export function useBranchDetails({ branchId }: { branchId?: IBranch['id'] | null }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.BRANCH_DETAILS, branchId],
    queryFn: () => BranchService.getBranchDetails(branchId!),
    enabled: !!branchId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!branchId,
  };
}
