import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';

import { salaryStructure, userRoles } from '../../constants/GlobalConstants';
import { DepartmentSchemaType } from '../../schema/DepartmentSchema';
import { InvoiceSchemaType } from '../../schema/InvoiceSchema';
import {
  AttendanceChartDataPoint,
  IAttendance,
  IDepartment,
  INVOICE_STATUS_TYPE,
  IUser,
} from '../../types';
import { IRoutes } from '../../types/route.type';

// Types required for the functions
export type FormValues = Record<string, any>;

export class Utils {
  static filterRoutes(routes: IRoutes[], role: string): IRoutes[] {
    return routes
      .map((route: IRoutes) => {
        if (route.children) {
          const filteredChildren = Utils.filterRoutes(route.children, role);
          return { ...route, children: filteredChildren };
        }
        return route;
      })
      .filter((route) => route.accessibleBy?.includes(role));
  }
  stringTruncate = (str: string, n: number): string => {
    return str.length > n ? str.substring(0, n - 1) + ' ....' : str;
  };
  isDefined = (object: { [key: string]: any }, property: any = null) => {
    if (property === null) {
      return typeof object !== 'undefined';
    }

    return (
      typeof object !== 'undefined' && object && typeof object[property] !== 'undefined'
    );
  };
  getObjectById = (
    id: string,
    dataArray: IDepartment[],
  ): DepartmentSchemaType | undefined => {
    return dataArray.find((obj) => obj.id === id) as DepartmentSchemaType;
  };
  findChangedFields = <T extends FormValues>({
    currentValues,
    initialValues,
  }: {
    currentValues: T;
    initialValues: T;
  }) => {
    const changedFields: Partial<T> = {};

    for (const key in currentValues) {
      if (key in currentValues && currentValues[key] !== initialValues[key]) {
        changedFields[key] = currentValues[key];
      }
    }
    return changedFields;
  };

  giveActiveIndicesForSidebar({
    menuItems,
    arrayOfPaths,
  }: {
    menuItems: IRoutes[];
    arrayOfPaths: string[];
  }): { parentIndex: number; childIndex: number } {
    const itemsWithNavTitle = menuItems.filter(
      (menuItem) => menuItem.navTitle && menuItem.navTitle?.length > 0,
    );
    const arrayOfNonEmptyPaths = arrayOfPaths.filter((path) => path.length > 0);
    const parentIndex = itemsWithNavTitle.findIndex(
      (item) => item.path?.toLowerCase() === arrayOfNonEmptyPaths[0],
    );
    const parentItem = itemsWithNavTitle[parentIndex];
    const childIndex = parentItem.children?.findIndex(
      (childItem) => childItem.path.toLocaleLowerCase() === arrayOfNonEmptyPaths[1],
    );
    return { parentIndex: parentIndex, childIndex: childIndex ? childIndex : 0 };
  }
  arraysAreEqual = ({ arr1, arr2 }: { arr1: string[]; arr2: string[] }): boolean =>
    arr1.length === arr2.length && arr1.every((item) => arr2.includes(item));

  calculateAvgMark = ({ attendanceData }: { attendanceData: IAttendance[] }): number => {
    const totalValidEntries = attendanceData.reduce((total, current) => {
      if (current.markings) {
        return total + current.markings;
      }
      return total;
    }, 0);

    const totalValidEntriesCount = attendanceData.filter(
      (item) => item.markings !== null,
    ).length;

    if (totalValidEntriesCount === 0) {
      return 0; // To avoid division by zero
    }

    const avgMark = totalValidEntries / totalValidEntriesCount;

    return parseFloat(avgMark.toFixed(2));
  };

  // This is for building filtering string for api call
  createFilterString(filters: Record<string, any>): string {
    return Object.entries(filters).reduce((acc, [key, val]) => {
      acc += `&filters[${key}]=${val ? val?.join(',') : ''}`;
      return acc;
    }, '');
  }

  // Give salary breakdown
  getSalaryBreakdown(salary: number): Record<string, string> {
    const basicSalary = salary * (salaryStructure.basic / 100);
    const houseRent = salary * (salaryStructure.houserRent / 100);
    const medical = salary * (salaryStructure.medical / 100);
    const convenience = salary * (salaryStructure.convenience / 100);
    const allowance = houseRent + medical;
    return {
      'Basic Salary': `BDT ${basicSalary}`,
      Allowance: `BDT ${allowance}`,
      'Extra Benefits': `BDT ${convenience}`,
      'Gross Total Salary': `BDT ${basicSalary + allowance + convenience}`,
    };
  }

  // Format the obtained data point for attendance chart
  formatAttendanceChartData(data: IAttendance[]): AttendanceChartDataPoint[] {
    const result: AttendanceChartDataPoint[] = [];

    for (let i = 0; i < 7; i++) {
      const entry = data[i];

      const dataPoint: AttendanceChartDataPoint = {
        name: `Day ${i + 1}`,
        mark: entry?.markings ?? null,
        date: entry?.created_at ?? null,
      };

      result.push(dataPoint);
    }

    return result;
  }

  // This is for calculating working hours of an employee
  calculateWorkingHours({
    entryTime,
    exitTime,
    breakDurationHours = 0,
  }: {
    entryTime: Date;
    exitTime: Date;
    breakDurationHours?: number;
  }): { hours: number; minutes: number } {
    const totalMinutesInDay = 24 * 60;

    const entryMinutes = dayjs(entryTime).hour() * 60 + dayjs(entryTime).minute();
    const exitMinutes = dayjs(exitTime).hour() * 60 + dayjs(exitTime).minute();

    let workingMinutes = exitMinutes - entryMinutes - breakDurationHours * 60;

    if (exitMinutes < entryMinutes) {
      workingMinutes += totalMinutesInDay;
    }

    const workingHours = Math.floor(workingMinutes / 60);
    const remainingMinutes = workingMinutes % 60;

    return { hours: workingHours, minutes: remainingMinutes };
  }

  // This is for checking whether the URL is valid or not
  isValidUrl(url: string | undefined) {
    if (!url) return false;
    const pattern = new RegExp(
      '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i',
    );
    return pattern.test(url);
  }

  // For getting modified file name
  getModifiedFileName = ({
    activeFileName,
    attributeName,
  }: {
    activeFileName: string;
    attributeName?: string;
  }): string => {
    return attributeName
      ? `${activeFileName.split('.')[0]}-${attributeName}.${activeFileName.split('.')[1]}`
      : activeFileName;
  };

  // Combine date and time and then get ISO string
  combineDateTimeToISO(date: Date | null, time: Date | null): string {
    if (date === null && time === null) {
      // If both date and time are null, return today's ISO string
      return dayjs().toISOString();
    }

    let combinedDateTime = dayjs(date || undefined);

    if (time !== null) {
      combinedDateTime = combinedDateTime
        .hour(dayjs(time).hour())
        .minute(dayjs(time).minute())
        .second(dayjs(time).second());
    }

    return combinedDateTime.toISOString();
  }

  // Calculate the invoices amounts
  getInvoiceCalculations = ({
    invoiceValues,
  }: {
    invoiceValues: InvoiceSchemaType;
  }): {
    subTotal: number;
    tax: number;
    total: number;
    amountPaid: number;
    amountDue: number;
  } => {
    const { invoice_items, tax_percentage, discount, discount_type, amount_paid } =
      invoiceValues;

    const subTotal = invoice_items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    let discountedAmount = 0;

    if (discount && discount_type) {
      discountedAmount =
        discount_type === 'PERCENTAGE' ? (subTotal * discount) / 100 : discount;
    }

    const tax = (subTotal * (tax_percentage ?? 0)) / 100;

    const total = subTotal - discountedAmount + tax;

    const amountPaid = amount_paid || 0;
    const amountDue = total - amountPaid;

    return {
      subTotal,
      tax,
      total,
      amountPaid,
      amountDue,
    };
  };

  // Find error situation of invoice form submission
  // if error return true; if not error return false
  invoiceUnusualScenario = ({
    invoiceValues,
  }: {
    invoiceValues: InvoiceSchemaType;
  }): boolean => {
    const { amountDue, total } = this.getInvoiceCalculations({ invoiceValues });

    const invoiceStatus = invoiceValues.status as INVOICE_STATUS_TYPE;

    switch (invoiceStatus) {
      case 'PAID':
        if (amountDue === 0) {
          return false;
        }
        message.warning('Status cant be PAID when there is due!', 3);
        return true;

      case 'PARTIALLY_PAID':
        if (invoiceValues.amount_paid && invoiceValues.amount_paid < total) {
          return false;
        }
        message.warning(
          'Status cant be PARTIALLY_PAID when amount paid is not less than total!',
          3,
        );
        return true;
    }

    return false;
  };

  // This function will return true if a user has client role only
  hasClientRoleOnly = ({ userData }: { userData: IUser }) => {
    return userData.roles?.length === 1 && userData.roles[0].name === userRoles.client;
  };

  // When an option is searched in select component
  onFilterOption = (input: string, option?: DefaultOptionType) => {
    return !!option?.label?.toString().toLowerCase().includes(input.toLowerCase());
  };
}

export const utils = new Utils();
