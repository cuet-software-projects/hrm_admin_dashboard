import { Modal } from 'antd';
import React from 'react';

import Button from '../../../Resuables/Button/Button';
import GlobalCrossButton from '../../../Resuables/GlobalCrossButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  onConfirm: (id: string) => void;
  title: string;
  description: string;
}

const CurrentEmployeeSelectionModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  id,
  onConfirm,
  title,
  description,
}) => {
  const handleConfirm = () => {
    onConfirm(id);
  };
  return (
    <Modal
      open={isOpen}
      footer={null}
      closeIcon={<GlobalCrossButton />}
      onCancel={onClose}
      title={
        <h1 className="mt-10 text-center">
          <span className="font-bold text-lg">{title}</span>
        </h1>
      }
      centered
    >
      <div className="bg-white-1 rounded-lg px-10 py-5">
        <p className="text-lg text-danger mb-10">{description}</p>
        <div className="flex justify-center">
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CurrentEmployeeSelectionModal;
