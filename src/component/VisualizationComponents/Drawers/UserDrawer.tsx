/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useUserDetails } from '../../../customHooks/users/useUserDetails';
import {
  CreateUserSchema,
  CreateUserSchemaType,
  UpdateUserSchema,
  UpdateUserSchemaType,
} from '../../../schema/UserSchema';
import UserService from '../../../service/user.service';
import useDrawerStore from '../../../store/drawerStore';
import { IUser } from '../../../types';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import UserCreateForm from '../Forms/UserCreateForm';
import UserUpdateForm from '../Forms/UserUpdateForm';

type Props = {
  onClose: () => void;
  userId?: IUser['id'] | null;
  refetch?: () => void;
};

export default function UserDrawer({ onClose, userId, refetch }: Props) {
  const { mode } = useDrawerStore();
  const { data, isLoading } = useUserDetails({ userId: userId });

  const formikForCreate = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      userName: '',
      email: '',
      password: '',
      dob: '',
      // required dropdowns
      gender: '',
      religion: '',
    },
    validationSchema: CreateUserSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddNewUser(values as CreateUserSchemaType);
    },
  });

  const formikForUpdate = useFormik({
    initialValues: {
      first_name: data?.first_name ?? '',
      last_name: data?.last_name ?? '',
      userName: data?.userName,
      dob: data?.dob,
      blood_group: data?.blood_group ?? '',
      email: data?.email,
      fathers_name: data?.fathers_name ?? '',
      mothers_name: data?.mothers_name ?? '',
      contact_number: data?.contact_number ?? '',
      emergency_contact_number: data?.emergency_contact_number ?? '',
      nid: data?.nid ?? '',
      tin_number: data?.tin_number ?? '',
      permanent_address: data?.permanent_address ?? '',
      present_address: data?.present_address ?? '',
      tshirt: data?.tshirt ?? undefined,
      gender: data?.gender,
      marital_status: data?.marital_status ?? undefined,
      religion: data?.religion,
    },
    validationSchema: UpdateUserSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onUpdateNewUser(values as UpdateUserSchemaType);
    },
  });

  const { resetForm, setSubmitting } =
    mode === 'create' ? formikForCreate : formikForUpdate;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewUser = async (values: CreateUserSchemaType) => {
    try {
      await UserService.createUser(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewUser = async (values: UpdateUserSchemaType) => {
    try {
      await UserService.updateUser({
        updatedData: values,
        id: userId!,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <DrawerTemplate onClose={onCloseDrawer} title={userId ? 'Update User' : 'Add User'}>
      {mode === 'create' && (
        <FormikProvider value={formikForCreate}>
          <UserCreateForm />
        </FormikProvider>
      )}
      {mode !== 'create' && isLoading && <Loading />}
      {mode !== 'create' && !isLoading && (
        <FormikProvider value={formikForUpdate}>
          <UserUpdateForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
