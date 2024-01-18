import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import NoticeService from '../../../service/notice.service';
import { IUser } from '../../../types';

function useFindActiveNoticeNumberOfUser(userId: IUser['id']) {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVE_NOTICES],
    queryFn: () => NoticeService.findTotalActiveNoticeOfUser(userId),
  });
}

export default useFindActiveNoticeNumberOfUser;
