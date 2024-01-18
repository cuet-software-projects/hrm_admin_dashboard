import React from 'react';

interface DrawerFooterProps {
  children: JSX.Element;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({ children }) => {
  return (
    <div className="bg-white-1 h-20 border-t-2 border-opacity-30 border-t-brand-grad-1 pl-5 w-full absolute bottom-0 left-0 right-0 flex items-center">
      {children}
    </div>
  );
};

export default DrawerFooter;
