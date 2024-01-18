import { Col, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface InfoFieldProps {
  refName: string;
  valueName: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ refName, valueName }) => {
  return (
    <Row gutter={16}>
      <Col xs={10} xxl={6}>
        <Text strong>{refName}:</Text>
      </Col>
      <Col span={12}>
        <Text type="secondary">{valueName}</Text>
      </Col>
    </Row>
  );
};

export default InfoField;
