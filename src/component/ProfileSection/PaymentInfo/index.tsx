import { useState } from 'react';

import Button from '../../Resuables/Button/Button';
import EditButtonForUserProfile from '../CommonUI/EditButtonForUserProfile';
import InfoField from '../CommonUI/InfoField';
import ProfileContainer from '../CommonUI/ProfileContainer';
import SaveButtonForUserProfile from '../CommonUI/SaveButtonForUserProfile';

const PaymentInfo = () => {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState<boolean>(false);
  return (
    <ProfileContainer>
      <div className="profileHeader">
        <p className=" stylishHeaderText text-lg lg:text-xl">Payment Info</p>
        {!isEditBtnClicked ? (
          <EditButtonForUserProfile setIsEditBtnClicked={setIsEditBtnClicked} />
        ) : (
          <SaveButtonForUserProfile setIsEditBtnClicked={setIsEditBtnClicked} />
        )}
      </div>
      <div className="bg-white-1 pt-5 mx-3 my-5 px-4 lg:px-8 lg:m-10 rounded-xl">
        <div className="flex justify-start">
          <Button>Bank Info</Button>
        </div>
        <div className="py-10 w-full md:w-[80%] lg:w-[60%] space-y-5 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
          <InfoField refName="Account Status" valueName="Active" />
          <InfoField refName="Bank Name" valueName="DBBL" />
          <InfoField refName="Account No" valueName="XXXX-XXXX-XXX" />
          <InfoField refName="Branch Name" valueName="XXX, Dhaka, 1200" />
          <InfoField refName="Account Holder" valueName="Shawn Carter" />
          <InfoField refName="Routing No" valueName="XXXX-XXX-2343" />
        </div>
      </div>
      <div className="bg-white-1 pt-5 mx-3 my-5 px-4 lg:px-8 lg:m-10 rounded-xl">
        <div className="flex justify-start">
          <Button>Mobile Banking Info</Button>
        </div>
        <div className="py-10 w-full md:w-[80%] lg:w-[60%] space-y-5 text-[0.8rem] md:text-[0.9rem] lg:text-[1rem]">
          <InfoField refName="Account Status" valueName="Active" />
          <InfoField refName="Bank Name" valueName="DBBL" />
          <InfoField refName="Account No" valueName="XXXX-XXXX-XXX" />
          <InfoField refName="Branch Name" valueName="XXX, Dhaka, 1200" />
          <InfoField refName="Account Holder" valueName="Shawn Carter" />
          <InfoField refName="Routing No" valueName="XXXX-XXX-2343" />
        </div>
      </div>
      <div className="flex justify-center px-4 lg:px-8">
        <Button block className="mb-5">
          Add Payment Method
        </Button>
      </div>
    </ProfileContainer>
  );
};

export default PaymentInfo;
