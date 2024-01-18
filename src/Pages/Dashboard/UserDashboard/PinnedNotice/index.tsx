import { Alert, Button } from 'antd';
import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';

import useGetPinnedNotice from '../../../../customHooks/notices/useGetPinnedNotice';
import useAuthStore from '../../../../store/authStore';

const PinnedNotice = () => {
  const { userProfileData } = useAuthStore();
  const { data } = useGetPinnedNotice(`${userProfileData?.id}`);

  if (data) {
    return (
      <Alert
        type="warning"
        className="fixed bottom-0 left-0 right-0 z-50"
        banner
        closable
        action={
          <Button size="small" type="default">
            <Link to={`/notice/notice-details?noticeId=${data.id}`}>See Details</Link>
          </Button>
        }
        message={
          <Marquee pauseOnHover gradient={false}>
            <span className="text-md font-bold">{data.subject}</span>
          </Marquee>
        }
      />
    );
  } else {
    return <></>;
  }
};

export default PinnedNotice;
