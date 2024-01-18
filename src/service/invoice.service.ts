import { INVOICES, newDatesFirst } from '../constants/api';
import { apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { utils } from '../helpers/utility';
import { InvoiceSchemaType } from '../schema/InvoiceSchema';
import { PaginateResponse, PaginationQueryParams, ResponseSuccess } from '../types';
import { IInvoice } from '../types/invoice.type';

export default class InvoiceService {
  // Get all invoices
  static async getAllInvoices(): Promise<IInvoice[]> {
    try {
      const invoiceResponse = await apiGet<ResponseSuccess<IInvoice[]>>({
        apiPath: `${INVOICES}/all`,
      });
      return Promise.resolve(invoiceResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get paginated invoices of all invoices
  static async getInvoicesOfAllUsers({
    page,
    limit,
    sorts = newDatesFirst,
    includes = 'user',
    filters,
    search = '',
  }: PaginationQueryParams): Promise<PaginateResponse<IInvoice>> {
    try {
      const invoiceResponse = await apiGet<PaginateResponse<IInvoice>>({
        apiPath: `${INVOICES}?&page=${page}&limit=${limit}&sorts=${sorts}&includes=${includes}${
          filters ? utils.createFilterString(filters) : ''
        }&search=${search}`,
      });
      return Promise.resolve(invoiceResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Get the details of a single invoice
  static async getInvoiceDetails(id: IInvoice['id']): Promise<IInvoice> {
    try {
      const invoiceResponse = await apiGet<ResponseSuccess<IInvoice>>({
        apiPath: `${INVOICES}/${id}`,
      });
      return Promise.resolve(invoiceResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }

  // Create invoice for a user
  static async createInvoice({
    invoiceData,
  }: {
    invoiceData: InvoiceSchemaType;
  }): Promise<void> {
    try {
      await apiPost({
        apiPath: `${INVOICES}`,
        data: invoiceData,
      });
      SuccessHandler.handle('Successfully created.');
    } catch (error) {
      return Promise.reject();
    }
  }

  // Update an invoice
  static async updateInvoice({
    invoiceId,
    invoiceUpdateData,
  }: {
    invoiceId: IInvoice['id'];
    invoiceUpdateData: InvoiceSchemaType;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${INVOICES}/${invoiceId}`,
        data: invoiceUpdateData,
      });
      SuccessHandler.handle('Successfully updated.');
    } catch (error) {
      return Promise.reject();
    }
  }
}
