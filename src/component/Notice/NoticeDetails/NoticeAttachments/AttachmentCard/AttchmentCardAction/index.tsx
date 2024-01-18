import { CloudDownloadOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

import { userRoles } from '../../../../../../constants/GlobalConstants';
import { getS3BaseUrl } from '../../../../../../helpers/configs/envConfig';
import useAuthStore from '../../../../../../store/authStore';
import useNoticeStore from '../../../../../../store/noticeStore';
import { IDocument } from '../../../../../../types/document.type';
import { INotice } from '../../../../../../types/notice.type';
import GlobalCrossButton from '../../../../../Resuables/GlobalCrossButton';

interface props {
  attachedDocument: IDocument;
  handleDownload: (download_link: string) => void;
  handleDeleteAttachment: ({
    noticeId,
    file_path,
  }: {
    noticeId: INotice['id'];
    file_path: IDocument['file_path'];
  }) => void;
}

const AttachmentCardAction: React.FC<props> = ({
  attachedDocument,
  handleDownload,
  handleDeleteAttachment,
}) => {
  const { role } = useAuthStore();
  const { noticeId } = useNoticeStore();

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className="absolute inset-0 bg-white-1 border-4 border-black-1 rounded-lg shadow"
    >
      {/* Show the delete button for admin or manager */}
      {(role === userRoles.admin || role === userRoles.manager) && (
        <div className="absolute top-2 right-2">
          <GlobalCrossButton
            onClick={() =>
              handleDeleteAttachment({
                noticeId: noticeId,
                file_path: attachedDocument.file_path,
              })
            }
          />
        </div>
      )}
      <div className="text-center">
        <Typography.Paragraph className="font-bold">
          {attachedDocument.document_name}
        </Typography.Paragraph>
        <h4>{`${(attachedDocument.size / 1024).toFixed(2)} KB`}</h4>
      </div>
      <Flex gap={10} className="mt-5">
        <Button
          type="default"
          onClick={() => handleDownload(`${getS3BaseUrl()}${attachedDocument.file_path}`)}
          size="large"
          icon={<CloudDownloadOutlined rev={''} className="text-2xl" />}
        ></Button>
        <Button
          type="default"
          href={`${getS3BaseUrl()}${attachedDocument.file_path}`}
          target="_blank"
          size="large"
          icon={<ExportOutlined rev={''} className="text-2xl" />}
        ></Button>
      </Flex>
    </Flex>
  );
};

export default AttachmentCardAction;
