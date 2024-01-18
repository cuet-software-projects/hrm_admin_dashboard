import Icon from '../../Resuables/Icon/Icon';

export default function Notificationbar() {
  return (
    <>
      <div className="bg-brand-grad-1 bg-opacity-20 px-3 py-1.5 rounded-2xl cursor-pointer btn buttonBorder hover:bg-brand-grad-1 hover:bg-opacity-30 hover:buttonBorder">
        <div className="relative z-40">
          <Icon name="ic_notification" color={'#1B1B1B'} size={28} />
        </div>
      </div>
    </>
  );
}
