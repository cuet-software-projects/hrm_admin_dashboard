const WelcomeMsg = ({ userName }: { userName: string }) => {
  return (
    <div className="text-white text-center lg:text-start">
      <h1 className="text-2xl xl:text-4xl font-bold">hello, {userName}👋</h1>
      <p className="text-xl">Welcome again!!</p>
    </div>
  );
};

export default WelcomeMsg;
