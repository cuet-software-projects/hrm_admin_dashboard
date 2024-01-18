import { Input as AntdInput } from 'antd';
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

import { LoginSchemaType } from '../../../schema/LoginSchema';
import LoginHeader from '../../Login/LoginHeader';
import Button from '../../Resuables/Button/Button';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';

const LoginForm: React.FC = () => {
  const { errors, touched, handleSubmit, handleChange, isSubmitting } =
    useFormikContext<LoginSchemaType>();

  return (
    <div style={{ width: '467px' }}>
      <LoginHeader />
      <Form onSubmit={handleSubmit}>
        <div className="py-3 mt-10">
          <Label htmlFor="email">Email</Label>
          <br />
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            autoComplete="username"
            as={Input}
            errorMessage={errors.email && touched.email ? errors.email : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>
        <div className="py-3">
          <Label htmlFor="password">Password</Label>
          <br />
          <div className="mt-2 rounded-md">
            <AntdInput.Password
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="**************"
              onChange={handleChange}
              className="px-4 py-2 border-none outline-none text-black-1 w-full h-full bg-brand-grad-1 bg-opacity-10"
              classNames={{
                input: 'bg-brand-grad-1 bg-opacity-0',
              }}
            />
            <ErrorMessage component="div" className="error text-danger" name="password" />
          </div>
        </div>

        {/* Go to Forgot Password page */}
        <div className="text-right underline">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <Button
          htmlType={`${isSubmitting ? 'button' : 'submit'}`}
          isLoading={isSubmitting}
          text="Login"
          className="btn-md w-full mt-8 flex justify-center items-center"
        />
      </Form>
    </div>
  );
};

export default LoginForm;
