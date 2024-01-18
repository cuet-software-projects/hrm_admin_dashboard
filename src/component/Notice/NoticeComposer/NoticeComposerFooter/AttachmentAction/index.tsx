// eslint-disable-next-line simple-import-sort/imports
import { FileImageOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../../schema/NoticeSchema';

const AttachmentAction = () => {
  const { values, setFieldValue } = useFormikContext<NoticeSchemaType>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = (file: RcFile, fileList: RcFile[]) => {
    let isFileTooLarge = false;
    const maxFileSize = 300 * 1024; // 300KB

    // Check whether any file larger than 300KB
    fileList.forEach((file) => {
      if (file.size > maxFileSize) {
        isFileTooLarge = true;
      }
    });

    // Exit the function if any file is more than 300KB
    if (isFileTooLarge) {
      message.error('Maximum allowed file size is 300KB.');
      return false;
    }

    setFieldValue('attachments', [
      ...(values.attachments ? values.attachments : []),
      ...fileList,
    ]);
    return false;
  };

  return (
    <>
      <Upload
        showUploadList={false}
        accept=".pdf, .doc, .docx, .xlsx, '.xls', .ppt, .pptx"
        multiple
        beforeUpload={handleFileUpload}
      >
        <Button title="Attach Files" icon={<PaperClipOutlined rev={''} />} />
      </Upload>
      <Upload
        showUploadList={false}
        accept="image/png, image/gif, image/jpeg"
        multiple
        beforeUpload={handleFileUpload}
      >
        <Button title="Attach Images" icon={<FileImageOutlined rev={''} />} />
      </Upload>
    </>
  );
};

export default AttachmentAction;
