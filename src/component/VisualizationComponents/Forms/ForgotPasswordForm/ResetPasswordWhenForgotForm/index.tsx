import { BackwardOutlined } from '@ant-design/icons';
import { Alert, Button as AntdButton, Input as AntdInput, Result } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';

import { ResetPasswordWhenForgotSchemaType } from '../../../../../schema/ResetPasswordWhenForgotSchema';
import Button from '../../../../Resuables/Button/Button';
import Label from '../../../../Resuables/Label';

const ResetPasswordWhenForgotForm: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, errors, isSubmitting } =
    useFormikContext<ResetPasswordWhenForgotSchemaType>();

  const handleGotoLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {errors.token && (
        <Alert
          type="error"
          className="mb-8 w-full lg:w-[350px] text-center"
          description={
            <p className="uppercase">
              {errors.token}.<br /> But No token found!!!
            </p>
          }
        />
      )}
      <div className="bg-white p-8 border border-black-1 border-opacity-30 rounded-lg w-full lg:w-[350px]">
        <Result className="p-0 pb-2" status={'info'} title={'Reset Password'} />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="py-3">
            <Label htmlFor="password">Enter New Password</Label>
            <br />
            <AntdInput.Password
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="**************"
              className="px-4 py-2 border-none outline-none text-black-1 w-full h-full bg-brand-grad-1 bg-opacity-10"
              classNames={{
                input: 'bg-brand-grad-1 bg-opacity-0',
              }}
            />
            <ErrorMessage component="div" className="error text-danger" name="password" />
          </div>
          <div className="py-3">
            <Label htmlFor="password">Confirm New Password</Label>
            <br />
            <AntdInput.Password
              id="confirm_password"
              name="confirm_password"
              value={values.confirm_password}
              placeholder="**************"
              onChange={handleChange}
              className="px-4 py-2 border-none outline-none text-black-1 w-full h-full bg-brand-grad-1 bg-opacity-10"
              classNames={{
                input: 'bg-brand-grad-1 bg-opacity-0',
              }}
            />
            <ErrorMessage
              component="div"
              className="error text-danger"
              name="confirm_password"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              htmlType={`${isSubmitting ? 'button' : 'submit'}`}
              isLoading={isSubmitting}
              size="large"
              block
              className="mt-2 flex justify-center items-center"
            >
              Reset Password
            </Button>
          </div>
        </form>
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

export default ResetPasswordWhenForgotForm;
