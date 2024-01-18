import { FC, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  errorMessage?: string;
}

const Textarea: FC<TextareaProps> = ({ errorMessage = '', className, ...rest }) => {
  return (
    <>
      <textarea
        {...rest}
        className={`bg-brand-grad-1 bg-opacity-10 rounded-md px-4 py-2 font-poppins ${className}`}
      />
      {errorMessage.length > 0 && (
        <p className="text-danger py-2 font-bold font-poppins">{errorMessage}</p>
      )}
    </>
  );
};

export default Textarea;
