import { Input as AntdInput } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';

import { BillingInfoSchemaType } from '../../../../schema/BillingInfoSchema';
import useDrawerStore from '../../../../store/drawerStore';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import Button from '../../../Resuables/Button/Button';
import DrawerFooter from '../../../Resuables/DrawerFooter';
import Icon from '../../../Resuables/Icon/Icon';
import Input from '../../../Resuables/Input';
import Label from '../../../Resuables/Label';

const BillingInfoForm: React.FC = () => {
  const { errors, values, handleChange, touched, handleSubmit, isSubmitting } =
    useFormikContext<BillingInfoSchemaType>();

  const { selectedUser } = useInvoiceStore();
  const { mode } = useDrawerStore();

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-16" onSubmit={handleSubmit}>
        <div className="py-3 w-full">
          <Label htmlFor="user_id">User</Label>
          <br />
          <input
            value={
              values.user_id
                ? `${selectedUser?.first_name} ${selectedUser?.last_name} (${selectedUser?.userName})`
                : 'User not selected'
            }
            readOnly
            className="w-full text-left bg-primary bg-opacity-10 border-none text-black-1 outline-none px-4 py-2 rounded"
          />
        </div>

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
            loading={isSubmitting}
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            className="flex items-center"
            icon={<Icon name={'ic_add'} color="white" size={20} />}
          >
            <span> {mode === 'create' ? 'Add' : 'Update'} Billing Info</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default BillingInfoForm;
