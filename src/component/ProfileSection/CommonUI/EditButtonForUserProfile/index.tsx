import React from 'react';

import Button from '../../../Resuables/Button/Button';
import Icon from '../../../Resuables/Icon/Icon';

interface Props {
  setIsEditBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditButtonForUserProfile({ setIsEditBtnClicked }: Props) {
  return (
    <Button
      bgcolor="bg-white-1"
      textColor="black-1"
      className="flex items-center justify-center shadow"
      onClick={() => setIsEditBtnClicked((prev) => !prev)}
    >
      <Icon name="ic_edit" color="black" size={28} />
      <p className="hidden font-semibold lg:text-sm lg:pl-1 lg:block">Edit Info</p>
    </Button>
  );
}
