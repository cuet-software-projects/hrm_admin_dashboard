import { BlobProvider } from '@react-pdf/renderer';

import { userRoles } from '../../../../constants/GlobalConstants';
import { useGetLastApprovedSalaryCertificate } from '../../../../customHooks/salaryCertificates/useGetLastApprovedSalaryCertificate';
import useAuthStore from '../../../../store/authStore';
import Loading from '../../../Resuables/Loader';
import WarningToSwitchRole from '../../../Resuables/WarningToSwitchRole';
import SalaryCertificatePdf from '../../../VisualizationComponents/pdfs/SalaryCertificatePdf';

const SalaryCertificatePdfRenderer = () => {
  const { role, userProfileData } = useAuthStore();

  if (role === userRoles.admin || role === userRoles.manager) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-white-1 w-fit rounded-lg mx-auto">
          <WarningToSwitchRole
            subTitle={
              <>
                You are not able to see your salary certificate with this role.
                <br /> Please swich your role.
              </>
            }
          />
        </div>
      </div>
    );
  }

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
    <BlobProvider
      document={
        <SalaryCertificatePdf
          userProfileData={userProfileData}
          lastApprovedData={lastApprovedData}
        />
      }
    >
      {({ error, loading, url }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <p>An error occured.</p>;
        }
        return (
          url && (
            <div className="w-full">
              <iframe
                className="bg-transparent w-screen lg:w-[8.3in] h-[11.7in] my-5 mx-auto overflow-auto"
                src={`${url}#toolbar=0`}
              ></iframe>
            </div>
          )
        );
      }}
    </BlobProvider>
  );
};

export default SalaryCertificatePdfRenderer;
