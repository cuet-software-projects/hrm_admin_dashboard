import { Image as AntdImage, ImageProps } from 'antd';
import React from 'react';

const Image: React.FC<ImageProps> = ({ ...rest }) => {
  return <AntdImage {...rest} />;
};

export default Image;
