import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" className="text-white-1 bg-blue">
            <Link to={'/dashboard'}>Back Home</Link>
          </Button>
        }
      />
    </div>
  );
}
