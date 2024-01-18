import { useUserDetails } from '../../../customHooks/users/useUserDetails';
import useUserProfileStore from '../../../store/userProfileStore';
import PlusButton from '../../Resuables/Button/PlusButton';
import Loading from '../../Resuables/Loader';
import UserSocialMediaModal from '../../VisualizationComponents/Modals/UserSocialMediaModal';
import ProfileContainer from '../CommonUI/ProfileContainer';
import UserSocialMediaIcon from './SocialMediaIcon';

const SocialMedia = () => {
  const { isOwnProfile, userId } = useUserProfileStore();
  const { toggleSocialMediaModal } = useUserProfileStore();
  const { data: userData, ...rest } = useUserDetails({
    userId: userId,
  });

  return (
    <ProfileContainer>
      <div className="profileHeader">
        <p className=" stylishHeaderText text-lg lg:text-xl">Social Media</p>
      </div>
      <div className="py-10 px-5 lg:px-16 w-full flex items-center space-x-5 overflow-x-auto lg:space-x-10">
        {rest.isLoading && <Loading />}

        {rest.isError && <p>Could not fetch social media data.</p>}

        {!rest.isLoading &&
          !rest.isError &&
          (userData?.social_media || userData?.social_media === null) && (
            <>
              <UserSocialMediaIcon
                icon_name={'ic_facebook'}
                link={userData?.social_media?.facebook ?? undefined}
              />
              <UserSocialMediaIcon
                icon_name={'ic_linkedIn'}
                link={userData?.social_media?.linkedin ?? undefined}
              />
              {isOwnProfile && (
                <label onClick={toggleSocialMediaModal}>
                  <PlusButton iconSizeLg={32} iconSizeSm={24} />
                </label>
              )}
              <UserSocialMediaModal
                data={userData?.social_media}
                refetch={() => rest.refetch()}
              />
            </>
          )}
      </div>
    </ProfileContainer>
  );
};

export default SocialMedia;
