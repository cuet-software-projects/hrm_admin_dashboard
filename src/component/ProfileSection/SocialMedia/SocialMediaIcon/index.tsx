import Icon from '../../../Resuables/Icon/Icon';

const UserSocialMediaIcon = ({
  icon_name,
  link,
}: {
  icon_name: string;
  link: string | undefined;
}) => {
  return (
    <a
      className={`${
        link ? 'bg-white-1' : 'bg-danger bg-opacity-20'
      } rounded-xl p-3 lg:p-4 shadow-md flex justify-center cursor-pointer`}
      href={link}
      target="_blank"
      rel="noreferrer"
      onClick={link ? () => {} : () => alert('Not Given')}
    >
      <div className="hidden lg:block">
        <Icon name={icon_name} size={32} />
      </div>
      <div className="block lg:hidden">
        <Icon name={icon_name} size={24} />
      </div>
    </a>
  );
};

export default UserSocialMediaIcon;
