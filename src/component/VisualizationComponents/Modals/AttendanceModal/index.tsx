import { message, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { FormikProvider, useFormik } from 'formik';

import { utils } from '../../../../helpers/utility';
import {
  CombinedCreateUpdateAttendanceSchema,
  CombinedCreateUpdateAttendanceSchemaType,
} from '../../../../schema/AttendanceSchema';
import AttendanceService from '../../../../service/attendance.service';
import { useAttendanceStore } from '../../../../store/attendanceStore/attendanceStore';
import useAuthStore from '../../../../store/authStore';
import GlobalCrossButton from '../../../Resuables/GlobalCrossButton';
import AttendacneUpdateForm from '../../Forms/AttendanceUpdateForm';

const AttendanceModal = ({ refetch }: { refetch?: () => void }) => {
  // using required stores
  const { userProfileData } = useAuthStore();
  const { singleAttendanceData, isAttendanceModalOpen, handleCloseAttendanceModal } =
    useAttendanceStore();

  // Configuration of the forms
  const formik = useFormik({
    initialValues: {
      employee_id: userProfileData?.current_employee_id ?? '',
      entry_time: singleAttendanceData?.entry_time ?? undefined,
      exit_time: singleAttendanceData?.exit_time ?? undefined,
      work_plan: singleAttendanceData?.work_plan ?? '',
      work_type: singleAttendanceData?.work_type ?? '',
      work_descriptions: singleAttendanceData?.work_descriptions ?? undefined,
      break_duration: singleAttendanceData?.break_duration ?? undefined,
      reason_of_break: singleAttendanceData?.reason_of_break ?? undefined,
    },
    validationSchema: CombinedCreateUpdateAttendanceSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdateAttendance(values as CombinedCreateUpdateAttendanceSchemaType);
    },
  });
  const { resetForm, setSubmitting } = formik;

  const onUpdateAttendance = async (values: CombinedCreateUpdateAttendanceSchemaType) => {
    const changedFields = utils.findChangedFields({
      currentValues: values,
      initialValues: singleAttendanceData as CombinedCreateUpdateAttendanceSchemaType,
    });
    if (Object.keys(changedFields).length === 0) {
      message.info('You have not changed anything!!', 3);
      setSubmitting(false);
      return;
    }
    try {
      await AttendanceService.updateAttendance({
        id: `${singleAttendanceData?.id}`,
        updatedData: values,
      });
      resetForm();
      handleCloseAttendanceModal();
      refetch?.();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        open={isAttendanceModalOpen}
        centered
        title={
          <div className="flex justify-between items-center space-x-2">
            <Title level={4} className="stylishHeaderText">
              Attendace Update Form
            </Title>
            <GlobalCrossButton onClick={handleCloseAttendanceModal} />
          </div>
        }
        width={800}
        closable={false}
        footer={false}
        styles={{
          content: { height: '90vh' },
          body: { maxHeight: 'calc(100vh - 175px)' },
        }}
        classNames={{
          content: 'overflow-hidden',
          body: 'max-h-full overflow-auto hide-scrollbar',
        }}
      >
        <FormikProvider value={formik}>
          <AttendacneUpdateForm />
        </FormikProvider>
      </Modal>
    </div>
  );
};

export default AttendanceModal;
