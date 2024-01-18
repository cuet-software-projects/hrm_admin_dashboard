import React, { PropsWithChildren } from 'react';

interface Props {
  children: React.ReactNode;
  width?: string;
}

const LeaveDetailsContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  width: widthCss = 'lg:w-2/3 w-full',
}) => {
  return (
    <div
      className={`artboard bg-brand-grad-1 bg-opacity-10 flex flex-col
       p-4 lg:p-10 ${widthCss} rounded-2xl shadow-lg border-[0.5px] border-brand-grad-1 border-opacity-20`}
    >
      {children}
    </div>
  );
};

export default LeaveDetailsContainer;
