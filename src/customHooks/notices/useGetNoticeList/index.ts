import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import NoticeService from '../../../service/notice.service';
import { PaginationQueryParams } from '../../../types';

function useGetNoticeList(params: PaginationQueryParams) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.NOTICE_LISTS,
      params.page,
      params.limit,
      params.includes,
      params.sorts,
      params.search,
      params.filters,
    ],
    queryFn: () => NoticeService.getNoticesOfAllUsers({ ...params }),
  });
}

export default useGetNoticeList;
