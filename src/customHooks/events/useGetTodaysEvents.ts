import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/app-constants';
import EventService from '../../service/events.service';

const useGetTodaysEvents = ({ date }: { date: Date }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODAYS_EVENTS, date],
    queryFn: () => EventService.getTodaysEvents({ date }),
  });
};

export default useGetTodaysEvents;
