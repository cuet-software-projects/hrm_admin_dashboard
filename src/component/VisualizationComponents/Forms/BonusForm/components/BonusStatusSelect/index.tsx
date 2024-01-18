import { useFormikContext } from 'formik';

import {
  BonusCreateSchemaType,
  BonusUpdateSchemaType,
} from '../../../../../../schema/BonusSchema';
import { BONUS_VALUES } from '../../../../../../types/values';
import Label from '../../../../../Resuables/Label';
import Select from '../../../../../Resuables/Select/Select';

interface props {
  isCreateMode: boolean;
  handleStatusChange: (value: string) => void;
}

const BonusStatusSelect: React.FC<props> = ({ isCreateMode, handleStatusChange }) => {
  const { errors, values, touched } = isCreateMode
    ? useFormikContext<BonusCreateSchemaType>()
    : useFormikContext<BonusUpdateSchemaType>();

  return (
    <div className="py-3 w-full">
      <Label htmlFor="status">Status</Label>
      <br />
      <Select
        id="status"
        size="large"
        options={BONUS_VALUES.map((item) => ({
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

export default BonusStatusSelect;
