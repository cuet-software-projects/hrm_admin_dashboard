import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { newDatesFirst } from '../../constants/api';
import { userRoles } from '../../constants/GlobalConstants';
import { useGetInvoiceListOfAll } from '../../customHooks/invoice/useGetInvoiceListOfAll';
import { useGetInvoiceListOfUser } from '../../customHooks/invoice/useGetInvoicesOfUser';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import useAuthStore from '../../store/authStore';
import useGlobalFilterStore from '../../store/GlobalFilterStore';
import { useInvoiceStore } from '../../store/invoiceStore';
import { PaginationQueryParams } from '../../types';
import { IInvoice } from '../../types/invoice.type';
import Button from '../Resuables/Button/Button';
import FilterButton from '../Resuables/Button/FilterButton';
import NotAnEmployee from '../Resuables/NotAnEmployee';
import Searchbar from '../Resuables/Searchbar';
import Text from '../Resuables/Text';
import InvoiceTableForAdmin from '../VisualizationComponents/Tables/InvoiceTable/InvoiceTableForAdmin';
import InvoiceTableForUser from '../VisualizationComponents/Tables/InvoiceTable/InvoiceTableForUser';

const Invoice: React.FC = () => {
  const { role, userProfileData } = useAuthStore();
  const {
    changeInvoiceMode,
    setSelectedReceiver,
    setSelectedUser,
    setBillingInfoId,
    setInvoiceId,
  } = useInvoiceStore();
  const { searchValue } = useGlobalFilterStore();

  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    includes: '',
    sorts: '',
    search: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);
  const navigate = useNavigate();

  const {
    data: invoiceData,
    isLoading,
    error,
  } = role === userRoles.admin || role === userRoles.manager
    ? useGetInvoiceListOfAll({
        ...queryParams,
        search: searchValue,
        includes: 'user',
        sorts: newDatesFirst,
      })
    : useGetInvoiceListOfUser({
        ...queryParams,
        filters: { user_id: [`${userProfileData?.id}`] },
        sorts: newDatesFirst,
      });

  const totalCount = useMemo(() => {
    return invoiceData?.meta?.totalItems || 0;
  }, [invoiceData?.meta]);

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<IInvoice> | SorterResult<IInvoice>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<IInvoice>(sorter),
    });
  };

  // This functions executed when table edit button clicked
  const onInvoiceEditBtnClicked = ({ invoiceItem }: { invoiceItem: IInvoice }) => {
    setInvoiceId(invoiceItem.id);
    changeInvoiceMode('edit');
    setSelectedReceiver(undefined);
    setSelectedUser(undefined);
    navigate('invoice-details');
  };

  // This functions executed when table edit button clicked
  const onInvoiceAddBtnClicked = () => {
    setInvoiceId(null);
    setBillingInfoId(null);
    changeInvoiceMode('edit');
    setSelectedReceiver(undefined);
    setSelectedUser(undefined);
    navigate('invoice-details');
  };

  if (!userProfileData?.current_employee_id) {
    return <NotAnEmployee />;
  }

  return (
    <div className="border border-grey-1 border-opacity-10 p-4 rounded-lg w-full bg-white-1">
      <Row justify="end" align="middle" gutter={[14, 14]} className="py-8">
        <Col>
          {(role === userRoles.admin || role === userRoles.manager) && (
            <Searchbar placeholder="Search with Invoice ID or subject" />
          )}
        </Col>
        <Col>
          <FilterButton />
        </Col>
        {(role === userRoles.admin || role === userRoles.manager) && (
          <Col className="text-right">
            <Button
              className="flex space-x-2 justify-center items-center capitalize"
              onClick={onInvoiceAddBtnClicked}
            >
              <PlusOutlined rev={''} />
              <Text size="xs">Add Invoice</Text>
            </Button>
          </Col>
        )}
      </Row>
      {role === userRoles.user && (
        <InvoiceTableForUser
          data={invoiceData?.data}
          isLoading={isLoading}
          error={error}
          paginationTotal={totalCount}
          handleTableChange={handleTableChange}
        />
      )}
      {(role === userRoles.admin || role === userRoles.manager) && (
        <InvoiceTableForAdmin
          data={invoiceData?.data}
          isLoading={isLoading}
          error={error}
          paginationTotal={totalCount}
          handleTableChange={handleTableChange}
          onInvoiceEditBtnClicked={onInvoiceEditBtnClicked}
        />
      )}
    </div>
  );
};

export default Invoice;
