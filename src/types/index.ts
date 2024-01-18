import {
  BONUS_VALUES,
  BRANCH_CODE,
  EMPLOYEE_PROMOTION_REASON_VALUES,
  FEEDBACK_VALUES,
  INVOICE_DISCOUNT_TYPE_VALUES,
  INVOICE_STATUS_VALUES,
  LEAVE_STATUS_VALUE,
  LEAVE_TYPE_VALUES,
  NOTICE_STATUS_VALUES,
  PAYROLL_VALUES,
  RELIGION,
  SALARY_CERTIFICATE_STATUS_VALUES,
  TSHIRT,
  USER_CURRENT_STATUS_VALUES,
  USER_GENDER,
  USER_MARITAL_STATUS,
  WORK_TYPE,
} from './values';

export * from './attendance.type';
export * from './branch.type';
export * from './department.type';
export * from './designation.type';
export * from './team.type';
export * from './user.type';

export type USER_GENDER_TYPE = (typeof USER_GENDER)[number];

export type USER_MARITAL_STATUS_TYPE = (typeof USER_MARITAL_STATUS)[number];

export type RELIGION_TYPE = (typeof RELIGION)[number];

export type USER_CURRENT_STATUS_TYPE = (typeof USER_CURRENT_STATUS_VALUES)[number];

export type PAYROLL_TYPE = (typeof PAYROLL_VALUES)[number];

export type LEAVE_TYPE = (typeof LEAVE_TYPE_VALUES)[number];

export type LEAVE_STATUS_TYPE = (typeof LEAVE_STATUS_VALUE)[number];

export type BONUS_TYPE = (typeof BONUS_VALUES)[number];

export type TSHIRT_TYPE = (typeof TSHIRT)[number];

export type EMPLOYEE_WORK_TYPE = (typeof WORK_TYPE)[number];

export type BRANCH_CODE_TYPE = (typeof BRANCH_CODE)[number];

export type FEEDBACK_TYPE = (typeof FEEDBACK_VALUES)[number];

export type SALARY_CERTIFICATE_STATUS_TYPE =
  (typeof SALARY_CERTIFICATE_STATUS_VALUES)[number];

export type INVOICE_STATUS_TYPE = (typeof INVOICE_STATUS_VALUES)[number];
export type INVOICE_DISCOUNT_TYPE = (typeof INVOICE_DISCOUNT_TYPE_VALUES)[number];

export type EMPLOYEE_PROMOTION_REASON_TYPE =
  (typeof EMPLOYEE_PROMOTION_REASON_VALUES)[number];

export type NOTICE_STATUS_TYPE = (typeof NOTICE_STATUS_VALUES)[number];

export interface PaginateResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  };
}

export interface ResponseSuccess<T> {
  message: string;
  data: T;
}

export interface ResponseError {
  message: string;
  statusCode: number;
}
export type PaginationQueryParams = {
  filters?: Record<string, any>;
  fields?: string;
  sorts?: string;
  search?: string;
  includes?: string;
  page: number;
  limit: number;
  offset?: number;
};

// for leave overview
export interface LeaveOverview {
  CASUAL: number;
  SICK: number;
}

// pdf file name configuration
export type PdfFileNameConfig = {
  slideNo: number;
  pdfName: string;
};
