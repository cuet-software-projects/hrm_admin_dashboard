import { BackwardOutlined } from '@ant-design/icons';
import { Button as AntdButton, Result } from 'antd';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '../../schema/ForgotPasswordSchema';
import AuthService from '../../service/auth.service';
import ForgotPasswordForm from '../VisualizationComponents/Forms/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      onSendRequest(values);
    },
  });

  const { setSubmitting, resetForm } = formik;

  // send the mail to the server
  const onSendRequest = async (values: ForgotPasswordSchemaType) => {
    try {
      await AuthService.forgotPassword(values);
      setSubmitting(false);
      resetForm?.();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const handleGotoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center px-4">
      <div className="max-w-[400px] border border-b-2 border-black-1 border-opacity-20 px-5 pb-5 rounded">
        <Result
          status={'warning'}
          title={'Forgot Password'}
          subTitle="Enter Your Email and We well send you an email to reset your password."
        />
        <FormikProvider value={formik}>
          <ForgotPasswordForm />
        </FormikProvider>
        <div className="flex justify-center">
          <AntdButton
            type="link"
            icon={<BackwardOutlined rev={''} className="my-3" />}
            onClick={handleGotoLogin}
          >
            Go to Login
          </AntdButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
