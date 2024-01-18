import { useFormikContext } from 'formik';
import React from 'react';

import { BranchSchemaType } from '../../../schema/BranchSchema';
import useDrawerStore from '../../../store/drawerStore';
import Button from '../../Resuables/Button/Button';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';

const BranchForm: React.FC = () => {
  const { mode } = useDrawerStore();
  const { errors, values, handleChange, touched, setValues, handleSubmit, isSubmitting } =
    useFormikContext<BranchSchemaType>();

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-28" onSubmit={handleSubmit}>
        <div className="py-3">
          <Label htmlFor="code">Branch Code</Label>
          <br />
          <Input
            type="text"
            value={values.code.toUpperCase()}
            onChange={(e) => {
              setValues({
                ...values,
                code: e.target.value.toUpperCase(),
              });
            }}
            id="code"
            name="code"
            placeholder="e.g. CTG, DHK"
            errorMessage={errors.code && touched.code ? errors.code : ''}
            className="w-full mt-2 outline-none text-black-1"
          />
        </div>
        <div className="py-3">
          <Label htmlFor="name">Name</Label>
          <br />
          <Input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Branch name here"
            errorMessage={errors.name && touched.name ? errors.name : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>
        <div className="py-3">
          <Label htmlFor="address">Address</Label>
          <br />
          <Input
            type="text"
            value={values.address}
            onChange={handleChange}
            id="address"
            name="address"
            placeholder="Branch address here"
            errorMessage={errors.address && touched.address ? errors.address : ''}
            className="w-full mt-2 outline-none text-black-1"
          />
        </div>

        <DrawerFooter>
          <Button
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            isLoading={isSubmitting}
            icon={
              <Icon
                name={mode === 'create' ? 'ic_add' : 'ic_update'}
                color="white"
                size={20}
              />
            }
          >
            <span className="ml-3 uppercase">{mode} Branch</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default BranchForm;
