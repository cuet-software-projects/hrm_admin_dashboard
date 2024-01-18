// import Searchbar from '../../Molecules/Searchbar';
import HeaderRight from './HeaderRight';

export default function Header() {
  return (
    <div className="w-full bg-white-1 flex justify-between px-10" id="header-lg">
      <div className="ml-auto">
        <HeaderRight />
      </div>
    </div>
  );
}
