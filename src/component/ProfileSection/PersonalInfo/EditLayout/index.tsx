import { FormikProvider, useFormik } from 'formik';
import React, { SetStateAction } from 'react';

import { useUserDetails } from '../../../../customHooks/users/useUserDetails';
import { UpdateUserSchema, UpdateUserSchemaType } from '../../../../schema/UserSchema';
import UserService from '../../../../service/user.service';
import useAuthStore from '../../../../store/authStore';
import Loading from '../../../Resuables/Loader';
import UserInfoUpdateFormByUser from '../../../VisualizationComponents/Forms/UserInfoUpdateFormByUser';

interface EditLayoutProps {
  setIsEditBtnClicked: React.Dispatch<SetStateAction<boolean>>;
}

const EditLayout: React.FC<EditLayoutProps> = ({ setIsEditBtnClicked }) => {
  const { userProfileData } = useAuthStore();

  const { data, isLoading } = useUserDetails({ userId: userProfileData?.id });

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
      nid: data?.nid,
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

  const { resetForm, setSubmitting } = formikForUpdate;

  const onUpdateNewUser = async (values: UpdateUserSchemaType) => {
    try {
      await UserService.updateUser({
        updatedData: values,
        id: userProfileData?.id ?? '',
      });
      resetForm();
      setIsEditBtnClicked(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full px-5 py-5 lg:px-20 lg:py-10 space-y-5 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] bg-white-1">
      <FormikProvider value={formikForUpdate}>
        <UserInfoUpdateFormByUser setIsEditBtnClicked={setIsEditBtnClicked} />
      </FormikProvider>
    </div>
  );
};
export default EditLayout;
