import dayjs from 'dayjs';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';

import { userRoles } from '../../../constants/GlobalConstants';
import {
  CreateAttendanceSchema,
  CreateAttendanceSchemaType,
  UpdateAttendanceSchema,
  UpdateAttendanceSchemaType,
} from '../../../schema/AttendanceSchema';
import AttendanceService from '../../../service/attendance.service';
import { useAttendanceStore } from '../../../store/attendanceStore/attendanceStore';
import useAuthStore from '../../../store/authStore';
import useDrawerStore from '../../../store/drawerStore';
import { IAttendance } from '../../../types';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import WarningToSwitchRole from '../../Resuables/WarningToSwitchRole';
import AttendanceCreateForm from '../Forms/AttendanceCreateForm';
import AttendanceExitForm from '../Forms/AttendanceExitForm';

type Props = {
  onClose: () => void;
  attendanceId?: IAttendance['id'] | null;
  refetch?: () => void;
};

const AttendanceDrawer: React.FC<Props> = ({ attendanceId, onClose, refetch }) => {
  const { role, userProfileData } = useAuthStore();
  const { entryTime } = useAttendanceStore();
  const { mode } = useDrawerStore();

  const formikForCreateAttendance = useFormik({
    initialValues: {
      employee_id: userProfileData?.current_employee_id,
      entry_time: '',
      work_type: '',
      work_plan: '',
    },
    validationSchema: CreateAttendanceSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddNewAttendance(values as CreateAttendanceSchemaType);
    },
  });

  const onAddNewAttendance = async (values: CreateAttendanceSchemaType) => {
    try {
      await AttendanceService.createAttendance(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const formikForExit = useFormik({
    initialValues: {
      exit_time: entryTime
        ? dayjs(entryTime).add(8, 'hour').toDate().toISOString()
        : undefined,
      reason_of_break: '',
      work_descriptions: '',
    },
    validationSchema: UpdateAttendanceSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onEmployeeExit(values as UpdateAttendanceSchemaType);
    },
  });

  const onEmployeeExit = async (values: UpdateAttendanceSchemaType) => {
    try {
      await AttendanceService.updateAttendance({
        updatedData: values,
        id: attendanceId ? attendanceId : null,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const { resetForm, setSubmitting } =
    mode === 'create' ? formikForCreateAttendance : formikForExit;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  if (role === userRoles.admin || role === userRoles.manager) {
    return (
      <DrawerTemplate
        onClose={onCloseDrawer}
        title={mode === 'create' ? 'Give Attendance' : 'Exit For Today'}
      >
        <WarningToSwitchRole
          subTitle={
            <>
              You are not able to give attendance with this role.
              <br />
              Please switch your role.
            </>
          }
        />
      </DrawerTemplate>
    );
  }

  return (
    <DrawerTemplate
      onClose={onCloseDrawer}
      title={mode === 'create' ? 'Give Attendance' : 'Exit For Today'}
    >
      {mode === 'create' && (
        <FormikProvider value={formikForCreateAttendance}>
          <AttendanceCreateForm />
        </FormikProvider>
      )}

      {mode === 'update' && (
        <FormikProvider value={formikForExit}>
          <AttendanceExitForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
};

export default AttendanceDrawer;
