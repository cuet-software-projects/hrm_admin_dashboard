import { useFormikContext } from 'formik';

import {
  BonusCreateSchemaType,
  BonusUpdateSchemaType,
} from '../../../../../../schema/BonusSchema';
import Input from '../../../../../Resuables/Input';
import Label from '../../../../../Resuables/Label';

interface props {
  isCreateMode: boolean;
}

const BonusInputWithReason: React.FC<props> = ({ isCreateMode }) => {
  const { errors, values, handleChange, touched } = isCreateMode
    ? useFormikContext<BonusCreateSchemaType>()
    : useFormikContext<BonusUpdateSchemaType>();

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

export default BonusInputWithReason;
