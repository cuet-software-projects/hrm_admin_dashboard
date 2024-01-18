import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import InvoiceService from '../../../service/invoice.service';

export function useGetInvoiceListAll() {
  return useQuery({
    queryKey: [QUERY_KEYS.INVOICE_LIST_ALL],
    queryFn: () => InvoiceService.getAllInvoices(),
  });
}
