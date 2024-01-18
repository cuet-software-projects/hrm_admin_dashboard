import { toast } from 'react-toastify';

class SuccessHandler {
  static handle(successMsg: string) {
    toast.success(successMsg, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export default SuccessHandler;
