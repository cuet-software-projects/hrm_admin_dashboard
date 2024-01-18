import { Space } from 'antd';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import { utils } from '../../../helpers/utility';
import { CreateAttendanceSchemaType } from '../../../schema/AttendanceSchema';
import { WORK_TYPE } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import CustomTimePicker from '../../Resuables/CustomTimePicker';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';
import Textarea from '../../Resuables/Textarea';

const AttendanceCreateForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValues({
      ...values,
      entry_time: utils.combineDateTimeToISO(date, selectedTime),
    });
  };

  const handleTimeChange = (date: Date) => {
    setSelectedTime(date);
    setValues({
      ...values,
      entry_time: utils.combineDateTimeToISO(selectedDate, date),
    });
  };

  const { values, errors, setValues, touched, handleSubmit, handleChange, isSubmitting } =
    useFormikContext<CreateAttendanceSchemaType>();

  return (
    <div className="px-2 h-full w-full flex flex-col overflow-y-auto">
      <form
        id="attendance-create-form"
        className="overflow-auto w-full"
        onSubmit={handleSubmit}
      >
        <div className="py-3 w-full">
          <div>Your Entry Time</div>
          <Space
            className="flex justify-between space-x-3"
            classNames={{ item: 'w-1/2' }}
          >
            <CustomDatePicker
              size="large"
              className="bg-brand-grad-1 bg-opacity-10 w-full outline-none border-none mt-2"
              allowClear={false}
              selectedDate={selectedDate}
              onChangeDate={handleDateChange}
              // The following date selection is to adapt with internal functionality of antd datepicker. ***Don't change this.
              maxDate={dayjs(dayjs().format('YYYY-MM-DD')).toDate()}
            />
            <CustomTimePicker
              className="bg-brand-grad-1 bg-opacity-10 w-full outline-none border-none mt-2"
              allowClear={false}
              selectedTime={selectedTime}
              onChangeTime={handleTimeChange}
            />
          </Space>
        </div>
        {errors.entry_time && touched.entry_time && (
          <p className="text-danger py-2 font-bold font-poppins">{errors.entry_time}</p>
        )}

        <div className="py-3 w-full">
          <Label htmlFor="work_type">Work Type</Label>
          <br />
          <Select
            id="work_type"
            size="large"
            options={WORK_TYPE.map((item) => ({
              label: item,
              value: item,
            }))}
            allowClear={false}
            value={values.work_type.length > 0 ? values.work_type : null}
            onChange={(value: string) => {
              setValues({ ...values, work_type: value });
            }}
            errorMessage={errors.work_type && touched.work_type ? errors.work_type : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3">
          <Label htmlFor="description">Work Plan</Label>
          <br />
          <Textarea
            id="work_plan"
            name="work_plan"
            placeholder="What's the plan today?"
            value={values.work_plan}
            onChange={handleChange}
            errorMessage={errors.work_plan && touched.work_plan ? errors.work_plan : ''}
            className="w-full h-28 mt-2 outline-none text-black-1"
          />
        </div>

        <Button
          htmlType={`${isSubmitting ? 'button' : 'submit'}`}
          block
          isLoading={isSubmitting}
          className="mt-5 flex items-center justify-center"
        >
          Confirm Entry
        </Button>
      </form>
    </div>
  );
};

export default AttendanceCreateForm;
