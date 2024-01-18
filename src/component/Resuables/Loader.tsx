import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Space, Spin, SpinProps } from 'antd';
import React from 'react';

interface props {
  color?: string;
  size?: SpinProps['size'];
}

const Loading: React.FC<props> = ({ color = 'brand-grad-1', size = 'large' }) => {
  const antIcon = <Loading3QuartersOutlined spin rev={1} className={`text-${color}`} />;
  return (
    <div className={'mx-auto flex justify-center items-center'}>
      <Space size="middle">
        <Spin indicator={antIcon} size={size} />
      </Space>
    </div>
  );
};

export default Loading;
