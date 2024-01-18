import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useMemo, useState } from 'react';

import { newDatesFirst } from '../../constants/api';
import { useGetSalaryCertificates } from '../../customHooks/salaryCertificates/useGetSalaryCertificates';
import { AntdTableHelpers } from '../../helpers/utility/antdTableHelpers';
import DocuemntApplyService from '../../service/documentApplyService';
import { PaginationQueryParams, SALARY_CERTIFICATE_STATUS_TYPE } from '../../types';
import { ISalaryCertificate } from '../../types/salary-certificate.type';
import SalaryCertificateTableForAdmin from '../VisualizationComponents/Tables/SalaryCertificateTable/SalaryCertificateTableForAdmin';

const SalaryCertificate = () => {
  // Setting the initial page configuration
  const initialPageState: PaginationQueryParams = {
    limit: 10,
    page: 1,
    filters: {},
    includes: '',
    search: '',
    sorts: '',
  };

  const [queryParams, setQueryParams] = useState<PaginationQueryParams>(initialPageState);

  const { data, isLoading, error, refetch } = useGetSalaryCertificates({
    ...queryParams,
    includes: 'user',
    sorts: newDatesFirst,
  });

  const totalCount = useMemo(() => {
    return data?.meta?.totalItems || 0;
  }, [data?.meta]);

  // Change the table data status
  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: {
    pagination: TablePaginationConfig;
    filters: Record<string, FilterValue | null>;
    sorter: SorterResult<ISalaryCertificate> | SorterResult<ISalaryCertificate>[];
  }) => {
    setQueryParams({
      page: pagination.current ?? 1,
      limit: pagination.pageSize ?? 10,
      filters: filters,
      sorts: AntdTableHelpers.parseTableSorts<ISalaryCertificate>(sorter),
    });
  };

  // This function is executed when the admin choses a status of salary certificate
  const handleChangeSalaryCertificateStatus = async ({
    salaryCertificateItem,
    statusValue,
  }: {
    salaryCertificateItem: ISalaryCertificate;
    statusValue: SALARY_CERTIFICATE_STATUS_TYPE;
  }) => {
    try {
      await DocuemntApplyService.updateSalaryCertificateStatus({
        salaryCertificateId: salaryCertificateItem.id,
        statusUpdateData: {
          status: statusValue,
        },
      });
      refetch();
    } catch (e) {
      //
    }
  };

  return (
    <div className="border border-grey-1 border-opacity-10 bg-white-1 py-8 px-4 rounded-lg">
      <SalaryCertificateTableForAdmin
        data={data?.data || []}
        isLoading={isLoading}
        error={error}
        paginationTotal={totalCount}
        handleTableChange={handleTableChange}
        onChangeSalaryCertificateStatus={handleChangeSalaryCertificateStatus}
      />
    </div>
  );
};

export default SalaryCertificate;
