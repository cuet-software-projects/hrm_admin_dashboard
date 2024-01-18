import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';

import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '../../../../schema/ResetPasswordSchema';
import UserService from '../../../../service/user.service';
import useAuthStore from '../../../../store/authStore';
import Button from '../../../Resuables/Button/Button';
import Input from '../../../Resuables/Input';
import Label from '../../../Resuables/Label';
import Loading from '../../../Resuables/Loader';

const ResetPasswordForm: React.FC = () => {
  const { userProfileData } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      new_password: '',
      old_password: '',
      confirm_password: '',
    },
    validationSchema: ResetPasswordSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.new_password === values.old_password) {
        toast.error('Your new and old password are same!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        onResetPassword(values);
      }
    },
  });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
    setSubmitting,
    isSubmitting,
  } = formik;

  const onResetPassword = async (values: ResetPasswordSchemaType) => {
    try {
      await UserService.resetPassword({ userId: `${userProfileData?.id}`, ...values });
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full lg:w-[500px]">
        <h2 className="text-2xl mb-4 text-center font-bold">Reset Password</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="py-3">
            <Label htmlFor="old_password">Enter Old Password</Label>
            <br />
            <Input
              type="password"
              id="old_password"
              name="old_password"
              value={values.old_password}
              onChange={handleChange}
              placeholder="******"
              errorMessage={
                errors.old_password && touched.old_password ? errors.old_password : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="py-3">
            <Label htmlFor="new_password">Enter New Password</Label>
            <br />
            <Input
              type="password"
              id="new_password"
              name="new_password"
              value={values.new_password}
              onChange={handleChange}
              placeholder="******"
              errorMessage={
                errors.new_password && touched.new_password ? errors.new_password : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="py-3">
            <Label htmlFor="new_password">Confirm New Password</Label>
            <br />
            <Input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              placeholder="******"
              errorMessage={
                errors.confirm_password && touched.confirm_password
                  ? errors.confirm_password
                  : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              htmlType={`${isSubmitting ? 'button' : 'submit'}`}
              size="large"
              block
              className="flex justify-center items-center"
            >
              {isSubmitting ? <Loading size="large" color="white-1" /> : 'Reset Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
