import { LeftOutlined, RightOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import dayjs from 'dayjs';

import { INotice } from '../../../../types/notice.type';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import NoticeHeaderBackButton from './NoticeHeaderBackButton';

interface props {
  sender: INotice['sender'] | undefined;
  issue_date: INotice['issue_date'] | undefined;
  subject: string | undefined;
}

const NoticeHeader: React.FC<props> = ({ sender, issue_date, subject }) => {
  return (
    <div>
      <div className="bg-grey-1 bg-opacity-20 p-2 rounded-t-lg">
        <Flex justify="space-between">
          <Flex align="center">
            <NoticeHeaderBackButton />
            <h3 className="font-bold">Subject: {subject}</h3>
          </Flex>
          <div>
            <Button type="text" icon={<LeftOutlined rev={''} />} />
            <Button type="text" icon={<RightOutlined rev={''} />} />
          </div>
        </Flex>
      </div>
      <Flex className="p-4" justify="space-between">
        {sender && (
          <Flex>
            <PictureOrAvatar userData={{ user: { ...sender, is_registered: false } }} />
            <span className="ml-5 w-fit overflow-ellipsis text-left">{`${sender.first_name} ${sender.last_name}`}</span>
          </Flex>
        )}
        <Flex align="center" gap={3}>
          {issue_date && <span>{dayjs(issue_date).format('MMM DD, YYYY hh:mm A')}</span>}
          {<Button type="text" icon={<StarOutlined rev={''} />} />}
        </Flex>
      </Flex>
    </div>
  );
};

export default NoticeHeader;
