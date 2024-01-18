import './style.css';

import { MenuProps, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import { invoicePdfName } from '../../../../constants/GlobalConstants';
import { useGetUserListAll } from '../../../../customHooks/users/useUserListAll';
import PdfRendererPage from '../../../../Pages/PdfRenderer';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import usePdfStore from '../../../../store/pdfStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IInvoice } from '../../../../types/invoice.type';
import { INVOICE_STATUS_VALUES } from '../../../../types/values';
import DropDownForTable from '../../../Resuables/DropDownForTable';
import EditInfoButtonForTable from '../../../Resuables/EditInfoButtonForTable';
import Icon from '../../../Resuables/Icon/Icon';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import StatusBadge from '../../../Resuables/StatusBadge';

interface InvoiceTableForAdminProps {
  data: IInvoice[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<IInvoice> | SorterResult<IInvoice>[];
  }) => void;
  onInvoiceEditBtnClicked: ({ invoiceItem }: { invoiceItem: IInvoice }) => void;
}

const InvoiceTableForAdmin: React.FC<InvoiceTableForAdminProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  handleTableChange,
  onInvoiceEditBtnClicked,
}) => {
  const { stickyColumn } = useTableConfigStore();
  const { showPdfPage, handleOpenPdfPage, setCurrentPdf } = usePdfStore();
  const { setInvoiceId } = useInvoiceStore();

  // fetch all users
  const { data: allUsers } = useGetUserListAll();

  // Dropdown for user filter
  const userDropdown = useMemo(() => {
    return (
      allUsers?.map((user) => ({
        text: `${user.first_name} ${user.last_name}`,
        value: `${user.id}`,
      })) ?? []
    );
  }, [allUsers]);

  // Dropdown for status filtering
  const statusDropdown = useMemo(() => {
    return (
      INVOICE_STATUS_VALUES?.map((status) => ({
        text: status,
        value: status,
      })) ?? []
    );
  }, [allUsers]);

  function onInvoicePdfOpen(invoiceItem: IInvoice) {
    setCurrentPdf(invoicePdfName);
    setInvoiceId(invoiceItem.id);
    handleOpenPdfPage();
  }

  // If an error occurs
  if (error) {
    return <p>An error occured</p>;
  }

  // Configuring the columns of the table
  const columns: ColumnsType<IInvoice> = [
    {
      title: 'User',
      key: 'user_id',
      dataIndex: 'User',
      width: 100,
      fixed: stickyColumn,
      filters: userDropdown,
      filterSearch: true,
      render: (_, invoiceItem) => (
        <div className="flex justify-start items-center">
          {invoiceItem?.user && <PictureOrAvatar userData={{ user: invoiceItem.user }} />}
          <span className="ml-5 w-[100px] overflow-ellipsis text-left">{`${invoiceItem.user?.first_name} ${invoiceItem.user?.last_name}`}</span>
        </div>
      ),
    },
    {
      title: 'Invoice ID',
      key: 'Invoice ID',
      dataIndex: 'Invoice ID',
      render: (_, invoiceItem) => invoiceItem.id ?? '--',
    },
    {
      title: 'Issue Date',
      key: 'Issue Date',
      dataIndex: 'Issue Date',
      render: (_, invoiceItem) =>
        invoiceItem.issue_date
          ? dayjs(invoiceItem.issue_date).format('DD-MM-YYYY')
          : '--',
    },
    {
      title: 'Subject',
      key: 'Subject',
      dataIndex: 'Subject',
      render: (_, invoiceItem) => invoiceItem.invoice_subject ?? '--',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'Status',
      filters: statusDropdown,
      filterSearch: true,
      render: (_, invoiceItem) =>
        invoiceItem.status ? <StatusBadge status={invoiceItem.status} /> : '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      fixed: stickyColumn,
      render: (_, invoiceItem) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropDownForTable items={getDropDownItemList({ invoiceItem })} />
        </div>
      ),
    },
  ];

  // Action list for dropdown
  function getDropDownItemList({
    invoiceItem,
  }: {
    invoiceItem: IInvoice;
  }): MenuProps['items'] {
    const labelComponentList = [
      <EditInfoButtonForTable
        key={0}
        handleEdit={() => onInvoiceEditBtnClicked({ invoiceItem })}
      />,
      <a
        className="table-dropdown-item"
        key={1}
        onClick={() => onInvoicePdfOpen(invoiceItem)}
      >
        <Icon name="ic_pdf" color="white" size={28} />
        <span>Open PDF</span>
      </a>,
    ];
    return labelComponentList.map((component, index) => ({
      key: index,
      label: component,
    }));
  }

  const tablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    total: paginationTotal,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  // Open Notice Details page when a row clicked
  const handleRowClick = (invoiceItem: IInvoice) => {
    return {
      onClick: () => {
        onInvoiceEditBtnClicked({ invoiceItem });
      },
    };
  };

  return (
    <div>
      <Table<IInvoice>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onRow={handleRowClick}
        onChange={(pagination, filters, sorter) => {
          handleTableChange({ pagination, filters, sorter });
        }}
        pagination={tablePaginationConfig}
        scroll={data && data.length === 0 ? undefined : { x: 'max-content' }}
      />
      {showPdfPage && <PdfRendererPage />}
    </div>
  );
};

export default InvoiceTableForAdmin;
