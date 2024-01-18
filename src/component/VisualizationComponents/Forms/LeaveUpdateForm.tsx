import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

import { defaultBackendDateFormate } from '../../../constants/GlobalConstants';
import { UpdateLeaveSchemaType } from '../../../schema/LeaveSchema';
import { LEAVE_TYPE_VALUES } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';
import Textarea from '../../Resuables/Textarea';

const LeaveUpdateForm = () => {
  const { values, errors, setValues, touched, handleChange, handleSubmit, isSubmitting } =
    useFormikContext<UpdateLeaveSchemaType>();

  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);

  useEffect(() => {
    setStartDate(values.started_at ? values.started_at : null);
    setEndDate(values.ended_at ? values.ended_at : null);
  }, [values]);

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 w-full" onSubmit={handleSubmit}>
        <div className="py-3 w-full">
          <Label htmlFor="dob">Start Date</Label>
          <br />
          <CustomDatePicker
            className="bg-brand-grad-1 bg-opacity-10 rounded-md px-4 w-full mt-2 text-black-1"
            selectedDate={startDate}
            allowClear={false}
            onChangeDate={(date: Date) => {
              setStartDate(date);
              setValues({
                ...values,
                started_at: dayjs(date).format(defaultBackendDateFormate),
              });
            }}
          />
          {errors.ended_at && touched.ended_at && (
            <p className="pt-3 text-danger font-bold">errors.started_at</p>
          )}
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="dob">End Date</Label>
          <br />
          <CustomDatePicker
            className="bg-brand-grad-1 bg-opacity-10 rounded-md px-4 w-full mt-2 text-black-1"
            selectedDate={endDate}
            allowClear={false}
            onChangeDate={(date: Date) => {
              setEndDate(date);
              setValues({
                ...values,
                ended_at: dayjs(date).format(defaultBackendDateFormate),
              });
            }}
          />
          {errors.ended_at && touched.ended_at && (
            <p className="pt-3 text-danger font-bold">{errors.ended_at}</p>
          )}
        </div>

        <div className="py-3 w-full">
          <Label htmlFor="leave_type">Leave Type</Label>
          <br />
          <Select
            id="leave_type"
            options={LEAVE_TYPE_VALUES.map((group: string) => ({
              label: group,
              value: group,
            }))}
            value={values.leave_type ?? ''}
            onChange={handleChange}
            errorMessage={
              errors.leave_type && touched.leave_type ? errors.leave_type : ''
            }
            size="large"
            className="w-full mt-2 text-black-1"
          />
        </div>

        <div className="py-3">
          <Label htmlFor="description">
            Application (Characters: {values.description?.length}/190)
          </Label>
          <br />
          <Textarea
            id="description"
            name="description"
            placeholder="application"
            value={values.description}
            onChange={handleChange}
            errorMessage={
              errors.description && touched.description ? errors.description : ''
            }
            className="w-full h-28 mt-2 outline-none text-black-1"
          />
        </div>

        <Button
          htmlType={`${isSubmitting ? 'button' : 'submit'}`}
          isLoading={isSubmitting}
          block
          className="my-5"
        >
          Confirm Leave Info
        </Button>
      </form>
    </div>
  );
};

export default LeaveUpdateForm;
