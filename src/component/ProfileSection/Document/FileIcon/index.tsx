import Icon from '../../../Resuables/Icon/Icon';

interface Props {
  iconTitle: string;
  fileName: string;
}

export default function FileIcon({ iconTitle, fileName }: Props) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="bg-white-1 rounded-2xl p-3 shadow-md hover:shadow-lg flex justify-center cursor-pointer buttonBorder">
        <div className="hidden md:block">
          <Icon name={iconTitle} size={62} />
        </div>
        <div className="block md:hidden">
          <Icon name={iconTitle} size={52} />
        </div>
      </div>
      <p className="text-center w-[100px] text-xs text-black-1 text-opacity-90 font-semibold">
        {fileName}
      </p>
    </div>
  );
}
