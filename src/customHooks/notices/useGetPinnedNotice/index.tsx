import { useQuery } from '@tanstack/react-query';

import NoticeService from '../../../service/notice.service';
import { IUser } from '../../../types';

function useGetPinnedNotice(userId: IUser['id']) {
  return useQuery({
    queryKey: [],
    queryFn: () => NoticeService.getPinnedNotice(userId),
  });
}

export default useGetPinnedNotice;
