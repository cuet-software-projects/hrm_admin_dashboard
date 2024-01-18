import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import { utils } from '../../helpers/utility';
import FeedbackService from '../../service/feedback.service';
import { PaginationQueryParams } from '../../types';

export function useGetFeedbacks({ page, limit, filters }: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.FEEDBACK_LIST,
      page,
      limit,
      filters ? utils.createFilterString(filters) : '',
    ],
    queryFn: () => FeedbackService.getFeedbacks({ page, limit, filters }),
  });
}
