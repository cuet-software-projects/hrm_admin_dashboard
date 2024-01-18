import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Image, Skeleton, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

import { useUserDetails } from '../../../../customHooks/users/useUserDetails';
import { getS3BaseUrl } from '../../../../helpers/configs/envConfig';
import useUserProfileStore from '../../../../store/userProfileStore';
import ProfilePictureModal from '../../../VisualizationComponents/Modals/ProfilePictureModal';

const { Title, Text } = Typography;

const ProfileIntro = () => {
  const { isOwnProfile, userId, isProfilePictureModalOpen, toggleProfilePictureModal } =
    useUserProfileStore();

  const { data: userData, isLoading } = useUserDetails({ userId: userId });

  return (
    <Skeleton
      loading={isLoading}
      active
      round
      avatar={{
        shape: 'circle',
        size: 100,
      }}
      title={false}
      paragraph={{
        width: [100, 150, 100],
        rows: 3,
        className: 'flex flex-col items-center justify-center mt-5 mr-3',
      }}
      className="flex flex-col items-center justify-center py-5 rounded-3xl w-full lg:w-[300px] text-center shadow h-fit bg-transparent lg:bg-white-1"
    >
      <Card className="w-full lg:w-[300px] text-center shadow h-fit bg-transparent lg:bg-white-1 rounded-3xl">
        <div className="relative w-[120px] mx-auto">
          {userData && userData.profile_picture && (
            <Image
              className="rounded-full w-[120px] h-[120px]"
              src={`${getS3BaseUrl()}${userData.profile_picture}`}
              alt=""
              width={120}
              height={120}
              preview={false}
            />
          )}
          {userData && !userData.profile_picture && (
            <Avatar
              size={96}
              style={{
                margin: '20px 0',
                border: '2px solid #1890ff',
                fontSize: 48,
              }}
            >
              {userData?.first_name[0]}
            </Avatar>
          )}
          {isOwnProfile && (
            <Button
              shape="circle"
              type="text"
              size="small"
              onClick={toggleProfilePictureModal}
              icon={<EditOutlined rev={''} />}
              style={{
                position: 'absolute',
                bottom: 25,
                right: 15,
                backgroundColor: 'white',
              }}
            />
          )}
        </div>

        {isProfilePictureModalOpen && isOwnProfile && <ProfilePictureModal />}

        <Space direction="vertical" size={2}>
          <Title level={4}>{`${userData?.first_name} ${userData?.last_name}`}</Title>
          <Text type="secondary" className="text-lg">
            {userData?.current_employment_info?.current_employee_designation?.name ?? ''}
          </Text>
          <Tag color="orange" className="mt-[15px] px-3 py-1 rounded-lg font-bold">
            Joined on:{' '}
            {`${dayjs(userData?.current_employment_info?.joined_at).format(
              'MMM DD, YYYY',
            )}`}
          </Tag>
        </Space>
      </Card>
    </Skeleton>
  );
};

export default ProfileIntro;
