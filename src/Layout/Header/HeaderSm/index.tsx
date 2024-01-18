import Icon from '../../../component/Resuables/Icon/Icon';
import Text from '../../../component/Resuables/Text';
import useSidebarStore from '../../../store/sidebarStore/sidebarStore';
import Noticebar from '../HeaderRight/Noticebar';

export default function HeaderSm() {
  const { isDropdownSmClicked, setDropdownSmClicked } = useSidebarStore();
  return (
    <div className="w-full flex px-4 items-center justify-between bg-black-1 overflow-hidden">
      <div className="flex items-center space-x-1">
        <div>
          <Icon name="ic_logo" size={100} />
        </div>
        <div>
          <Text title={'HRM'} size={'md'} fontWeight={'semibold'} color={'white-1'} />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {/* Notic bar */}
        <Noticebar />
        {/* {!isDropdownSmClicked ? (
          <div className="bg-grey-1 bg-opcaity-30 rounded-full p-2">
            <Icon name="ic_searchSm" size={26} />
          </div>
        ) : null} */}

        <div id="hamburger-menu" className="bg-grey-1 bg-opcaity-30 rounded-full p-2">
          {isDropdownSmClicked ? (
            <div onClick={() => setDropdownSmClicked(false)}>
              <Icon name="ic_cross" size={26} />
            </div>
          ) : (
            <div onClick={() => setDropdownSmClicked(true)}>
              <Icon name="ic_sidebarMenu" size={26} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
