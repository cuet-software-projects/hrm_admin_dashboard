import React, { LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className, ...rest }) => {
  return (
    <label
      {...rest}
      className={`font-poppins text-black-1 text-base font-normal leading-6 tracking-normal text-left ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
