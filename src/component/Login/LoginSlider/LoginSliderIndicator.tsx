import React from 'react';

interface LoginSliderIndicatorProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  active: boolean;
  width: string;
}

const LoginSliderIndicator: React.FC<LoginSliderIndicatorProps> = ({
  active,
  width,
  ...rest
}) => {
  const commonClasses = 'h-3 mx-2 bg-white-1 cursor-pointer';

  if (active) {
    return <div {...rest} className={`${commonClasses}  rounded-lg`} style={{ width }} />;
  }

  return <div {...rest} className={`${commonClasses} rounded-full`} style={{ width }} />;
};

export default LoginSliderIndicator;
