/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import BillingInfoService from '../../../service/billing-info.service';
import { IUser } from '../../../types';
import { IBillingInfo } from '../../../types/billing-info.type';

export function useGetBillingInfoDetails({
  userId,
  billingInfoId,
}: {
  userId: IUser['id'] | null;
  billingInfoId?: IBillingInfo['id'];
}) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.BILLING_INFO_DETAILS, userId, billingInfoId],
    queryFn: () => BillingInfoService.getBillingInfoDetails(userId!),
    enabled: !!userId || !!billingInfoId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!userId,
  };
}
