import { useFormikContext } from 'formik';
import React from 'react';

import { RolesSchemaType } from '../../../schema/RolesSchema';
import useDrawerStore from '../../../store/drawerStore';
import { ROLES_TYPES } from '../../../types/role.type';
import Button from '../../Resuables/Button/Button';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';
import Textarea from '../../Resuables/Textarea';

const RoleForm: React.FC = () => {
  const { mode } = useDrawerStore();
  const { errors, values, handleChange, setValues, touched, handleSubmit, isSubmitting } =
    useFormikContext<RolesSchemaType>();

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-28" onSubmit={handleSubmit}>
        <div className="py-3">
          <Label htmlFor="name">Role Name</Label>
          <br />
          <Select
            id="name"
            size="large"
            options={ROLES_TYPES.map((size: string) => ({ label: size, value: size }))}
            value={values.name ? values.name : undefined}
            onChange={(value) => setValues({ ...values, name: value })}
            errorMessage={errors.name && touched.name ? errors.name : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>
        <div className="py-3 mb-12">
          <Label htmlFor="description">Description</Label>
          <br />
          <Textarea
            id="description"
            name="description"
            placeholder="Role Description"
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
            icon={
              <Icon
                name={mode === 'create' ? 'ic_add' : 'ic_update'}
                color="white"
                size={20}
              />
            }
          >
            <span className="ml-3 uppercase">{mode} Role</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default RoleForm;
