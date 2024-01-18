import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUserDetails } from '../../customHooks/users/useUserDetails';
import ErrorHandler from '../../helpers/axios/errorHandler';
import SuccessHandler from '../../helpers/axios/successHandler';
import EmployeeService from '../../service/employee.service';
import UserService from '../../service/user.service';
import useDrawerStore from '../../store/drawerStore';
import { ResponseError } from '../../types';
import { IEmployee } from '../../types/employee.type';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import EmployeeDrawer from '../VisualizationComponents/Drawers/EmployeeDrawer';
import CurrentEmployeeSelectionModal from '../VisualizationComponents/Modals/CurrentEmployeeSelectionModal';
import EmploymentTable from '../VisualizationComponents/Tables/EmploymentTable';

const Employee: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const { data, isLoading, error, refetch } = useUserDetails({
    userId: userId,
  });

  const { drawerOpen, handleDrawerClose } = useDrawerStore();
  const [selectedItemId, setSelectedItemId] = useState<IEmployee['id'] | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const onClose = () => {
    setSelectedItemId(null);
    handleDrawerClose();
  };

  const handleDelete = async (id: string) => {
    try {
      await EmployeeService.deleteEmployee(id);
      SuccessHandler.handle('The item has been deleted');
    } catch (e) {
      ErrorHandler.handle(e as ResponseError);
    }
  };

  const handlePopupVisibility = () => {
    setShowPopup((prevStatus) => !prevStatus);
  };

  const handleConfirmCurrentEmployment = async (selectedId: string) => {
    if (userId) {
      try {
        await UserService.updateCurrentEmploymentInfo({
          userId: userId ?? userId,
          employeeId: selectedId,
        });
        refetch();
        setShowPopup(false);
      } catch (e) {
        //
      }
    }
  };

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <div className="relative flex items-center lg:space-x-4 justify-center px-8 lg:px-none lg:justify-none"></div>
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          <div className="w-full lg:w-72">
            <Searchbar />
          </div>
          <FilterButton />
        </div>
        {userId && (
          <EmploymentTable
            data={data}
            isLoading={isLoading}
            error={error}
            setId={setSelectedItemId}
            handleDelete={handleDelete}
            handlePopup={handlePopupVisibility}
          />
        )}
      </div>
      {drawerOpen && (
        <EmployeeDrawer
          onClose={onClose}
          employeeId={selectedItemId}
          userId={userId}
          refetch={refetch}
        />
      )}
      {selectedItemId && (
        <CurrentEmployeeSelectionModal
          isOpen={showPopup}
          onClose={handlePopupVisibility}
          id={selectedItemId}
          onConfirm={handleConfirmCurrentEmployment}
          title="You are going to choose this employment as the current employment of the user."
          description="If you are sure, then please press confirm."
        />
      )}
    </div>
  );
};

export default Employee;
