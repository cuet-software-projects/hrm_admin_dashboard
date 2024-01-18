import { Space } from 'antd';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import { utils } from '../../../helpers/utility';
import { UpdateAttendanceSchemaType } from '../../../schema/AttendanceSchema';
import { useAttendanceStore } from '../../../store/attendanceStore/attendanceStore';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import CustomTimePicker from '../../Resuables/CustomTimePicker';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import Loading from '../../Resuables/Loader';
import Textarea from '../../Resuables/Textarea';

const AttendanceExitForm = () => {
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, setValues } =
    useFormikContext<UpdateAttendanceSchemaType>();
  const { entryTime } = useAttendanceStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    dayjs(entryTime).toDate(),
  );
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    dayjs(entryTime).add(8, 'hours').toDate(),
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValues({
      ...values,
      exit_time: utils.combineDateTimeToISO(date, selectedTime),
    });
  };

  const handleTimeChange = (date: Date) => {
    setSelectedTime(date);
    setValues({
      ...values,
      exit_time: utils.combineDateTimeToISO(selectedDate, date),
    });
  };

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full" onSubmit={handleSubmit}>
        {/* Exit time input */}
        <div className="py-3 w-full">
          <div>Your Exit Time</div>
          <Space
            className="flex justify-between space-x-3"
            classNames={{ item: 'w-1/2' }}
          >
            <CustomDatePicker
              className="bg-brand-grad-1 bg-opacity-10 w-full outline-none border-none mt-2"
              size="large"
              allowClear={false}
              selectedDate={selectedDate}
              onChangeDate={handleDateChange}
              minDate={dayjs(entryTime).toDate()}
              maxDate={dayjs(entryTime).add(1, 'day').toDate()}
            />
            <CustomTimePicker
              className="bg-brand-grad-1 bg-opacity-10 w-full outline-none border-none mt-2"
              size="large"
              allowClear={false}
              selectedTime={selectedTime}
              onChangeTime={handleTimeChange}
            />
          </Space>
        </div>
        {errors.exit_time && touched.exit_time && (
          <p className="text-danger py-2 font-bold font-poppins">{errors.exit_time}</p>
        )}

        {/* Break Duration Input */}
        <div className="py-3 w-full">
          <Label htmlFor="break_duration">Break Duation (in hour)</Label>
          <br />
          <Input
            type="number"
            id="break_duration"
            name="break_duration"
            value={values.break_duration}
            onChange={handleChange}
            placeholder="Enter Break Duration (such as 1.5, 0.5, 3)"
            errorMessage={
              errors.break_duration && touched.break_duration ? errors.break_duration : ''
            }
            className="w-full mt-2 text-black-1 outline-none py-3"
          />
        </div>

        {/* Reason of break input */}
        {/* The condition might seem awkward. But it had to be given like this otherwise, when the values.break_duration was 0, the value 0 was appearing on the dom. */}
        {values.break_duration !== 0 &&
          values.break_duration &&
          values.break_duration > 0 && (
            <div className="py-3 w-full">
              <Label htmlFor="reason_of_break">Reason of Taking Break</Label>
              <br />
              <Textarea
                id="reason_of_break"
                name="reason_of_break"
                placeholder="Enter Reason Of Break"
                // value={values.reason_of_break}
                onChange={handleChange}
                errorMessage={
                  errors.reason_of_break && touched.reason_of_break
                    ? errors.reason_of_break
                    : ''
                }
                className="w-full h-28 mt-2 outline-none text-black-1"
              />
            </div>
          )}

        {/* Work Description input */}
        <div className="py-3">
          <Label htmlFor="work_descriptions">Work Description</Label>
          <br />
          <Textarea
            id="work_descriptions"
            name="work_descriptions"
            placeholder="Describe what you have done today."
            value={values.work_descriptions}
            onChange={handleChange}
            errorMessage={
              errors.work_descriptions && touched.work_descriptions
                ? errors.work_descriptions
                : ''
            }
            className="w-full h-28 mt-2 outline-none text-black-1"
          />
        </div>
        <Button
          block
          htmlType={isSubmitting ? 'button' : 'submit'}
          loading={isSubmitting}
          className="mt-5 flex justify-center items-center"
        >
          {isSubmitting ? <Loading size="large" color="white-1" /> : 'Confirm Exit'}
        </Button>
      </form>
    </div>
  );
};

export default AttendanceExitForm;
