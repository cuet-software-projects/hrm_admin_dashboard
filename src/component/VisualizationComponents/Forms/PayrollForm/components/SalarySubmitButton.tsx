import { useFormikContext } from 'formik';
import React from 'react';

import {
  PayrollCreateSchemaType,
  PayrollUpdateSchemaType,
} from '../../../../../schema/PayrollSchema';
import Button from '../../../../Resuables/Button/Button';
import DrawerFooter from '../../../../Resuables/DrawerFooter';
import Icon from '../../../../Resuables/Icon/Icon';

interface props {
  isCreateMode: boolean;
}

const SalarySubmitButton: React.FC<props> = ({ isCreateMode }) => {
  const { isSubmitting } = isCreateMode
    ? useFormikContext<PayrollCreateSchemaType>()
    : useFormikContext<PayrollUpdateSchemaType>();

  return (
    <DrawerFooter>
      <Button
        htmlType={`${isSubmitting ? 'button' : 'submit'}`}
        icon={
          <Icon name={isCreateMode ? 'ic_add' : 'ic_update'} color="white" size={20} />
        }
      >
        <span>{isCreateMode ? 'Create' : 'Update'} Payroll</span>
      </Button>
    </DrawerFooter>
  );
};

export default SalarySubmitButton;
