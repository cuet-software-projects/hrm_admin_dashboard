import { NotificationOutlined } from '@ant-design/icons';
import { Avatar, Badge, Spin } from 'antd';
import { Link } from 'react-router-dom';

import useFindActiveNoticeNumberOfUser from '../../../../customHooks/notices/useGetActiveNoticeNumber';
import useAuthStore from '../../../../store/authStore';

const Noticebar = () => {
  const { userProfileData } = useAuthStore();
  const { data, isLoading } = useFindActiveNoticeNumberOfUser(`${userProfileData?.id}`);
  return (
    <Link to="/notice" className="h-10">
      <Badge count={data?.totalNumber} overflowCount={10}>
        <Avatar
          shape="circle"
          size="large"
          className="flex justify-center items-center bg-primary"
        >
          {isLoading && <Spin />}
          {!isLoading && (
            <NotificationOutlined
              rev={''}
              color="black"
              className="text-white-1 font-bold text-lg"
            />
          )}
        </Avatar>
      </Badge>
    </Link>
  );
};

export default Noticebar;
