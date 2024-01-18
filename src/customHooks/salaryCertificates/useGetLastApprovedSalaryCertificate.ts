import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import DocuemntApplyService from '../../service/documentApplyService';

export function useGetLastApprovedSalaryCertificate({ userId }: { userId: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.SALARY_CERTIFICATE_APPROVAL, userId],
    queryFn: () =>
      DocuemntApplyService.getLastApprovedSalaryCertificateOfUser({ userId }),
  });
}
