import './style.css';

import { SearchOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useEffect, useState } from 'react';

import { useDebounce } from '../../../customHooks';
import useGlobalFilterStore from '../../../store/GlobalFilterStore';

interface props {
  placeholder?: string;
}

const Searchbar: React.FC<props> = ({ placeholder }) => {
  const { setSearchValue } = useGlobalFilterStore();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceDelay = 500;

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value);
  };

  // Get the debounced search term using your custom hook
  const debouncedSearchTerm = useDebounce({
    searchQuery: searchTerm,
    delay: debounceDelay,
  });

  // Trigger the search when the debounced search term changes
  useEffect(() => {
    setSearchValue(searchTerm);
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  return (
    <Input
      bordered={true}
      className="global-search-field border border-black-1 border-opacity-10 rounded"
      classNames={{ input: 'border-none outline-none' }}
      placeholder={placeholder ?? 'search'}
      allowClear
      size="large"
      value={searchTerm}
      onChange={handleInputChange}
      suffix={
        <Tooltip title={placeholder}>
          <SearchOutlined rev={''} style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
  );
};

export default Searchbar;
