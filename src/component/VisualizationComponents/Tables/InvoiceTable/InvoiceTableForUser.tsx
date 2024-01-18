import { Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import React from 'react';

import { invoicePdfName } from '../../../../constants/GlobalConstants';
import PdfRendererPage from '../../../../Pages/PdfRenderer';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import usePdfStore from '../../../../store/pdfStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { IInvoice } from '../../../../types/invoice.type';
import Icon from '../../../Resuables/Icon/Icon';
import StatusBadge from '../../../Resuables/StatusBadge';

interface InvoiceTableForUserProps {
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
}

const InvoiceTableForUser: React.FC<InvoiceTableForUserProps> = ({
  data,
  isLoading,
  error,
  paginationTotal,
  handleTableChange,
}) => {
  const { stickyColumn } = useTableConfigStore();
  const { showPdfPage, handleOpenPdfPage, setCurrentPdf } = usePdfStore();
  const { setInvoiceId } = useInvoiceStore();

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
      title: 'Issue Date',
      key: 'Issue Date',
      dataIndex: 'Issue Date',
      fixed: stickyColumn,
      render: (_, invoiceItem) =>
        invoiceItem.issue_date
          ? dayjs(invoiceItem.issue_date).format('DD-MM-YYYY')
          : '--',
    },
    {
      title: 'Invoice ID',
      key: 'Invoice ID',
      dataIndex: 'Invoice ID',
      render: (_, invoiceItem) => invoiceItem.id ?? '--',
    },
    {
      title: 'Subject',
      key: 'Subject',
      dataIndex: 'Subject',
      render: (_, invoiceItem) => invoiceItem.invoice_subject ?? '--',
    },
    {
      title: 'Status',
      key: 'Status',
      dataIndex: 'Status',
      render: (_, invoiceItem) =>
        invoiceItem.status ? <StatusBadge status={invoiceItem.status} /> : '--',
    },
    {
      title: '-',
      key: '-',
      dataIndex: '-',
      fixed: stickyColumn,
      render: (_, invoiceItem) => (
        <a
          className="flex justify-center items-center space-x-3"
          key={1}
          onClick={() => onInvoicePdfOpen(invoiceItem)}
        >
          <Icon name="ic_pdf" color="white" size={28} />
          <span>Open PDF</span>
        </a>
      ),
    },
  ];

  const tablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    total: paginationTotal,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  return (
    <div>
      <Table<IInvoice>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
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

export default InvoiceTableForUser;
