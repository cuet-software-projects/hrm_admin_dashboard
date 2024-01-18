import { IUser, SALARY_CERTIFICATE_STATUS_TYPE } from '.';

export type ISalaryCertificate = {
  id: string;
  created_at?: string;
  updated_at?: string;
  reason: string;
  issue_date: string;
  user_id: string;
  user: IUser;
  status?: SALARY_CERTIFICATE_STATUS_TYPE;
  current_salary: number;
  current_designation: string;
};

export type ILastApprovedSalaryCertificate = ISalaryCertificate | null;
