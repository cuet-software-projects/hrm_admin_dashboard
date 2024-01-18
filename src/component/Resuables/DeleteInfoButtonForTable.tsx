import React from 'react';

import Icon from './Icon/Icon';

interface DeleteInfoButtonProps {
  handleDelete: () => void;
}

const DeleteInfoButtonForTable: React.FC<DeleteInfoButtonProps> = ({ handleDelete }) => {
  return (
    <button
      disabled
      className="table-dropdown-item w-full pointer-events-none"
      onClick={handleDelete}
    >
      <Icon name="ic_trash" color="black" size={28} />
      <span>Delete Info</span>
    </button>
  );
};

export default DeleteInfoButtonForTable;
