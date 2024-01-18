import './style.css';

import { message } from 'antd';
import { FormikProvider, useFormik } from 'formik';

import { utils } from '../../../helpers/utility';
import { NoticeSchema, NoticeSchemaType } from '../../../schema/NoticeSchema';
import NoticeService from '../../../service/notice.service';
import useAuthStore from '../../../store/authStore';
import useNoticeStore from '../../../store/noticeStore';
import { INotice } from '../../../types/notice.type';
import NoticeForm from '../../VisualizationComponents/Forms/NoticeForm';
import NoticeComposerFooter from './NoticeComposerFooter';
import NoticeComposerHeader from './NoticeComposerHeader';

interface props {
  refetchNotices: () => void;
  isUpdateMode?: boolean;
  noticeData?: INotice;
}

const NoticeComposer: React.FC<props> = ({
  refetchNotices,
  isUpdateMode,
  noticeData,
}) => {
  if (isUpdateMode === true && noticeData === undefined) {
    throw new Error('Notice data must be provided for update mode');
  }

  const { sizingMode, openMode } = useNoticeStore();
  const { userProfileData } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      issue_date: noticeData?.issue_date ?? '',
      subject: noticeData?.subject ?? '',
      content: noticeData?.content ?? '',
      status: noticeData?.status ?? 'DRAFT',
      recipient_ids: noticeData?.recipients
        ? noticeData?.recipients.map((recipent) => recipent.recipient_id)
        : [],
      sender_id: `${userProfileData?.id}`,
    },
    validationSchema: NoticeSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (openMode === 'create') {
        onNoticeCreate(values as NoticeSchemaType);
      }
      if (openMode === 'update') {
        onNoticeUpdate(values as NoticeSchemaType);
      }
    },
  });

  const { setSubmitting } = formik;

  // Create a notice
  const onNoticeCreate = async (values: NoticeSchemaType) => {
    try {
      await NoticeService.createNotice({ noticeData: values });
      setSubmitting(false);
      refetchNotices?.();
    } catch (error) {
      setSubmitting(false);
    }
  };

  // Update a notice
  const onNoticeUpdate = async (values: NoticeSchemaType) => {
    // Find which fields are changed
    const changedFields = utils.findChangedFields({
      currentValues: values,
      initialValues: noticeData as NoticeSchemaType,
    }) as NoticeSchemaType;

    // Check whether the recipients are changed or not
    const isNotRecipientChanged: boolean = utils.arraysAreEqual({
      arr1: values.recipient_ids ? values.recipient_ids.sort() : [],
      arr2: noticeData?.recipients
        ? noticeData?.recipients.map((recipent) => recipent.id)
        : [],
    });

    // If recipients not changed, delelte this entry
    if (isNotRecipientChanged) {
      delete changedFields.recipient_ids;
    }

    // If no field changed, show a message
    if (Object.keys(changedFields).length === 0) {
      message.info('You have not changed any fields');
      setSubmitting(false);
      return;
    }

    try {
      await NoticeService.updateNotice({
        noticeId: noticeData?.id ?? '',
        noticeUpdateData: { ...changedFields },
      });
      setSubmitting(false);
      refetchNotices?.();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <FormikProvider value={formik}>
      <div className={`${sizingMode}`}>
        <div className="flex flex-col h-[100%]">
          <NoticeComposerHeader />
          <div className="flex-1 overflow-auto hide-scrollbar">
            <NoticeForm />
          </div>
          <NoticeComposerFooter />
        </div>
      </div>
    </FormikProvider>
  );
};

export default NoticeComposer;
