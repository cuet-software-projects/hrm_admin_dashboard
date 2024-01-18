import React from 'react';

interface Props {
  companyName: string;
  productName: string;
}

export default function SidebarTitle({ companyName, productName }: Props) {
  return (
    <>
      <h4 className="text-brand-grad-1">{companyName}</h4>
      <h4 className="text-white-1 pl-2">{productName}</h4>
    </>
  );
}
