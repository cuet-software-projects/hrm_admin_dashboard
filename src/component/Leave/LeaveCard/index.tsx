import Text from '../../Resuables/Text';

interface Props {
  title: string;
  days: number | string;
}

export default function LeaveCard({ title, days }: Props) {
  const titles = title.split(' ');
  return (
    <div className="flex flex-col items-center bg-brand-grad-1 bg-opacity-20 w-full lg:w-[22%] rounded-xl shadow-md">
      <div className=" bg-brand-grad-1 bg-opacity-30 w-full rounded-t-xl shadow-md">
        <div className="flex flex-col items-center p-5">
          <Text title={titles[0]} size={'xl'} fontWeight="semibold" />
          <Text title={titles[1]} size={'xl'} fontWeight="semibold" />
        </div>
      </div>
      <div className="py-3 text-3xl">
        <Text title={days.toString()} fontWeight="bold" color={'brand-grad-1'} />
      </div>
    </div>
  );
}
