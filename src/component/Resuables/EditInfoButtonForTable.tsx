import React from 'react';

import Icon from './Icon/Icon';

interface EditInfoButtonProps {
  handleEdit: () => void;
}

const EditInfoButtonForTable: React.FC<EditInfoButtonProps> = ({ handleEdit }) => {
  return (
    <a className="table-dropdown-item" onClick={() => handleEdit()}>
      <Icon name="ic_pencil" color="black" size={28} />
      <span>Edit Info</span>
    </a>
  );
};

export default EditInfoButtonForTable;
