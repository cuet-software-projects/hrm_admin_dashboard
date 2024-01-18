import React from 'react';

import Button from '../../../Resuables/Button/Button';
import Icon from '../../../Resuables/Icon/Icon';

interface Props {
  setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SaveButtonForUserProfile({ setIsEditBtnClicked }: Props) {
  return (
    <Button
      className="flex items-center justify-center shadow"
      onClick={() => setIsEditBtnClicked((prev) => !prev)}
    >
      <Icon name="ic_save" color="white" size={28} />
      <p className="hidden lg:text-sm lg:pl-1 lg:text-white-1 lg:block">Save Info</p>
    </Button>
  );
}
