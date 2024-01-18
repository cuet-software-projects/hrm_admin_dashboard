import { Image } from 'antd';

import { getS3BaseUrl } from '../../../../../../helpers/configs/envConfig';
import { IDocument } from '../../../../../../types/document.type';

const AttachmentCardPreview = ({ attachedDocument }: { attachedDocument: IDocument }) => {
  if (attachedDocument.mime_type.includes('image')) {
    return (
      <Image
        height={200}
        src={`${getS3BaseUrl()}${attachedDocument.file_path}`}
        alt={attachedDocument.document_name}
      />
    );
  } else {
    const fileExt = attachedDocument.file_path.split('.');
    const ext = fileExt[fileExt.length - 1];
    // Display a generic preview for non-image files
    return (
      <div className="preview relative shadow">
        <div className="absolute inset-0 text-2xl font-bold flex justify-center items-center uppercase">
          <span className="w-fit h-fit shadow px-4 py-2 rounded-lg">{ext}</span>
        </div>
      </div>
    );
  }
};

export default AttachmentCardPreview;
