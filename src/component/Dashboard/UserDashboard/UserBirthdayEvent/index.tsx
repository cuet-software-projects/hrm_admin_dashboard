import confetti from 'canvas-confetti';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import Confetti from 'react-canvas-confetti';

import useGetTodaysEvents from '../../../../customHooks/events/useGetTodaysEvents';
import useAuthStore from '../../../../store/authStore';
import { IUser } from '../../../../types';
import Loading from '../../../Resuables/Loader';

const UserBirthdayEvent: React.FC = () => {
  const { userProfileData } = useAuthStore();
  const today = dayjs().format('YYYY-MM-DD');
  const { data, isLoading } = useGetTodaysEvents({ date: dayjs(today).toDate() });
  if (isLoading) {
    return <Loading />;
  }

  const birthdayOfCurrentUser: IUser | undefined = data?.birthday.find(
    (user) => user.id === userProfileData?.id,
  );

  const birthdayOfOtherUsers: IUser[] | undefined = data?.birthday.filter(
    (user) => user.id !== userProfileData?.id,
  );
  if (
    birthdayOfCurrentUser &&
    birthdayOfOtherUsers &&
    !(birthdayOfOtherUsers?.length > 0)
  ) {
    return (
      <BirthdayOfCurrentUser user={birthdayOfCurrentUser} bgColor="bg-[#0000ff20]" />
    );
  }
  if (birthdayOfCurrentUser && birthdayOfOtherUsers && birthdayOfOtherUsers?.length > 0) {
    return (
      <div
        className={`bg-info bg-opacity-10 mb-10 p-4 rounded-lg flex justify-between flex-wrap`}
      >
        <BirthdayOfCurrentUser
          user={birthdayOfCurrentUser}
          marginBottom="mb-0"
          width="w-full lg:w-1/2"
        />
        <BirthdayOfOtherUsers
          users={birthdayOfOtherUsers}
          marginBottom="mb-0"
          width="w-full lg:w-1/2"
        />
      </div>
    );
  }
  if (
    !birthdayOfCurrentUser &&
    birthdayOfOtherUsers &&
    birthdayOfOtherUsers?.length > 0
  ) {
    return (
      <BirthdayOfOtherUsers
        users={birthdayOfOtherUsers}
        marginBottom="mb-10"
        width="w-full"
      />
    );
  }
  return <></>;
};

const BirthdayOfCurrentUser = ({
  user,
  bgColor = 'bg-transparent',
  marginBottom = 'mb-10',
  width = 'w-full',
}: {
  user: IUser;
  bgColor?: string;
  width?: string;
  marginBottom?: string;
}) => {
  return (
    <>
      <div className={`${bgColor} ${marginBottom} p-4 rounded-lg ${width}`}>
        <h2 className="text-2xl font-bold mb-2">Happy Birthday, {user?.first_name}!</h2>
        <p>Wishing you a fantastic day filled with joy and happiness!</p>
      </div>
      <BirthdayFireworks />
    </>
  );
};

const BirthdayOfOtherUsers = ({
  users,
  bgColor = 'bg-gradient-to-r from-[#3DCC8940] to-[#3DCC8920]',
  textColor = 'text-gray-800',
  width = 'max-w-xl',
  marginBottom = 'mb-10',
}: {
  users: IUser[];
  bgColor?: string;
  textColor?: string;
  width?: string;
  marginBottom?: string;
}) => {
  return (
    <div
      className={`${bgColor} ${textColor} ${marginBottom} p-6 rounded-lg shadow ${width}`}
    >
      <h2 className="text-2xl font-bold mb-4">Birthdays Today</h2>
      <p className="mb-2">
        The following users have birthdays today. Do not forget to wish them:
      </p>
      <ul className="list-none mb-4">
        {users.map((user) => (
          <li key={user.id} className="font-bold">
            <span className="ml-5">🍰</span> {`${user.first_name} ${user.last_name}`}
          </li>
        ))}
      </ul>
      <p>Spread some birthday cheer!</p>
    </div>
  );
};

const BirthdayFireworks: React.FC = () => {
  const burst = () => {
    confetti({
      particleCount: 40,
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      origin: { x: Math.random(), y: Math.random() },
    });
  };

  useEffect(() => {
    const interval = setInterval(burst, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-0 w-0 overflow-hidden">
      <Confetti fire={burst} style={{ pointerEvents: 'none' }} />
    </div>
  );
};

export default UserBirthdayEvent;
