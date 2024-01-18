import { Tag } from 'antd';

import { INVOICE_STATUS_TYPE } from '../../../../../types';

interface props {
  status: INVOICE_STATUS_TYPE;
}

const InvoiceStatus: React.FC<props> = ({ status }) => {
  if (status.toLowerCase().includes('paid')) {
    return (
      <Tag
        className={`px-5 py-3 absolute left-[40%] top-32 -rotate-[25deg] bg-white-1 font-bold border 
          ${
            status.toLowerCase().startsWith('partial')
              ? 'border-danger text-danger'
              : 'border-green-1 text-green-1'
          }`}
      >
        {status.split('_').join(' ')}
      </Tag>
    );
  }
  return <></>;
};

export default InvoiceStatus;
