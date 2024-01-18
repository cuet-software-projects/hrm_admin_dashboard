import React from 'react';

interface UserMarkingStatusMsgProps {
  averageMark: number;
}

const UserMarkingStatusMsg: React.FC<UserMarkingStatusMsgProps> = ({ averageMark }) => {
  let message: string;
  let emoji: string;

  if (averageMark >= 7) {
    message = 'You are doing great! Keep up the good work 👍';
    emoji = '🎉';
  } else if (averageMark >= 5) {
    message = 'You are doing well, but there is room for improvement! 💪';
    emoji = '📈';
  } else {
    message = 'You need to work harder. You can do it! 💪';
    emoji = '👊';
  }

  return (
    <div
      className="bg-brand-grad-1 bg-opacity-20 p-6 rounded-lg text-center lg:text-start mt-5 lg:mt-0"
      id="performance_status"
    >
      <h2 className="text-2xl font-bold mb-4">Your Marking Status</h2>
      <p className="text-lg mb-4">Average marking for last 7 days is {averageMark}.</p>
      <p className="text-lg mb-4">{message}</p>
      <div className="text-4xl">{emoji}</div>
    </div>
  );
};

export default UserMarkingStatusMsg;
