import { MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ErrorMessage, Form, useFormikContext } from 'formik';

import { ForgotPasswordSchemaType } from '../../../../schema/ForgotPasswordSchema';
import Button from '../../../Resuables/Button/Button';

const ForgotPasswordForm = () => {
  const { values, isSubmitting, handleChange, handleSubmit } =
    useFormikContext<ForgotPasswordSchemaType>();

  return (
    <Form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <Input
        id="email"
        size="large"
        prefix={<MailOutlined rev={''} />}
        value={values.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <ErrorMessage name="email" component="div" className="error" />
      <Button
        block
        className="flex justify-center items-center"
        isLoading={isSubmitting}
        htmlType={`${isSubmitting ? 'button' : 'submit'}`}
      >
        Send Reset Link
      </Button>
    </Form>
  );
};

export default ForgotPasswordForm;
