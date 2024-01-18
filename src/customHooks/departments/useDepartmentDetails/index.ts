/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import DepartmentService from '../../../service/department.service';
import { IDepartment } from '../../../types';

export function useDepartmentDetails({
  departmentId,
}: {
  departmentId?: IDepartment['id'] | null;
}) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.DEPARTMENT_DETAILS, departmentId],
    queryFn: () => DepartmentService.getDepartmentDetails(departmentId!),
    enabled: !!departmentId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!departmentId,
  };
}
