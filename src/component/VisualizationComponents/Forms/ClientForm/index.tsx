/* eslint-disable simple-import-sort/imports */
import { Alert, Input as AntdInput, Divider, Typography } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';

import { ClientSchemaType } from '../../../../schema/ClientSchema';
import useDrawerStore from '../../../../store/drawerStore';
import Button from '../../../Resuables/Button/Button';
import DrawerFooter from '../../../Resuables/DrawerFooter';
import Icon from '../../../Resuables/Icon/Icon';
import Input from '../../../Resuables/Input';
import Label from '../../../Resuables/Label';

const ClientForm: React.FC = () => {
  const { errors, values, handleChange, touched, handleSubmit, isSubmitting } =
    useFormikContext<ClientSchemaType>();
  const { mode: drawerMode } = useDrawerStore();

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-20" onSubmit={handleSubmit}>
        <Alert
          message={
            <Typography.Title level={5}>
              You are going to create a user with Client Role.
            </Typography.Title>
          }
          type="info"
        />
        <ErrorMessage name="class_role_id" component="div" className="error" />
        <Divider>Basic Info</Divider>
        {/* First name and last name */}
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="w-full lg:w-1/2">
            <Label htmlFor="first_name">First Name</Label>
            <br />
            <Input
              type="text"
              id="first_name"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              placeholder="First Name"
              errorMessage={
                errors.first_name && touched.first_name ? errors.first_name : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Label htmlFor="last_name">Last Name</Label>
            <br />
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              errorMessage={errors.last_name && touched.last_name ? errors.last_name : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        {/* User name & Contact Number*/}
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="userName">Username</Label>
            <br />
            <Input
              type="text"
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              placeholder="Username"
              errorMessage={errors.userName && touched.userName ? errors.userName : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>

          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <br />
            <Input
              type="text"
              id="contact_number"
              name="contact_number"
              value={values.contact_number}
              onChange={handleChange}
              placeholder="Contact Number"
              errorMessage={
                errors.contact_number && touched.contact_number
                  ? errors.contact_number
                  : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="email">Email</Label>
          <br />
          <Input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            errorMessage={errors.email && touched.email ? errors.email : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        {/* Billing Info */}
        <Divider>Billing Info</Divider>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          {/* Address Line 1 */}
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="address_line_1">Address Line 1</Label>
            <br />
            <AntdInput.TextArea
              title="Address Line 1"
              id="address_line_1"
              name="address_line_1"
              value={values.address_line_1}
              onChange={handleChange}
              placeholder="name"
              className="w-full text-left bg-primary bg-opacity-10 border-none text-black-1 outline-none hide-scrollbar"
              size="large"
              autoSize
            />
            <ErrorMessage name={'address_line_1'} component="div" className="error" />
          </div>

          {/* Address Line 2 */}
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="address_line_2">Address Line 2</Label>
            <br />
            <AntdInput.TextArea
              title="Address Line 2"
              id="address_line_2"
              name="address_line_2"
              value={values.address_line_2}
              onChange={handleChange}
              placeholder="name"
              className="w-full text-left bg-primary bg-opacity-10 border-none text-black-1 outline-none hide-scrollbar"
              size="large"
              autoSize
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          {/* City */}
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="city">City</Label>
            <br />
            <Input
              type="text"
              value={values.city}
              onChange={handleChange}
              id="city"
              name="city"
              placeholder="City"
              errorMessage={errors.city && touched.city ? errors.city : ''}
              className="w-full mt-2 outline-none text-black-1"
            />
          </div>

          {/* State */}
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="state">State</Label>
            <br />
            <Input
              type="text"
              value={values.state}
              onChange={handleChange}
              id="state"
              name="state"
              placeholder="state"
              errorMessage={errors.state && touched.state ? errors.state : ''}
              className="w-full mt-2 outline-none text-black-1"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          {/* Country */}
          <div className="py-3">
            <Label htmlFor="country">Country</Label>
            <br />
            <Input
              type="text"
              value={values.country}
              onChange={handleChange}
              id="country"
              name="country"
              placeholder="country"
              errorMessage={errors.country && touched.country ? errors.country : ''}
              className="w-full mt-2 outline-none text-black-1"
            />
          </div>

          {/* Zip Code */}
          <div className="py-3">
            <Label htmlFor="zip_code">Zip Code</Label>
            <br />
            <Input
              type="text"
              value={values.zip_code}
              onChange={handleChange}
              id="zip_code"
              name="zip_code"
              placeholder="zip_code"
              errorMessage={errors.zip_code && touched.zip_code ? errors.zip_code : ''}
              className="w-full mt-2 outline-none text-black-1"
            />
          </div>
        </div>

        <DrawerFooter>
          <Button
            // disabled={drawerMode === 'create' && values.password !== confirmPass}
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            icon={<Icon name={'ic_add'} color="white" size={20} />}
          >
            <span className="uppercase">{drawerMode} Client</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default ClientForm;
