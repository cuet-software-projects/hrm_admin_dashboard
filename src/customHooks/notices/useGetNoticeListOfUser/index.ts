import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import NoticeService from '../../../service/notice.service';
import { IUser, PaginationQueryParams } from '../../../types';

function useGetNoticeListOfUser(params: PaginationQueryParams & { userId: IUser['id'] }) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.NOTICE_LISTS,
      params.userId,
      params.page,
      params.limit,
      params.includes,
      params.sorts,
      params.search,
      params.filters,
    ],
    queryFn: () => NoticeService.getNoticesOfUser({ ...params }),
  });
}

export default useGetNoticeListOfUser;
