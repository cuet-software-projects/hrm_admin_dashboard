import { useQuery } from '@tanstack/react-query';

import AuthService from '../../service/auth.service';

const useVerifyResetPasswordToken = (token: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => AuthService.resetPasswordVerifyToken(token),
  });
};

export default useVerifyResetPasswordToken;
