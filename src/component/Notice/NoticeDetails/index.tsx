import { EditFilled } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { userRoles } from '../../../constants/GlobalConstants';
import useGetNoticeDetails from '../../../customHooks/notices/usetGetNoticeDetails';
import useAuthStore from '../../../store/authStore';
import useNoticeStore from '../../../store/noticeStore';
import Loading from '../../Resuables/Loader';
import NoticeComposer from '../NoticeComposer';
import NoticeAttachments from './NoticeAttachments';
import NoticeBody from './NoticeBody';
import NoticeHeader from './NoticeHeader';

const NoticeDetails = () => {
  const { isOpenNoticeModal, handleSelectSizingMode, handleNoticeOpenMode } =
    useNoticeStore();
  const { role } = useAuthStore();
  const [searchParams] = useSearchParams();
  const noticeId = searchParams.get('noticeId');

  // Fetch Notice Details
  const { data, isLoading, error, refetch } = useGetNoticeDetails(noticeId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>An error occured</p>;
  }

  // Open the notice form
  const handleOpenNoticeForm = () => {
    handleNoticeOpenMode('update');
    handleSelectSizingMode('default');
  };

  return (
    <div>
      <NoticeHeader
        sender={data?.sender}
        issue_date={data?.issue_date}
        subject={data?.subject}
      />
      <NoticeBody content={data?.content} />
      {data?.attachments && data.attachments.length > 0 && (
        <NoticeAttachments attachments={data.attachments} refetchNotice={refetch} />
      )}
      {!isOpenNoticeModal && (role === userRoles.admin || role === userRoles.manager) && (
        <FloatButton
          onClick={handleOpenNoticeForm}
          description={
            <p className="text-lg px-3 py-2">
              <EditFilled rev={''} className="mr-2" />
              <span>Edit</span>
            </p>
          }
          shape="square"
          className="w-fit"
          type="primary"
          style={{ right: 30, bottom: 15 }}
        />
      )}

      {isOpenNoticeModal && data && (
        <NoticeComposer refetchNotices={refetch} isUpdateMode={true} noticeData={data} />
      )}
    </div>
  );
};

export default NoticeDetails;
