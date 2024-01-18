import { Pagination, PaginationProps } from 'antd';
import { useMemo, useState } from 'react';

import { newDatesFirst } from '../../constants/api';
import { useGetFeedbacksOfUser } from '../../customHooks/feedbacks/useGetFeedbackOfUser';
import useAuthStore from '../../store/authStore';
import { PaginationQueryParams } from '../../types';
import FeedbackForm from '../VisualizationComponents/Forms/FeedbackForm';
import FeedbackListForUser from './FeedbackList/FeedbackListForUser';

const PAGE_SIZE = 10;

const UserFeedback = () => {
  const { userProfileData } = useAuthStore();

  const initialPageState: PaginationQueryParams = {
    limit: PAGE_SIZE,
    page: 1,
    filters: {},
    sorts: '',
    includes: '',
    search: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data, isLoading, error, refetch } = useGetFeedbacksOfUser({
    userId: `${userProfileData?.id}`,
    page: queryParams.page,
    limit: queryParams.limit,
    sorts: newDatesFirst,
  });

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setQueryParams({ ...queryParams, page: current + 1, limit: pageSize });
  };

  return (
    <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
      <div className="w-full lg:w-1/2 relative">
        <FeedbackListForUser
          feedbackData={data?.data || []}
          isLoading={isLoading}
          error={error}
        />
        <br />
        <Pagination
          className="absolute bottom-0"
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={initialPageState.page}
          total={totalCount}
          showTotal={() => <p>Total {totalCount} items</p>}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FeedbackForm refetch={() => refetch()} />
      </div>
    </div>
  );
};

export default UserFeedback;
