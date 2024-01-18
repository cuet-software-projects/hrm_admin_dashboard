import { Avatar, Image } from 'antd';

import { getS3BaseUrl } from '../../../helpers/configs/envConfig';
import { IUser } from '../../../types';

interface props {
  userData: {
    user: IUser;
  };
}

const PictureOrAvatar: React.FC<props> = ({ userData }) => {
  return (
    <>
      {userData.user?.profile_picture && (
        <Image
          onClick={(e) => e?.stopPropagation()}
          width={40}
          height={40}
          src={`${getS3BaseUrl()}${userData.user?.profile_picture}`}
          className="rounded-full"
        />
      )}
      {!userData.user?.profile_picture && (
        <Avatar
          className="flex justify-center items-center bg-brand-grad-1 font-bold text-2xl"
          size={'large'}
        >
          {`${userData.user?.first_name[0]}`}
        </Avatar>
      )}
    </>
  );
};

export default PictureOrAvatar;
