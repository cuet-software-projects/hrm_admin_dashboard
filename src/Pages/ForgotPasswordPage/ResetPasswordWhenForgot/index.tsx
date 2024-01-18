import { useSearchParams } from 'react-router-dom';

import ResetPasswordWhenForgot from '../../../component/ResetPasswordWhenForgot';

const ResetPasswordWhenForgotPage = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');

  return (
    <div>
      <ResetPasswordWhenForgot resetToken={resetToken as string} />
    </div>
  );
};

export default ResetPasswordWhenForgotPage;
