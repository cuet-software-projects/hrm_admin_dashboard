import { salaryCertificatePdfName, userRoles } from '../../../constants/GlobalConstants';
import PdfRendererPage from '../../../Pages/PdfRenderer';
import useAuthStore from '../../../store/authStore';
import usePdfStore from '../../../store/pdfStore';
import ProfileContainer from '../CommonUI/ProfileContainer';
import FileIcon from './FileIcon';

const Document = () => {
  const { role } = useAuthStore();
  const { setCurrentPdf, currentPdf } = usePdfStore();

  const handlePdfOpen = (pdfName: string) => {
    setCurrentPdf(pdfName);
  };

  return (
    <ProfileContainer>
      <div className="profileHeader">
        <p className=" stylishHeaderText text-lg lg:text-xl">Documents</p>
      </div>
      <div className="py-10 px-5 lg:px-16 w-full flex items-start space-x-8 md:space-x-10 overflow-x-auto">
        {/* <FileIcon iconTitle="ic_pdf" fileName="CV.pdf" />
        <FileIcon iconTitle="ic_png" fileName="B.Sc Cert.png" />
        <FileIcon iconTitle="ic_jpg" fileName="CV.pdf" />
        <label htmlFor="my-modal-3">
          <PlusButton iconSizeLg={42} iconSizeSm={42} />
        </label>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <ModalUploadContent />
          </div>
        </div> */}
        <button
          onClick={() => {
            if (role === userRoles.user) {
              handlePdfOpen(salaryCertificatePdfName);
            } else {
              alert('Please change your role to user before using this.');
            }
          }}
        >
          <FileIcon iconTitle="ic_pdf" fileName="Salary Certificate.pdf" />
        </button>
      </div>
      {currentPdf.length > 0 && <PdfRendererPage />}
    </ProfileContainer>
  );
};

export default Document;
