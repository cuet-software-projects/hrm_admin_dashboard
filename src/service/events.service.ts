import dayjs from 'dayjs';

import { EVENTS } from '../constants/api';
import { apiGet } from '../helpers/axios/config';
import { ResponseSuccess } from '../types';
import { IEventType } from '../types/events.type';

export default class EventService {
  // Getting all the events of today
  static async getTodaysEvents({ date }: { date: Date }): Promise<IEventType> {
    try {
      const events = await apiGet<ResponseSuccess<IEventType>>({
        apiPath: `${EVENTS}/${dayjs(date).format('YYYY-MM-DD')}`,
      });
      return Promise.resolve(events.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
