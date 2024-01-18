import { Button as AntButton, ButtonProps } from 'antd';
import React from 'react';

interface CustomButtonProps extends ButtonProps {
  bgcolor?: string;
  textColor?: string;
  text?: string;
  isLoading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  bgcolor = 'bg-gradient-to-br from-brand-grad-1 to-brand-grad-2 hover:bg-gradient-to-bl',
  textColor = 'text-white-1',
  text = '',
  isLoading,
  className = '',
  children,
  ...rest
}) => {
  return (
    <AntButton
      {...rest}
      loading={isLoading}
      className={`default-button-style h-12 flex items-center font-semibold text-sm md:text-md bg-opacity-80 rounded-xl text-semibold p-2 lg:px-5 ${bgcolor} ${textColor} ${className}`}
    >
      {children ? children : text}
    </AntButton>
  );
};

export default Button;
