import { EditFilled } from '@ant-design/icons';
import { FloatButton, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { userRoles } from '../../constants/GlobalConstants';
import useGetNoticeList from '../../customHooks/notices/useGetNoticeList';
import useGetNoticeListOfUser from '../../customHooks/notices/useGetNoticeListOfUser';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import NoticeService from '../../service/notice.service';
import useAuthStore from '../../store/authStore';
import useNoticeStore from '../../store/noticeStore';
import useSidebarStore from '../../store/sidebarStore/sidebarStore';
import { PaginationQueryParams } from '../../types';
import { INotice, NoticePinningPayloadType } from '../../types/notice.type';
import FilterButton from '../Resuables/Button/FilterButton';
import Searchbar from '../Resuables/Searchbar';
import NoticeTable from '../VisualizationComponents/Tables/NoticeTable';
import NoticeComposer from './NoticeComposer';

const Notice = () => {
  const {
    isOpenNoticeModal,
    togglePinningConfirmationModal,
    handleSelectSizingMode,
    handleNoticeOpenMode,
    togglePinningLoading,
  } = useNoticeStore();
  const { role, userProfileData } = useAuthStore();
  const { isDropdownSmClicked } = useSidebarStore();
  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    page: 1,
    limit: 10,
    filters: {},
    includes: '',
    search: '',
    sorts: '',
  };

  // Query params state
  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  // fetch notices
  const {
    data: noticeData,
    isLoading,
    error,
    refetch,
  } = role === userRoles.admin || role === userRoles.manager
    ? useGetNoticeList({
        ...queryParams,
        includes: 'sender,recipients.recipient',
        sorts: '-issue_date',
      })
    : useGetNoticeListOfUser({
        ...queryParams,
        filters: { status: ['SENT'] },
        userId: userProfileData?.id ?? '',
        sorts: '-issue_date',
      });

  const totalCount = useMemo(() => {
    return noticeData?.meta?.totalItems ?? 0;
  }, [noticeData?.meta]);

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<INotice> | SorterResult<INotice>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<INotice>(sorter),
    });
  };

  // Open the notice form
  const handleOpenNoticeForm = () => {
    handleNoticeOpenMode('create');
    handleSelectSizingMode('default');
  };

  // On confirm pinned notice
  const handleConfimPinned = async ({
    noticeId,
    payload,
  }: {
    noticeId: INotice['id'];
    payload: NoticePinningPayloadType;
  }) => {
    try {
      togglePinningLoading();
      await NoticeService.makeNoticePinned({ noticeId, payload });
      refetch?.();
      togglePinningConfirmationModal();
      togglePinningLoading();
    } catch (error) {
      togglePinningLoading();
    }
  };

  return (
    <div>
      <div className="space-y-8">
        <div className="flex items-center justify-start lg:justify-end space-x-4">
          {role !== userRoles.user && (
            <div className="w-full lg:w-72">
              <Searchbar />
            </div>
          )}
          <FilterButton />
        </div>

        <NoticeTable
          data={noticeData?.data}
          isLoading={isLoading}
          error={error}
          handleTableChange={handleTableChange}
          handleConfirmPinned={handleConfimPinned}
          paginationTotal={totalCount}
        />
      </div>

      {!isDropdownSmClicked &&
        !isOpenNoticeModal &&
        (role === userRoles.admin || role === userRoles.manager) && (
          <FloatButton
            onClick={handleOpenNoticeForm}
            description={
              <p className="text-lg px-3 py-2">
                <EditFilled rev={''} className="mr-2" />
                <span>Compose</span>
              </p>
            }
            shape="square"
            className="w-fit"
            type="primary"
            style={{ right: 30, bottom: 15 }}
          />
        )}
      {isOpenNoticeModal && <NoticeComposer refetchNotices={refetch} />}
    </div>
  );
};

export default Notice;
