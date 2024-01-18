import { Skeleton } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import useVerifyResetPasswordToken from '../../customHooks/auth/useVerifyResetPasswordToken';
import {
  ResetPasswordWhenForgotSchema,
  ResetPasswordWhenForgotSchemaType,
} from '../../schema/ResetPasswordWhenForgotSchema';
import AuthService from '../../service/auth.service';
import ResetPasswordWhenForgotForm from '../VisualizationComponents/Forms/ForgotPasswordForm/ResetPasswordWhenForgotForm';
import NotVerified from './NotVerified';

interface props {
  resetToken: string;
}

const ResetPasswordWhenForgot: React.FC<props> = ({ resetToken }) => {
  const { data, isLoading } = useVerifyResetPasswordToken(resetToken);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      token: resetToken as string,
      password: '',
      confirm_password: '',
    },
    validationSchema: ResetPasswordWhenForgotSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onResetPasswordWhenForgot(values);
    },
  });

  const { setSubmitting, resetForm } = formik;

  const onResetPasswordWhenForgot = async (values: ResetPasswordWhenForgotSchemaType) => {
    try {
      await AuthService.resetPasswordWhenForgot(values);
      setSubmitting(false);
      resetForm?.();
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (error) {
      setSubmitting(false);
    }
  };

  if (data && !data.verified) {
    return <NotVerified />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center px-4">
      <Skeleton
        loading={isLoading}
        active
        title={false}
        className="border border-black-1 border-opacity-10 w-[300px] px-5 py-10 rounded-lg"
        paragraph={{
          rows: 3,
          width: [300, 300, 100],
          className: 'flex flex-col items-center gap-3',
        }}
      >
        <FormikProvider value={formik}>
          <ResetPasswordWhenForgotForm />
        </FormikProvider>
      </Skeleton>
    </div>
  );
};

export default ResetPasswordWhenForgot;
