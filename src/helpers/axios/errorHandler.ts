import { toast } from 'react-toastify';

import { logger } from '../../service';
import { ResponseError } from '../../types';

class ErrorHandler {
  static handle(error: ResponseError) {
    logger.error(error);
    toast.error(error.message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export default ErrorHandler;
