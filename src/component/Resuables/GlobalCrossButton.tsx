import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import Icon from './Icon/Icon';

interface GlobalCrossButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

const GlobalCrossButton: React.FC<GlobalCrossButtonProps> = ({ className, ...rest }) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full bg-secondary-1 p-3 text-white-1 cursor-pointer ${className}`}
      {...rest}
    >
      <Icon name="ic_cross" size={16} color="white" />
    </button>
  );
};

export default GlobalCrossButton;
