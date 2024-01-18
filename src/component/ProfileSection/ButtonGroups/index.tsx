import './style.css';

import useUserProfileStore from '../../../store/userProfileStore';
import Button from '../../Resuables/Button/Button';

export default function ButtonGroups() {
  const {
    isOwnProfile,
    activeProfileSection: activeProfileInfo,
    setActiveProfileSection: setActiveProfileInfo,
  } = useUserProfileStore();
  return (
    <>
      <Button
        className={`flex items-center justify-center buttonBorder whitespace-nowrap`}
        bgcolor={activeProfileInfo.personalInfoSelect ? undefined : 'none'}
        textColor={
          activeProfileInfo.personalInfoSelect ? 'text-white-1' : 'text-brand-grad-1'
        }
        onClick={() =>
          setActiveProfileInfo({
            ...activeProfileInfo,
            personalInfoSelect: true,
            officeInfoSelect: false,
            paymentInfoSelect: false,
            socialMediaSelect: false,
            documentSelect: false,
          })
        }
      >
        Personal Info
      </Button>

      <Button
        className={`flex items-center justify-center buttonBorder whitespace-nowrap`}
        bgcolor={activeProfileInfo.officeInfoSelect ? undefined : 'none'}
        textColor={
          activeProfileInfo.officeInfoSelect ? 'text-white-1' : 'text-brand-grad-1'
        }
        onClick={() =>
          setActiveProfileInfo({
            ...activeProfileInfo,
            personalInfoSelect: false,
            officeInfoSelect: true,
            paymentInfoSelect: false,
            socialMediaSelect: false,
            documentSelect: false,
          })
        }
      >
        Office Info
      </Button>

      {/* <Button
        className={`flex items-center justify-center buttonBorder whitespace-nowrap`}
        bgcolor={profile.paymentInfoSelect ? undefined : 'none'}
        textColor={profile.paymentInfoSelect ? 'text-white-1' : 'text-brand-grad-1'}
        variant="btn-md"
        onClick={() =>
          setProfile({
            ...profile,
            personalInfoSelect: false,
            officeInfoSelect: false,
            paymentInfoSelect: true,
            socialMediaSelect: false,
            documentSelect: false,
          })
        }
      >
        Payment
      </Button> */}

      {isOwnProfile && (
        <Button
          className={`flex items-center justify-center buttonBorder whitespace-nowrap`}
          bgcolor={activeProfileInfo.documentSelect ? undefined : 'none'}
          textColor={
            activeProfileInfo.documentSelect ? 'text-white-1' : 'text-brand-grad-1'
          }
          onClick={() =>
            setActiveProfileInfo({
              ...activeProfileInfo,
              personalInfoSelect: false,
              officeInfoSelect: false,
              paymentInfoSelect: false,
              socialMediaSelect: false,
              documentSelect: true,
            })
          }
        >
          Documents
        </Button>
      )}

      <Button
        className={`flex items-center justify-center buttonBorder whitespace-nowrap`}
        bgcolor={activeProfileInfo.socialMediaSelect ? undefined : 'none'}
        textColor={
          activeProfileInfo.socialMediaSelect ? 'text-white-1' : 'text-brand-grad-1'
        }
        onClick={() =>
          setActiveProfileInfo({
            ...activeProfileInfo,
            personalInfoSelect: false,
            officeInfoSelect: false,
            paymentInfoSelect: false,
            socialMediaSelect: true,
            documentSelect: false,
          })
        }
      >
        Social Media
      </Button>
    </>
  );
}
