import { Select as AntdSelect, SelectProps } from 'antd';
import React, { FC } from 'react';

interface props extends SelectProps {
  className?: string;
  errorMessage?: string;
  options: Array<{ value: string; label: string }>;
  bordered?: boolean;
  allowClear?: boolean;
}

const Select: FC<props> = ({
  errorMessage = '',
  className,
  options,
  bordered = false,
  allowClear = false,
  ...rest
}) => {
  return (
    <>
      <AntdSelect
        {...rest}
        bordered={bordered}
        allowClear={allowClear}
        className={`bg-brand-grad-1 bg-opacity-10 rounded-md ${className}`}
        options={options}
        placeholder="Select"
      />
      {errorMessage.length > 0 && (
        <p className="text-danger py-2 font-bold">{errorMessage}</p>
      )}
    </>
  );
};

export default Select;
