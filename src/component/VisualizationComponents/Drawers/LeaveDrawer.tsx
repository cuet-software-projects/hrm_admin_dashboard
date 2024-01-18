import dayjs from 'dayjs';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';

import { userRoles } from '../../../constants/GlobalConstants';
import { useLeaveDetails } from '../../../customHooks/leaves/useGetLeaveDetails';
import {
  CreateLeaveSchema,
  CreateLeaveSchemaType,
  UpdateLeaveSchema,
  UpdateLeaveSchemaType,
} from '../../../schema/LeaveSchema';
import LeaveService from '../../../service/leave.service';
import useAuthStore from '../../../store/authStore';
import useDrawerStore from '../../../store/drawerStore';
import { ILeave } from '../../../types/leave.type';
import LeaveRequestWarning from '../../Leave/LeaveRequestWarning/LeaveRequestWarning';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import WarningToSwitchRole from '../../Resuables/WarningToSwitchRole';
import LeaveCreateForm from '../Forms/LeaveCreateForm';
import LeaveUpdateForm from '../Forms/LeaveUpdateForm';

type Props = {
  onClose: () => void;
  leaveId: ILeave['id'] | null;
  refetch: () => void;
  allowCreate: boolean;
};

const LeaveDrawer: React.FC<Props> = ({ onClose, leaveId, refetch, allowCreate }) => {
  const { role, userProfileData } = useAuthStore();
  const { mode } = useDrawerStore();
  const { data, isLoading } = useLeaveDetails({ leaveId: leaveId });

  const formikForCreateLeave = useFormik({
    initialValues: {
      started_at: '',
      ended_at: '',
      leave_type: '',
    },
    validationSchema: CreateLeaveSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddNewLeave(values);
    },
  });

  const onAddNewLeave = async (values: CreateLeaveSchemaType) => {
    try {
      await LeaveService.createLeave({
        employeeId: userProfileData?.current_employee_id ?? '',
        data: values,
      });
      refetch();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const formikForUpdate = useFormik({
    initialValues: {
      started_at: data?.started_at ? dayjs(data.started_at).format('YYYY-MM-DD') : '',
      ended_at: data?.ended_at ? dayjs(data.ended_at).format('YYYY-MM-DD') : '',
      leave_type: data?.leave_type ?? '',
      description: data?.description ?? '',
    },
    validationSchema: UpdateLeaveSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdateLeave(values as UpdateLeaveSchemaType);
    },
  });

  const onUpdateLeave = async (values: UpdateLeaveSchemaType) => {
    try {
      await LeaveService.updateLeave({
        employeeId: userProfileData?.current_employee_id ?? '',
        leaveId: leaveId ?? '',
        data: values,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const { resetForm, setSubmitting } =
    mode === 'create' ? formikForCreateLeave : formikForUpdate;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  if (role === userRoles.admin || role === userRoles.manager) {
    return (
      <DrawerTemplate
        onClose={onCloseDrawer}
        title={mode === 'create' ? 'Give Leave' : 'Exit For Today'}
      >
        <WarningToSwitchRole
          subTitle={
            <>
              You are not able to apply for leave with this role.
              <br /> Please swich your role.
            </>
          }
        />
      </DrawerTemplate>
    );
  }

  return (
    <DrawerTemplate
      onClose={onCloseDrawer}
      title={mode === 'create' ? 'Apply For Leave' : 'Update your leave application'}
    >
      {mode === 'create' &&
        (allowCreate ? (
          <FormikProvider value={formikForCreateLeave}>
            <div className="overflow-auto">
              <LeaveRequestWarning />
              <LeaveCreateForm />
            </div>
          </FormikProvider>
        ) : (
          <p className="text-center font-bold text-danger p-10">
            Out of leaves or one in progress? Hold off before you ask for more! No leaves
            left? No leave requests allowed!
          </p>
        ))}

      {mode !== 'create' && isLoading && <Loading />}
      {mode !== 'create' && !isLoading && !data && (
        <p>An error occured during loading your previous data.</p>
      )}

      {mode !== 'create' && data && (
        <FormikProvider value={formikForUpdate}>
          <div className="overflow-auto">
            <LeaveRequestWarning />
            <LeaveUpdateForm />
          </div>
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
};

export default LeaveDrawer;
