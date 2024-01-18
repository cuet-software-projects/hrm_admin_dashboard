import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import FeedbackService from '../../service/feedback.service';
import { PaginationQueryParams } from '../../types';

export function useGetFeedbacksOfUser({
  userId,
  page = 1,
  limit = 10,
}: PaginationQueryParams & { userId: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.FEEDBACK_LIST, userId, page, limit],
    queryFn: () => FeedbackService.getFeedbacksOfuser({ userId, page, limit }),
  });
}
