import React from 'react';

import { IFeedback } from '../../../types/feedback.type';
import Loading from '../../Resuables/Loader';
import FeedbackCard from './FeedbackCard';

interface props {
  feedbackData: IFeedback[];
  isLoading: boolean;
  error: unknown;
}

const FeedbackListForUser: React.FC<props> = ({ feedbackData, isLoading, error }) => {
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>An error occured.</p>;
  }
  if (feedbackData.length === 0) {
    return (
      <div className="w-full">
        <p className="stylishHeaderText text-2xl">Your Recent Feedbacks</p>
        <div className="divider"></div>
        <p className="w-full text-blue text-lg mt-2">
          You have not given any feedback yet.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <p className="stylishHeaderText text-2xl">Your Recent Feedbacks</p>
        <div className="divider"></div>
      </div>
      <div className="flex flex-wrap my-3">
        {feedbackData.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackListForUser;
