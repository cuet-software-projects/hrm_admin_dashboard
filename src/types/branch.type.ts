import { BRANCH_CODE_TYPE } from '.';

export type IBranch = {
  id: string;
  name: string;
  code: BRANCH_CODE_TYPE;
  address?: string;
};
