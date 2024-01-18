import { useFormikContext } from 'formik';

import { PayrollCreateSchemaType } from '../../../../../schema/PayrollSchema';
import Input from '../../../../Resuables/Input';
import Label from '../../../../Resuables/Label';

const SalaryBonusInputWithReason = () => {
  const { errors, values, handleChange, touched } =
    useFormikContext<PayrollCreateSchemaType>();

  return (
    <>
      <div className="py-3">
        <Label htmlFor="bonus">Bonus</Label>
        <br />
        <Input
          type="number"
          id="bonus"
          name="bonus"
          value={values.bonus}
          onChange={handleChange}
          placeholder="bonus"
          errorMessage={errors.bonus && touched.bonus ? errors.bonus : ''}
          className="w-full mt-2 text-black-1 outline-none"
        />
      </div>
      <div className="py-3 scrl">
        <Label htmlFor="reason">Reason</Label>
        <br />
        <Input
          type="text"
          id="reason"
          name="reason"
          value={values.reason}
          onChange={handleChange}
          placeholder="reason"
          errorMessage={errors.reason && touched.reason ? errors.reason : ''}
          className="w-full mt-2 text-black-1 outline-none"
        />
      </div>
    </>
  );
};

export default SalaryBonusInputWithReason;
