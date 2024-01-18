import dayjs from 'dayjs';
import React from 'react';

import { IFeedback } from '../../../types/feedback.type';
import PictureOrAvatar from '../../Resuables/PictureOrAvatar';

interface FeedbackCardProps {
  feedback: IFeedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <div className="w-full lg:w-1/2 bg-white-1 mb-4 lg:pr-5">
      <div className="shadow rounded p-4">
        {feedback.user && (
          <div className="flex justify-start items-center mb-2">
            {feedback.user && <PictureOrAvatar userData={{ user: feedback.user }} />}
            <span className="ml-5 overflow-ellipsis text-left">{`${feedback?.user?.first_name} ${feedback?.user?.last_name}`}</span>
          </div>
        )}
        <h2 className="font-bold text-lg">Feedback Type: {feedback.feedback_type}</h2>
        <p className="text-black-1 text-opacity-70">{feedback.description}</p>
        <p className="py-3">
          <span className="text-sm">
            <span className="font-semibold">Created at:</span>{' '}
            {dayjs(feedback.created_at).format('DD-MM-YYYY')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
