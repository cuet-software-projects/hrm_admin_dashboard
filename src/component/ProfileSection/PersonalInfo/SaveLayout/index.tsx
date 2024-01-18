import dayjs from 'dayjs';

import { useUserDetails } from '../../../../customHooks/users/useUserDetails';
import useUserProfileStore from '../../../../store/userProfileStore';
import Loading from '../../../Resuables/Loader';
import InfoField from '../../CommonUI/InfoField';

export default function SaveLayout() {
  const { userId } = useUserProfileStore();

  const { data: userData, isLoading, isError } = useUserDetails({ userId: userId });

  return (
    <div className="w-full lg:w-[70%] px-5 py-5 lg:px-20 lg:py-10 space-y-5 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
      {isLoading && <Loading />}
      {isError && <p>An error occured.</p>}
      {userData && (
        <>
          <InfoField
            refName={'Name'}
            valueName={`${userData?.first_name} ${userData?.last_name}` ?? '-'}
          />
          <InfoField
            refName={"Father's Name"}
            valueName={userData?.fathers_name ?? '-'}
          />
          <InfoField
            refName={"Mother's Name"}
            valueName={userData?.mothers_name ?? '-'}
          />
          <InfoField
            refName={'Date of Birth'}
            valueName={dayjs(userData?.dob).format('DD/MM/YYYY') ?? '-'}
          />
          <InfoField refName={'Email Address'} valueName={userData?.email ?? '-'} />
          <InfoField
            refName={'Contact'}
            valueName={userData?.contact_number ?? 'Not Provided'}
          />
          <InfoField
            refName={'Emergency Contact'}
            valueName={userData?.emergency_contact_number ?? 'Not Provided'}
          />
          <InfoField
            refName={'Blood Group'}
            valueName={userData?.blood_group ?? 'Not Provided'}
          />
          <InfoField refName={'NID No'} valueName={userData?.nid ?? '-'} />
          <InfoField refName={'TIN No'} valueName={userData?.tin_number ?? '-'} />
          <InfoField
            refName={'Present Address'}
            valueName={userData?.present_address ?? 'Not Provided'}
          />
          <InfoField
            refName={'Permanent Address'}
            valueName={userData?.permanent_address ?? 'Not Provided'}
          />
          <InfoField refName={'Gender'} valueName={userData?.gender ?? 'Not Provided'} />
          <InfoField
            refName={'Religion'}
            valueName={userData?.religion ?? 'Not Provided'}
          />
          <InfoField refName={'T-Shirt'} valueName={userData?.tshirt ?? '-'} />
          <InfoField
            refName={'Marital Status'}
            valueName={userData?.marital_status ?? '-'}
          />
        </>
      )}
    </div>
  );
}
