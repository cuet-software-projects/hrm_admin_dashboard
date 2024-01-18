import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useAuthStore from '../../store/authStore';
import useUserProfileStore from '../../store/userProfileStore';
import ButtonGroups from './ButtonGroups';
import Document from './Document';
import OfficeInfo from './OfficeInfo';
import PaymentInfo from './PaymentInfo';
import PersonalInfo from './PersonalInfo';
import ProfileHeader from './ProfileHeader';
import SocialMedia from './SocialMedia';

export interface ProfileSelection {
  personalInfoSelect: boolean;
  officeInfoSelect: boolean;
  paymentInfoSelect: boolean;
  socialMediaSelect: boolean;
  documentSelect: boolean;
}

const ProfileSectionPage = () => {
  const [searchParams] = useSearchParams();
  const { userProfileData } = useAuthStore();
  const { isOwnProfile, setIsOwnProfile, activeProfileSection, setUserId } =
    useUserProfileStore();

  useEffect(() => {
    const isOwnProfile =
      searchParams && !searchParams.has('userId')
        ? true
        : userProfileData?.id === searchParams.get('userId');
    setIsOwnProfile(isOwnProfile);

    if (isOwnProfile) {
      setUserId(userProfileData?.id ?? '');
    } else {
      setUserId(searchParams.get('userId') ?? '');
    }
  }, [searchParams]);

  return (
    <div className="artboard w-full bg-white-1 shadow-md p-5 lg:p-10 rounded-xl">
      <div className="bg-brand-grad-1 bg-opacity-10 shadow-md rounded-t-3xl rounded-b-xl border-[1px] border-brand-grad-1 border-opacity-10">
        <ProfileHeader />
        <div
          id="profileButtonGroup"
          className={`w-full py-5 px-3 flex items-center space-x-2 overflow-x-auto`}
        >
          <ButtonGroups />
        </div>
      </div>
      <div className="pt-10">
        {activeProfileSection.personalInfoSelect ? <PersonalInfo /> : null}
        {activeProfileSection.officeInfoSelect ? <OfficeInfo /> : null}
        {activeProfileSection.paymentInfoSelect ? <PaymentInfo /> : null}
        {activeProfileSection.socialMediaSelect ? <SocialMedia /> : null}
        {activeProfileSection.documentSelect && isOwnProfile ? <Document /> : null}
      </div>
    </div>
  );
};

export default ProfileSectionPage;
