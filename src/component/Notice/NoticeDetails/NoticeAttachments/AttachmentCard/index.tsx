import './style.css';

import { Card } from 'antd';
import React, { useState } from 'react';

import NoticeService from '../../../../../service/notice.service';
import { IDocument } from '../../../../../types/document.type';
import { INotice } from '../../../../../types/notice.type';
import AttachmentCardPreview from './AttachmentCardPreview';
import AttachmentCardAction from './AttchmentCardAction';

const { Meta } = Card;

interface AttachmentCardProps {
  attachedDocument: IDocument;
  refetchNotice: () => void;
}

const AttachmentCard: React.FC<AttachmentCardProps> = ({
  attachedDocument,
  refetchNotice,
}) => {
  const [showActions, setShowActions] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // Toggle the action buttons display status
  const handleToggleActionShow = () => {
    setShowActions((prev) => !prev);
  };

  const handleDownload = (link: string) => {
    fetch(link).then((response) => {
      response.blob().then((blob) => {
        const fileUrl = window.URL.createObjectURL(blob);
        const aLink = document.createElement('a');
        aLink.href = fileUrl;
        aLink.download = 'document.pdf';
        aLink.click();
      });
    });
  };

  // Delete an attachment
  const handleDeleteAttachment = async ({
    noticeId,
    file_path,
  }: {
    noticeId: INotice['id'];
    file_path: string;
  }) => {
    try {
      setIsDeleteLoading(true);
      await NoticeService.deleteAttachmentOfNotice({ noticeId, file_path });
      setIsDeleteLoading(false);
      refetchNotice?.();
    } catch (error) {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Card
      loading={isDeleteLoading}
      onMouseEnter={handleToggleActionShow}
      onMouseLeave={handleToggleActionShow}
      className={`w-[250px] ${
        isDeleteLoading ? 'h-[250px]' : 'h-fit'
      } cursor-pointer overflow-hidden`}
      cover={
        !isDeleteLoading && <AttachmentCardPreview attachedDocument={attachedDocument} />
      }
    >
      <Meta
        title={attachedDocument.document_name}
        description={`${(attachedDocument.size / 1024).toFixed(2)} KB`}
      />
      {showActions && (
        <AttachmentCardAction
          attachedDocument={attachedDocument}
          handleDeleteAttachment={handleDeleteAttachment}
          handleDownload={handleDownload}
        />
      )}
    </Card>
  );
};

export default AttachmentCard;
