import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import { getS3BaseUrl } from '../../../../helpers/configs/envConfig';
import UserService from '../../../../service/user.service';
import useAuthStore from '../../../../store/authStore';
import useUserProfileStore from '../../../../store/userProfileStore';

const ProfilePictureModal: React.FC = () => {
  const { userProfileData } = useAuthStore();
  const { isProfilePictureModalOpen, toggleProfilePictureModal } = useUserProfileStore();
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPicture(file);
    }
  };

  const handleUpload = async () => {
    if (selectedPicture && userProfileData && userProfileData.id) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedPicture);
        await UserService.updateProfilePicture({
          userId: userProfileData?.id,
          data: formData,
        });
        toggleProfilePictureModal();
        window.location.reload();
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      open={isProfilePictureModalOpen}
      footer={
        <Button
          disabled={!selectedPicture}
          loading={loading}
          block
          size="large"
          icon={<CloudUploadOutlined rev={''} />}
          shape="round"
          onClick={handleUpload}
          className="bg-gradient-to-br from-brand-grad-1 to-brand-grad-2 text-white-1 px-4 py-2"
        >
          Upload
        </Button>
      }
      centered
      closable={true}
      onCancel={toggleProfilePictureModal}
      confirmLoading={true}
      width={450}
    >
      <div className="p-2 rounded-lg">
        {!selectedPicture && userProfileData?.profile_picture && (
          <img
            src={`${getS3BaseUrl()}${userProfileData.profile_picture}`}
            alt="Selected Profile Picture"
            className="w-52 h-52 mx-auto my-4 rounded-full"
          />
        )}

        <div className="flex justify-center">
          <label className="relative cursor-pointer bg-danger-50 text-white font-semibold rounded-lg py-2 px-4">
            <span>Choose File</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
        </div>

        {selectedPicture && (
          <img
            src={URL.createObjectURL(selectedPicture)}
            alt="Selected Profile Picture"
            className="w-52 h-52 mx-auto my-4 rounded-full"
          />
        )}
      </div>
    </Modal>
  );
};

export default ProfilePictureModal;
