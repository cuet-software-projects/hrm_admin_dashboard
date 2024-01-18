import React, { FC, InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string;
}

const Input: FC<InputProps> = ({ errorMessage = '', className, type, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const target = e.target as HTMLInputElement;
      target.blur();
    }
  };

  return (
    <>
      <div className={`relative flex justify-start items-center`}>
        <input
          {...rest}
          onWheel={handleWheel}
          className={`bg-brand-grad-1 bg-opacity-10 rounded-md px-4 py-2 w-full ${className}`}
          type={showPassword ? 'text' : type}
        />
        {type === 'password' && rest.value && (
          <button
            type="button"
            className="absolute bg-info bg-opacity-10 px-1 rounded right-3 cursor-pointer flex items-center justify-center"
            onClick={handleTogglePassword}
          >
            <span className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label">
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </button>
        )}
      </div>
      {errorMessage.length > 0 && (
        <p className="text-danger py-2 font-bold font-poppins">{errorMessage}</p>
      )}
    </>
  );
};

export default Input;
