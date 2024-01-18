import { useUserDetails } from '../../../customHooks/users/useUserDetails';
import useUserProfileStore from '../../../store/userProfileStore';
import Loading from '../../Resuables/Loader';
import InfoField from '../CommonUI/InfoField';

export default function SaveLayout() {
  const { userId } = useUserProfileStore();

  const { data: userData, isLoading } = useUserDetails({ userId: userId });

  const currentEmploymentInfo = userData?.employment_infos?.find(
    (employmentItem) => employmentItem.id === userData?.current_employee_id,
  );

  return (
    <div className="w-full lg:w-[70%] px-5 py-5 lg:px-20 lg:py-10 space-y-5 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
      {isLoading && <Loading />}
      {userData && currentEmploymentInfo && (
        <>
          <InfoField
            refName={'Current Status'}
            valueName={currentEmploymentInfo.isCurrent === true ? 'Active' : 'Not Active'}
          />
          <InfoField
            refName={'Branch Name'}
            valueName={currentEmploymentInfo.branch?.name ?? '-'}
          />
          <InfoField
            refName={'Team Name'}
            valueName={
              currentEmploymentInfo.teams?.join(', ') ?? 'Not assigned to any team'
            }
          />
          <InfoField
            refName={'Designation'}
            valueName={currentEmploymentInfo?.current_employee_designation?.name ?? '-'}
          />
          <InfoField
            refName={'Role'}
            valueName={
              userData.roles?.map((item) => item.name).join(', ') ?? 'No role added'
            }
          />
          <InfoField
            refName={'Reporting Officer'}
            valueName={
              `${currentEmploymentInfo.reporting_officer?.first_name} ${currentEmploymentInfo.reporting_officer?.last_name} (${currentEmploymentInfo.reporting_officer?.userName})` ??
              '-'
            }
          />
          <InfoField
            refName={'ID No'}
            valueName={currentEmploymentInfo?.employee_id ?? '-'}
          />
        </>
      )}
    </div>
  );
}
