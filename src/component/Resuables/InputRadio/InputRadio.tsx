import React, { FC, InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio: FC<RadioProps> = ({ label, ...rest }) => {
  return (
    <div className="flex items-center w-fit m-auto">
      <input
        type="radio"
        id={rest.id || rest.name}
        {...rest}
        // defaultChecked={false}
        className="radio-sm radio bg-[#DC364226] checked:bg-[#f57b1c] checked:border-danger-200"
      />
      {label.length > 0 && <label htmlFor={rest.id || rest.name}>{label}</label>}
    </div>
  );
};

export default Radio;
