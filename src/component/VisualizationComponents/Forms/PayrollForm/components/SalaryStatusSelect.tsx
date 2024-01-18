import { useFormikContext } from 'formik';

import {
  PayrollCreateSchemaType,
  PayrollUpdateSchemaType,
} from '../../../../../schema/PayrollSchema';
import { PAYROLL_VALUES } from '../../../../../types/values';
import Label from '../../../../Resuables/Label';
import Select from '../../../../Resuables/Select/Select';

interface props {
  isCreateMode: boolean;
  handleStatusChange: (value: string) => void;
}

const SalaryStatusSelect: React.FC<props> = ({ isCreateMode, handleStatusChange }) => {
  const { errors, values, touched } = isCreateMode
    ? useFormikContext<PayrollCreateSchemaType>()
    : useFormikContext<PayrollUpdateSchemaType>();

  return (
    <div className="py-3 w-full">
      <Label htmlFor="status">Status</Label>
      <br />
      <Select
        id="status"
        size="large"
        options={PAYROLL_VALUES.map((item) => ({
          label: item,
          value: item,
        }))}
        value={values.status ? values.status : undefined}
        onChange={handleStatusChange}
        errorMessage={errors.status && touched.status ? errors.status : ''}
        className="w-full mt-2 text-black-1 outline-none"
      />
    </div>
  );
};

export default SalaryStatusSelect;
