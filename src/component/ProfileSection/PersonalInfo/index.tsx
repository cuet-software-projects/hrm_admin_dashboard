import { useState } from 'react';

import useUserProfileStore from '../../../store/userProfileStore';
import EditButtonForUserProfile from '../CommonUI/EditButtonForUserProfile';
import ProfileContainer from '../CommonUI/ProfileContainer';
import EditLayout from './EditLayout';
import SaveLayout from './SaveLayout';

const PersonalInfo = () => {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);
  const { isOwnProfile } = useUserProfileStore();
  return (
    <ProfileContainer>
      <div className="profileHeader">
        <p className="stylishHeaderText text-md md:text-lg lg:text-xl">Personal Info</p>
        {!isEditBtnClicked && isOwnProfile ? (
          <EditButtonForUserProfile setIsEditBtnClicked={setIsEditBtnClicked} />
        ) : null}
      </div>
      {!isEditBtnClicked ? (
        <SaveLayout />
      ) : (
        isOwnProfile && <EditLayout setIsEditBtnClicked={setIsEditBtnClicked} />
      )}
    </ProfileContainer>
  );
};

export default PersonalInfo;
