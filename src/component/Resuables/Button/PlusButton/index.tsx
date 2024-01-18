import Icon from '../../Icon/Icon';

interface Props {
  iconSizeLg: number;
  iconSizeSm: number;
}

export default function PlusButton({ iconSizeLg, iconSizeSm }: Props) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
      <div className="flex justify-center bg-white-1 rounded-2xl p-3 lg:p-4 shadow-md">
        <div className="hidden lg:block">
          <Icon name="ic_plus" size={iconSizeLg} />
        </div>
        <div className="block lg:hidden">
          <Icon name="ic_plus" size={iconSizeSm} />
        </div>
      </div>
    </div>
  );
}
