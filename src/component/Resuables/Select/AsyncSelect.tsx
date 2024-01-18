import { UseQueryResult } from '@tanstack/react-query';
import { Select as AntdSelect, SelectProps, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';

import { newDatesLast } from '../../../constants/api';
import { PaginateResponse, PaginationQueryParams } from '../../../types';

const { Option } = AntdSelect;

interface Props extends SelectProps<any> {
  className?: string;
  errorMessage?: string;
  bordered?: boolean;
  allowClear?: boolean;
  hookToFetchData: (
    queryParams: PaginationQueryParams,
  ) => UseQueryResult<PaginateResponse<any>, unknown>;

  valueFieldForOption: string;
  labelFieldForOption: string;
}

const AsyncSelect: FC<Props> = ({
  errorMessage = '',
  className,
  bordered = false,
  allowClear = false,
  valueFieldForOption,
  labelFieldForOption,
  hookToFetchData,
  ...rest
}) => {
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    sorts: '',
    includes: '',
    search: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadedData, setLoadedData] = useState<any[] | undefined>();

  const { data, isLoading } = hookToFetchData({ ...queryParams, sorts: newDatesLast });

  useEffect(() => {
    if (data) {
      setLoadedData((prevData) =>
        !prevData ? [...data.data] : [...prevData, ...data.data],
      );
      if (loadedData?.length === data.meta.totalItems) {
        setHasMore(false);
      }
    }
  }, [data]);

  const fetchMoreData = () => {
    if (loadedData?.length === data?.meta.totalItems) {
      setHasMore(false);
      return;
    }
    if (!isLoading) {
      setQueryParams((prevParams) => ({ ...prevParams, page: prevParams.page + 1 }));
    }
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = event.target as HTMLElement;

    if (!isLoading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
      fetchMoreData();
    }
  };

  return (
    <>
      <AntdSelect
        {...rest}
        showSearch
        loading={isLoading}
        bordered={bordered}
        allowClear={allowClear}
        className={`bg-brand-grad-1 bg-opacity-10 rounded-md ${className}`}
        optionFilterProp="children"
        placeholder="Select"
        onPopupScroll={onScroll}
      >
        {loadedData &&
          loadedData.length > 0 &&
          loadedData.map((item, index) => (
            <Option key={index} value={item[valueFieldForOption]}>
              {item[labelFieldForOption] as string}
            </Option>
          ))}
        {isLoading && hasMore && (
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <Spin />
          </div>
        )}
      </AntdSelect>
      {errorMessage.length > 0 && (
        <p className="text-danger py-2 font-bold">{errorMessage}</p>
      )}
    </>
  );
};

export default AsyncSelect;
