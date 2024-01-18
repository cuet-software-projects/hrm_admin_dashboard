import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, Modal } from 'antd';
import { useState } from 'react';

import { useGetLastApprovedSalaryCertificate } from '../../../customHooks/salaryCertificates/useGetLastApprovedSalaryCertificate';
import useAuthStore from '../../../store/authStore';
import GlobalCrossButton from '../../Resuables/GlobalCrossButton';
import Icon from '../../Resuables/Icon/Icon';
import Loading from '../../Resuables/Loader';
import SalaryCertificateApplicationForm from '../../VisualizationComponents/Forms/SalaryCertificateApplicationForm';
import SalaryCertificatePdf from '../../VisualizationComponents/pdfs/SalaryCertificatePdf';

const SalaryCertificateDownloadApplyBtn = () => {
  const { userProfileData } = useAuthStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Toggle modal
  const toggleModal = () => setOpenModal((prev) => !prev);

  const {
    data: lastApprovedData,
    isLoading,
    error,
  } = useGetLastApprovedSalaryCertificate({ userId: `${userProfileData?.id}` });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error occured.</p>;
  }
  return (
    <>
      <PDFDownloadLink
        className="h-100 text-white-1 flex justify-center items-center"
        fileName="salary-certificate.pdf"
        document={
          <SalaryCertificatePdf
            userProfileData={userProfileData}
            lastApprovedData={lastApprovedData}
          />
        }
      >
        <Icon name="ic_download" color="white" size={50} />
      </PDFDownloadLink>
      <Button
        onClick={toggleModal}
        className="text-white-1 cursor-pointer border-2 p-2 rounded-xl font-bold h-full"
      >
        Apply
      </Button>
      <Modal
        open={openModal}
        footer={null}
        centered
        closable={false}
        maskClosable={false}
        title={
          <div className="flex justify-between items-center">
            <h3 className="stylishHeaderText text-xl">Apply for Salary Certificate</h3>
            <GlobalCrossButton onClick={toggleModal} />
          </div>
        }
      >
        <SalaryCertificateApplicationForm />
      </Modal>
    </>
  );
};

export default SalaryCertificateDownloadApplyBtn;
