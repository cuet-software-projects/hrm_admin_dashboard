import { DatePicker, DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import Icon from '../Icon/Icon';
import Select from '../Select/Select';

type CustomDatePickerProps = DatePickerProps & {
  selectedDate: Date | string | null;
  onChangeDate: (date: Date) => void;
  dateFormat?: string;
  placeholderText?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onChangeDate,
  dateFormat = dateFormatList[0],
  placeholderText = '22/02/2022',
  minDate,
  maxDate,
  className,
  ...rest
}) => {
  const currentYear = dayjs().toDate().getFullYear();
  const years = Array.from({ length: currentYear - 1970 }, (_, index) => 1971 + index);
  if (dateFormat === 'yyyy') {
    return (
      <div className="flex flex-col">
        <label>Econonomic year</label>
        <Select
          className="bg-white-1 bg-opacity-100 text-black-1"
          value={
            selectedDate
              ? `${dayjs(selectedDate).year()}-${dayjs(selectedDate).year() + 1}`
              : null
          }
          onChange={(value: string) => onChangeDate(dayjs(`${value}-01-01`).toDate())}
          options={years
            .reverse()
            .map((option) => ({ label: `${option}-${option + 1}`, value: `${option}` }))}
        />
      </div>
    );
  } else {
    const disabledDate = (current: Dayjs) => {
      if (minDate && maxDate) {
        return current <= dayjs(minDate) || current >= dayjs(maxDate).add(1, 'day');
      } else if (minDate && !maxDate) {
        return current <= dayjs(minDate);
      } else if (maxDate && !minDate) {
        return current >= dayjs(maxDate).add(1, 'day');
      } else {
        return false;
      }
    };
    return (
      <DatePicker
        {...rest}
        className={`${className}`}
        format={dateFormatList}
        placeholder={placeholderText}
        suffixIcon={<Icon name="ic_date" size={20} color="white" />}
        value={selectedDate ? dayjs(selectedDate) : undefined}
        onSelect={(dayJsDate) => onChangeDate(dayJsDate.toDate())}
        disabledDate={disabledDate}
      />
    );
  }
};

export default CustomDatePicker;
