import { Modal } from 'antd';
import { FormikProvider, useFormik } from 'formik';

import { utils } from '../../../../helpers/utility';
import { UserSocialMediaSchema } from '../../../../schema/UserSocialMediaSchema';
import UserSocialMediaService from '../../../../service/user-social-media.service';
import useAuthStore from '../../../../store/authStore';
import useUserProfileStore from '../../../../store/userProfileStore';
import { IUserSocialMedia } from '../../../../types/user-social-media.type';
import Icon from '../../../Resuables/Icon/Icon';
import UserSocialMediaForm from '../../Forms/UserSocialMediaForm';

interface props {
  data: IUserSocialMedia | null;
  refetch: () => void;
}

export default function UserSocialMediaModal({ data, refetch }: props) {
  const { userProfileData } = useAuthStore();
  const { isOpenSocialMediaModal, toggleSocialMediaModal } = useUserProfileStore();

  const formik = useFormik({
    initialValues: {
      user_id: userProfileData?.id,
      facebook: data?.facebook ?? '',
      linkedin: data?.linkedin ?? '',
    },
    validationSchema: UserSocialMediaSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!values.facebook && !values.linkedin) {
        alert('Please enter either Facebook or LinkedIn');
        return;
      }
      try {
        if (data) {
          const changedFields = utils.findChangedFields({
            currentValues: values,
            initialValues: {
              user_id: data.user_id,
              facebook: data.facebook ?? '',
              linkedin: data.linkedin ?? '',
            },
          });
          if (Object.keys(changedFields).length === 0) {
            alert('You have changed Nothing!');
            return;
          }
          await UserSocialMediaService.updateSocialMediaInfo({
            socialMediaId: data.id,
            updatedData: changedFields,
          });
        } else {
          await UserSocialMediaService.createSocialMediaInfo({
            user_id: userProfileData?.id ?? '',
            facebook: values.facebook,
            linkedin: values.linkedin,
          });
        }
        resetForm();
        refetch();
        const socialMediaModalElement = document.getElementById(
          'user-social-media-modal',
        ) as HTMLInputElement | null;
        if (socialMediaModalElement) {
          socialMediaModalElement.checked = false;
        }
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  const { resetForm, setSubmitting } = formik;

  return (
    <div>
      <Modal
        open={isOpenSocialMediaModal}
        footer={false}
        centered
        title={<h3 className="stylishHeaderText text-xl">Account Information</h3>}
        onCancel={toggleSocialMediaModal}
        closeIcon={
          <label className="bg-secondary-1 p-2 rounded-full cursor-pointer">
            <Icon name={'ic_cross'} size={15} />
          </label>
        }
      >
        <FormikProvider value={formik}>
          <UserSocialMediaForm />
        </FormikProvider>
      </Modal>
    </div>
  );
}
