import { Flex, Result, Spin } from 'antd';

import { slack_hrm_channel_link } from '../../constants/GlobalConstants';
import { useGetServerStatus } from '../../customHooks/ServerStatusChecker/useGetServerStatus';
import Button from '../Resuables/Button/Button';

interface props {
  children: JSX.Element;
}

const ServerStatusWrapper: React.FC<props> = ({ children }): JSX.Element => {
  const { data, isLoading } = useGetServerStatus();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (data) {
    return <div>{children}</div>;
  }
  return (
    <Flex justify="center" align="center" className="h-screen">
      <Result
        status={'500'}
        title="Server under maintenance!!!"
        subTitle={
          <div>
            <p>Please, contact administration.</p>
            <Button className="mx-auto mt-4">
              <a href={slack_hrm_channel_link} target="_blank" rel="noreferrer">
                Message us on Slack
              </a>
            </Button>
          </div>
        }
      />
    </Flex>
  );
};

export default ServerStatusWrapper;
