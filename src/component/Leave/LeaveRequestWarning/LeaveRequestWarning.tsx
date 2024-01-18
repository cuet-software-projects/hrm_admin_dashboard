import { DoubleRightOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Alert, List, Typography } from 'antd';

const { Text } = Typography;

const LeaveRequestWarning = () => {
  const warningMessages = [
    'When requesting leave, ensure no holidays overlap within the selected date range.',
    'If a holiday falls within the date range, make two separate leave requests.',
    'Otherwise, holidays will be counted as leave.',
  ];

  return (
    <Alert
      message={
        <div>
          <ExclamationCircleFilled
            rev={''}
            style={{
              color: '#ff4d4f',
              fontSize: '20px',
              marginRight: '12px',
            }}
          />
          <Text strong style={{ fontSize: '16px' }}>
            Warning. Please read before requesting leave.
          </Text>
        </div>
      }
      description={
        <List
          dataSource={warningMessages}
          renderItem={(item) => (
            <List.Item>
              <Text>
                <DoubleRightOutlined
                  rev={''}
                  style={{ color: '#ff4d4f', marginRight: '8px' }}
                />
                {item}
              </Text>
            </List.Item>
          )}
        />
      }
      type="warning"
      showIcon={false}
      closable
      style={{ border: '2px solid #ff4d4f', borderRadius: '8px', marginBottom: '16px' }}
    />
  );
};

export default LeaveRequestWarning;
