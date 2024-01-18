import { useFormikContext } from 'formik';
import React from 'react';

import { TeamSchemaType } from '../../../schema/TeamSchema';
import useDrawerStore from '../../../store/drawerStore';
import Button from '../../Resuables/Button/Button';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import Textarea from '../../Resuables/Textarea';

const TeamForm: React.FC = () => {
  const { mode } = useDrawerStore();
  const { errors, values, handleChange, touched, handleSubmit, isSubmitting } =
    useFormikContext<TeamSchemaType>();

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
            placeholder="Team name here"
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
            placeholder="Team Description"
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
            <span className="ml-3 uppercase">{mode} Team</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default TeamForm;
