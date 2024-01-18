import React, { PropsWithChildren } from 'react';

interface Props {
  children: React.ReactNode;
  width?: string;
}

const ProfileContainer: React.FC<PropsWithChildren<Props>> = ({ children, width }) => {
  return (
    <div
      className={`artboard w-full bg-brand-grad-1 bg-opacity-10 rounded-xl 
    shadow-md border-[1px] border-brand-grad-1 border-opacity-10`}
    >
      {children}
    </div>
  );
};

export default ProfileContainer;
