import { ErrorMessage } from 'formik';

import CustomDatePicker from '../../../../Resuables/CustomDatePicker';
import Label from '../../../../Resuables/Label';

interface props {
  date: Date | string | null;
  handleDateSelect: (date: Date) => void;
}

const SalaryDateSelect: React.FC<props> = ({ date, handleDateSelect }) => {
  return (
    <div>
      <div className="py-3 w-full">
        <Label htmlFor="dob">Date</Label>
        <br />
        <CustomDatePicker
          id="date"
          name="date"
          allowClear={false}
          className="bg-brand-grad-1 bg-opacity-10 border-none rounded-md px-4 w-full mt-2 text-black-1"
          size="large"
          selectedDate={date}
          onChangeDate={handleDateSelect}
        />
      </div>
      <ErrorMessage className="error" component="div" name="date" />
    </div>
  );
};

export default SalaryDateSelect;
