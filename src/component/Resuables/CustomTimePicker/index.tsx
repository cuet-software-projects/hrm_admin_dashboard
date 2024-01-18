import './CustomTimePicker.css';

import { TimePicker, TimePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

type props = TimePickerProps & {
  selectedTime: Date | string | null;
  onChangeTime: (date: Date) => void;
  timeFormat?: string;
  className?: string;
};

const CustomTimePicker: React.FC<props> = ({
  selectedTime,
  onChangeTime,
  timeFormat = 'hh:mm A',
  className,
  ...rest
}) => {
  return (
    <TimePicker
      {...rest}
      className={`${className ? className : ''} py-2`}
      onSelect={(value: Dayjs) => onChangeTime(value.toDate())}
      format={timeFormat}
      use12Hours={true}
      value={
        selectedTime
          ? dayjs(dayjs(selectedTime).format(timeFormat), timeFormat)
          : undefined
      }
    />
  );
};

export default CustomTimePicker;
