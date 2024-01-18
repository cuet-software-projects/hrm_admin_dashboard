import Icon from '../../../component/Resuables/Icon/Icon';

interface Props {
  title: string;
}

export default function CompanySocialMediaIcons({ title }: Props) {
  return (
    <div
      className={` bg-white-1 rounded-xl p-3 shadow-md flex justify-center cursor-pointer`}
    >
      <Icon name={title} color={'black'} size={20} />
    </div>
  );
}
