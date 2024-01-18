import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';

import { LoginSchema, LoginSchemaType } from '../../schema/LoginSchema';
import useAuthStore from '../../store/authStore';
import LoginForm from '../VisualizationComponents/Forms/LoginForm';
import LoginSlider from './LoginSlider';

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const { setSubmitting } = formik;

  const handleLogin = async (values: LoginSchemaType) => {
    try {
      await login(values);
      setSubmitting(false);
      navigate('/dashboard');
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-0 lg:w-1/2 bg-black-1 h-full">
        <LoginSlider />
      </div>
      <div className="w-full bg-white-1 lg:w-1/2 h-full flex justify-center items-center px-10 lg:p-0">
        <FormikProvider value={formik}>
          <LoginForm />
        </FormikProvider>
      </div>
    </div>
  );
};

export default Login;
