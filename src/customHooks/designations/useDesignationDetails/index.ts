/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import DesignationService from '../../../service/designation.service';
import { IDesignation } from '../../../types';

export function useDesignationDetails({
  designationId,
}: {
  designationId?: IDesignation['id'] | null;
}) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.DESIGNATION_DETAILS, designationId],
    queryFn: () => DesignationService.getDesignationDetails(designationId!),
    enabled: !!designationId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!designationId,
  };
}
