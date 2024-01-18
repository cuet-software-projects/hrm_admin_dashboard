import { Divider, Pagination, PaginationProps, Space } from 'antd';
import React, { useMemo, useState } from 'react';

import { newDatesFirst } from '../../../constants/api';
import { useGetFeedbacks } from '../../../customHooks/feedbacks/useGetFeedbacks';
import { FEEDBACK_TYPE, PaginationQueryParams } from '../../../types';
import { FEEDBACK_VALUES } from '../../../types/values';
import Loading from '../../Resuables/Loader';
import Select from '../../Resuables/Select/Select';
import FeedbackCard from './FeedbackCard';

const PAGE_SIZE = 10;

const FeedbackListForAdmin: React.FC = () => {
  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: PAGE_SIZE,
    page: 1,
    filters: {},
    sorts: '',
  };
  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const [feedbackType, setFeedbackType] = useState<FEEDBACK_TYPE | null>(null);
  const {
    data: feedbackData,
    isLoading,
    error,
  } = useGetFeedbacks({
    ...queryParams,
    filters: feedbackType ? { feedback_type: feedbackType } : undefined,
    sorts: newDatesFirst,
  });

  const totalCount = useMemo(() => {
    return feedbackData?.meta?.totalItems || 0;
  }, [feedbackData?.meta]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>An error occured.</p>;
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setQueryParams({ ...queryParams, page: current + 1, limit: pageSize });
  };

  return (
    <div className="relative">
      <div className="w-full">
        <Space wrap align="center" size="large">
          <p className="stylishHeaderText text-2xl">Recent Feedbacks</p>
          <Select
            className="bg-white-1 bg-opacity-100 text-black-1 w-[120px]"
            bordered
            options={FEEDBACK_VALUES.map((item) => ({
              label: item,
              value: item,
            }))}
            value={feedbackType && feedbackType.length > 0 ? feedbackType : undefined}
            onChange={(e) => setFeedbackType(e.target.value as FEEDBACK_TYPE)}
          />
        </Space>
        <Divider />
      </div>
      <div className="flex flex-wrap">
        {feedbackData?.data.length === 0 && (
          <p className="w-full text-info text-2xl">No feedback found.</p>
        )}
        {feedbackData?.data.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
      <Divider />
      <Pagination
        className="ml-auto w-fit"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={initialPageState.page}
        total={totalCount}
        showTotal={() => <p>Total {totalCount} items</p>}
      />
    </div>
  );
};

export default FeedbackListForAdmin;
