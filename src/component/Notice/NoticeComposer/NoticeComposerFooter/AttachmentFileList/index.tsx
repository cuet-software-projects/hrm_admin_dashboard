import {
  DeleteOutlined,
  FileExclamationTwoTone,
  FilePdfTwoTone,
} from '@ant-design/icons';
import { Button, Image, List } from 'antd';
import { RcFile } from 'antd/es/upload';

interface props {
  files: RcFile[];
  handleAttachmentItemDelete: (index: number) => void;
}

const AttachmentFileList: React.FC<props> = ({ files, handleAttachmentItemDelete }) => {
  const renderPreview = (file: RcFile) => {
    if (file.type.includes('image')) {
      return (
        <Image
          className="border border-black-1 border-opacity-10 p-1 rounded-lg"
          src={URL.createObjectURL(file)}
          width={30}
          height={30}
        />
      );
    } else if (file.type.includes('pdf')) {
      return (
        <FilePdfTwoTone
          className="border border-black-1 border-opacity-10 p-1 rounded-lg w-[30px] h-[30px] flex justify-center items-center"
          rev={''}
        />
      );
    } else {
      return (
        <FileExclamationTwoTone
          className="border border-black-1 border-opacity-10 p-1 rounded-lg w-[30px] h-[30px] flex justify-center items-center"
          rev={''}
        />
      );
    }
  };

  return (
    <List
      className="my-3"
      size="small"
      bordered
      dataSource={files}
      renderItem={(file, index) => (
        <List.Item key={index} className="flex justify-between">
          <div className="flex justify-between items-center gap-3">
            {renderPreview(file)}
            <span>
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </span>
          </div>
          <Button
            icon={<DeleteOutlined rev={''} />}
            onClick={() => handleAttachmentItemDelete(index)}
          />
        </List.Item>
      )}
    />
  );
};

export default AttachmentFileList;
