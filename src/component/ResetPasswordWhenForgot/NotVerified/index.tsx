import { BackwardOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotVerified = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center px-4">
      <Result
        className="border border-black-1 border-opacity-10 shadow rounded-lg"
        status={'error'}
        title={'Your Token is expired.'}
        subTitle={'Try again!!!'}
        extra={
          <Button type="link" icon={<BackwardOutlined rev={''} />}>
            <Link to={'/forgot-password'}>Forgot Password</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotVerified;
