import { Skeleton } from 'antd';

const InvoiceSkeleton = () => {
  return (
    <div className="p-[0.5in] w-[8.3in] h-[11in] mx-auto my-5 bg-white-1 rounded-md">
      <div className="flex justify-between">
        <Skeleton
          title={false}
          active
          paragraph={{ rows: 4, width: [200, 200, 200, 200] }}
        />
        <div className="w-fit">
          <Skeleton
            title={false}
            active
            paragraph={{
              rows: 4,
              width: 200,
            }}
          />
        </div>
      </div>

      <Skeleton active title={false} paragraph={{ rows: 4 }} className="my-20" />

      <div
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}
      >
        <div className="w-40">
          <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 4 }} />
        </div>
        <div className="w-fit">
          <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 4, width: 200 }} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceSkeleton;
