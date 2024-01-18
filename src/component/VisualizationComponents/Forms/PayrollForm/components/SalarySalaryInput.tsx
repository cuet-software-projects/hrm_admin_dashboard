import { useFormikContext } from 'formik';

import {
  PayrollCreateSchemaType,
  PayrollUpdateSchemaType,
} from '../../../../../schema/PayrollSchema';
import Input from '../../../../Resuables/Input';
import Label from '../../../../Resuables/Label';

interface props {
  isCreateMode: boolean;
}

const SalaryInput: React.FC<props> = ({ isCreateMode }) => {
  const { errors, values, handleChange, touched } = isCreateMode
    ? useFormikContext<PayrollCreateSchemaType>()
    : useFormikContext<PayrollUpdateSchemaType>();

  return (
    <div className="py-3">
      <Label htmlFor="salary">Salary</Label>
      <br />
      <Input
        type="number"
        id="salary"
        name="salary"
        value={values.salary}
        onChange={handleChange}
        placeholder="salary"
        errorMessage={errors.salary && touched.salary ? errors.salary : ''}
        className="w-full mt-2 text-black-1 outline-none"
      />
    </div>
  );
};

export default SalaryInput;
