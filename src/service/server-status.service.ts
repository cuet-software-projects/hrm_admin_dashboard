import { apiGet } from '../helpers/axios/config';

export default class ServerStatusService {
  static async getServerStatus(): Promise<boolean> {
    try {
      const serverStatus = await apiGet<boolean>({
        apiPath: '',
      });

      return Promise.resolve(!!serverStatus);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
