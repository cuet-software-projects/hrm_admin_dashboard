/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import NoticeService from '../../../service/notice.service';
import { INotice } from '../../../types/notice.type';

function useGetNoticeDetails(noticeId: INotice['id'] | null) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.NOTICE_DETAILS, noticeId],
    queryFn: () => NoticeService.getNoticeDetails(noticeId!),
  });

  return {
    ...query,
    isLoading: query.isLoading && !!noticeId,
  };
}

export default useGetNoticeDetails;
