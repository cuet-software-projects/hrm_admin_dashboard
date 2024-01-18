import { Avatar, Tooltip } from 'antd';

import { getS3BaseUrl } from '../../../../../helpers/configs/envConfig';
import { INotice } from '../../../../../types/notice.type';

interface props {
  noticeItem: INotice;
}

const AvatarGroup: React.FC<props> = ({ noticeItem }) => {
  return (
    <Avatar.Group
      maxCount={5}
      maxPopoverTrigger="hover"
      size="large"
      maxStyle={{
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        cursor: 'pointer',
      }}
    >
      {noticeItem.recipients &&
        noticeItem.recipients.map((item) => {
          return (
            <Tooltip
              key={item.id}
              trigger={'hover'}
              title={`${item.recipient.first_name} ${item.recipient.last_name}`}
              placement="top"
            >
              {item.recipient.profile_picture && (
                <Avatar src={`${getS3BaseUrl()}${item.recipient.profile_picture}`} />
              )}
              {!item.recipient.profile_picture && (
                <Avatar className="bg-primary">{item.recipient.first_name[0]}</Avatar>
              )}
            </Tooltip>
          );
        })}
    </Avatar.Group>
  );
};

export default AvatarGroup;
