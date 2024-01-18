import { useFormikContext } from 'formik';
import React from 'react';

import { DepartmentSchemaType } from '../../../schema/DepartmentSchema';
import useDrawerStore from '../../../store/drawerStore';
import Button from '../../Resuables/Button/Button';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import Textarea from '../../Resuables/Textarea';

const DepartmentForm: React.FC = () => {
  const { mode } = useDrawerStore();
  const { errors, values, handleChange, touched, handleSubmit, isSubmitting } =
    useFormikContext<DepartmentSchemaType>();

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-28" onSubmit={handleSubmit}>
        <div className="py-3">
          <Label htmlFor="name">Name</Label>
          <br />
          <Input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Department Name"
            errorMessage={errors.name && touched.name ? errors.name : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>
        <div className="py-3">
          <Label htmlFor="code">Code</Label>
          <br />
          <Input
            type="text"
            value={values.code}
            onChange={handleChange}
            id="code"
            name="code"
            placeholder="Department Code"
            errorMessage={errors.code && touched.code ? errors.code : ''}
            className="w-full mt-2 outline-none text-black-1"
          />
        </div>
        <div className="py-3">
          <Label htmlFor="prefix_code">Prefix Code</Label>
          <br />
          <Input
            type="text"
            value={values.prefix_code}
            onChange={handleChange}
            id="prefix_code"
            name="prefix_code"
            placeholder="Department Prefix Code"
            errorMessage={
              errors.prefix_code && touched.prefix_code ? errors.prefix_code : ''
            }
            className="w-full mt-2 outline-none text-black-1"
          />
        </div>
        <div className="py-3 mb-12">
          <Label htmlFor="description">Description</Label>
          <br />
          <Textarea
            id="description"
            name="description"
            placeholder="Department Description"
            value={values.description}
            onChange={handleChange}
            errorMessage={
              errors.description && touched.description ? errors.description : ''
            }
            className="w-full h-28 mt-2 outline-none text-black-1"
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
            <span className="ml-3 uppercase">{mode} Department</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default DepartmentForm;
