import { Divider, Flex, Typography } from 'antd';

import { INotice } from '../../../../types/notice.type';
import AttachmentCard from './AttachmentCard';

interface props {
  attachments: INotice['attachments'] | undefined;
  refetchNotice: () => void;
}

const NoticeAttachments: React.FC<props> = ({ attachments, refetchNotice }) => {
  if (!attachments) {
    return <></>;
  }
  return (
    <div className="px-12">
      <Divider dashed></Divider>
      <Typography.Text className="text-lg font-bold text-black-1 text-opacity-50">
        {attachments.length} Attachment{attachments.length > 1 && 's'} found
      </Typography.Text>
      <Flex gap={20} wrap="wrap" className="py-10">
        {attachments.map((attachment) => {
          return (
            <AttachmentCard
              key={attachment.id}
              attachedDocument={attachment}
              refetchNotice={refetchNotice}
            />
          );
        })}
      </Flex>
    </div>
  );
};

export default NoticeAttachments;
