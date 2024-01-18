import ProfileContainer from '../CommonUI/ProfileContainer';
import SaveLayout from './OfficeInfo';

const OfficeInfo = () => {
  return (
    <ProfileContainer>
      <div className="profileHeader">
        <p className="stylishHeaderText text-md md:text-lg lg:text-xl py-3">
          Office Info
        </p>
      </div>
      <SaveLayout />
    </ProfileContainer>
  );
};

export default OfficeInfo;
