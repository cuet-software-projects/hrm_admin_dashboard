import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
// import Table from '../../Molecules/Table';

export default function NotificationList() {
  return (
    <div>
      <div className="flex items-center justify-start px-4 py-4 lg:justify-end space-x-4 ">
        <div className="w-full lg:w-72">
          <Searchbar />
        </div>
        <FilterButton />
      </div>
      {/* <Table notificationDetailsEnable={true} /> */}
      <div className="pt-10 flex justify-center lg:justify-end">
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
