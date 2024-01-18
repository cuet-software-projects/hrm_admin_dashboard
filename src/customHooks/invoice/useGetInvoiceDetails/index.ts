/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/app-constants';
import InvoiceService from '../../../service/invoice.service';
import { IInvoice } from '../../../types/invoice.type';

export function useGetInvoiceDetails({ invoiceId }: { invoiceId?: IInvoice['id'] }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.INVOICE_DETAILS, invoiceId],
    queryFn: () => InvoiceService.getInvoiceDetails(invoiceId!),
    enabled: !!invoiceId,
  });
  return {
    ...query,
    isLoading: query.isLoading && !!invoiceId,
  };
}
