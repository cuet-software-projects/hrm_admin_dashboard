import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import InvoiceService from '../../../service/invoice.service';
import { PaginationQueryParams } from '../../../types';

export function useGetInvoiceListOfUser({
  page = 1,
  limit = 10,
  sorts,
  includes,
  filters,
  search,
}: PaginationQueryParams) {
  return useQuery({
    queryKey: [QUERY_KEYS.INVOICE_LISTS, page, limit, sorts, includes, filters, search],
    queryFn: () =>
      InvoiceService.getInvoicesOfAllUsers({
        page,
        limit,
        sorts,
        includes,
        filters,
        search,
      }),
  });
}
