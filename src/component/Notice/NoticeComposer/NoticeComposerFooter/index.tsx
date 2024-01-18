import { Divider, Flex, Tag } from 'antd';
import { RcFile } from 'antd/es/upload';
import { ErrorMessage, useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../schema/NoticeSchema';
import useNoticeStore from '../../../../store/noticeStore';
import { NOTICE_STATUS_TYPE } from '../../../../types';
import AttachmentAction from './AttachmentAction';
import AttachmentFileList from './AttachmentFileList';
import DraftNoticeAction from './DraftNoticeAction';
import SendNoticeAction from './SendNoticeAction';

const NoticeComposerFooter = () => {
  const { openMode } = useNoticeStore();
  const { values, setFieldValue, handleSubmit } = useFormikContext<NoticeSchemaType>();

  // submit notice
  const onSubmit = (status: NOTICE_STATUS_TYPE) => {
    setFieldValue('status', status);
    handleSubmit();
  };

  // Delete attached file
  const handleAttachmentItemDelete = (index: number) => {
    const updatedFiles = values.attachments?.filter((_, i) => i !== index);
    setFieldValue('attachments', updatedFiles);
  };

  return (
    <div className="p-3" id="notice-composer-footer">
      {values.attachments && values.attachments.length > 0 && (
        <AttachmentFileList
          files={values.attachments as RcFile[]}
          handleAttachmentItemDelete={handleAttachmentItemDelete}
        />
      )}
      <ErrorMessage name="attachments" component="div" className="error" />
      <div className="flex items-center gap-2 flex-wrap">
        {openMode === 'update' && (
          <Flex className="" gap={1} vertical>
            <span>Current Status: </span>
            <Tag color="green" className="text-center">
              {values.status}
            </Tag>
          </Flex>
        )}
        <SendNoticeAction onSubmit={onSubmit} />
        <DraftNoticeAction onSubmit={onSubmit} />
        <Divider type="vertical" dashed />
        <AttachmentAction />
      </div>
    </div>
  );
};

export default NoticeComposerFooter;
