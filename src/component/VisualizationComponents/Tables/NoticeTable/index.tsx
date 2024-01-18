import './style.css';

import { Checkbox, Table } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userRoles } from '../../../../constants/GlobalConstants';
import useAuthStore from '../../../../store/authStore';
import useNoticeStore from '../../../../store/noticeStore';
import useTableConfigStore from '../../../../store/tableConfigStore/tableConfigStore';
import { INotice } from '../../../../types/notice.type';
import PictureOrAvatar from '../../../Resuables/PictureOrAvatar';
import StatusBadge from '../../../Resuables/StatusBadge';
import AvatarGroup from './AvatarGroup';
import PinnedNoticeConfirmation from './PinnedNoticeConfirmation';

interface NoticeTableProps {
  data: INotice[] | undefined;
  isLoading: boolean;
  error: unknown;
  paginationTotal: number;
  handleConfirmPinned: ({
    noticeId,
    payload,
  }: {
    noticeId: INotice['id'];
    payload: { is_pinned: boolean };
  }) => void;
  handleTableChange: ({
    pagination,
    filters,
    sorter,
  }: {
    filters: Record<string, FilterValue | null>;
    pagination: TablePaginationConfig;
    sorter: SorterResult<INotice> | SorterResult<INotice>[];
  }) => void;
}

const NoticeTable: React.FC<NoticeTableProps> = ({
  data,
  isLoading,
  handleTableChange,
  handleConfirmPinned,
  paginationTotal,
}) => {
  const navigate = useNavigate();
  const { stickyColumn } = useTableConfigStore();
  const { noticeId, setNoticeId, handleNoticeClose, togglePinningConfirmationModal } =
    useNoticeStore();
  const { role } = useAuthStore();

  const [date, setDate] = useState<Date | string | null>();

  // handle Select date
  const handleSelectDate = (date: Date) => {
    setDate(date);
  };

  // Configuring the columns of the table
  const columns: ColumnsType<INotice> = [
    {
      title: 'Issue Date',
      key: 'issue_date',
      dataIndex: 'Date',
      width: 100,
      fixed: stickyColumn,
      render: (_, noticeItem) => dayjs(noticeItem.issue_date).format('DD-MM-YYYY'),
    },
    {
      title: 'Subject',
      key: 'subject',
      dataIndex: 'subject',
      width: 150,
      render: (_, noticeItem) => noticeItem.subject,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'Status',
      width: 100,
      render: (_, noticeItem) =>
        noticeItem.status ? <StatusBadge status={noticeItem.status} /> : '--',
    },
    {
      title: 'Sent By',
      key: 'sender_id',
      dataIndex: 'sender',
      width: 100,
      render: (_, noticeItem) => (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center items-center"
        >
          {noticeItem.sender && (
            <>
              <PictureOrAvatar
                userData={{ user: { ...noticeItem.sender, is_registered: false } }}
              />
              <span className="ml-5 w-fit overflow-ellipsis text-left">{`${noticeItem.sender.first_name} ${noticeItem.sender.last_name}`}</span>
            </>
          )}
        </div>
      ),
    },
  ];

  if ([userRoles.admin, userRoles.manager].includes(role)) {
    columns.unshift({
      title: 'Pinned?',
      key: 'is_pinned',
      dataIndex: 'is_pinned',
      filters: [{ text: 'is_pinned', value: true }],
      filterSearch: true,
      width: 50,
      render: (_, noticeItem) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setNoticeId(noticeItem.id);
          }}
        >
          <Checkbox
            checked={noticeItem.is_pinned}
            onChange={togglePinningConfirmationModal}
          />
          {noticeItem.is_pinned && (
            <div className="text-xs">
              <span>unpin from:</span>
              <br />
              <span>{dayjs(noticeItem.unpinning_date).format('DD-MM-YYYY')}</span>
            </div>
          )}
        </div>
      ),
    });

    columns.push({
      title: 'Sent to',
      key: 'recipient_ids',
      dataIndex: 'recipient_ids',
      width: 100,
      render: (_, noticeItem) => <AvatarGroup noticeItem={noticeItem} />,
    });
  }

  const tablePaginationConfig = {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
    total: paginationTotal,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  // Open Notice Details page when a row clicked
  const handleRowClick = (record: INotice) => {
    return {
      onClick: () => {
        handleNoticeClose();
        navigate(`notice-details?noticeId=${record.id}`);
        setNoticeId(record.id);
      },
    };
  };

  return (
    <div>
      <Table<INotice>
        className="default-table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={isLoading}
        bordered
        onRow={handleRowClick}
        onChange={(pagination, filters, sorter) => {
          handleTableChange({ pagination, filters, sorter });
        }}
        pagination={tablePaginationConfig}
        scroll={data && data.length === 0 ? undefined : { x: 'max-content' }}
      />
      <PinnedNoticeConfirmation
        date={date ?? null}
        handleConfirmPinned={handleConfirmPinned}
        handleSelectDate={handleSelectDate}
        noticeItem={data?.find((notice) => notice.id === noticeId)}
      />
    </div>
  );
};

export default NoticeTable;
