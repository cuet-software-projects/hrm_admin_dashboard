import { FilterValue, SorterResult } from 'antd/es/table/interface';

export class AntdTableHelpers {
  public static parseTableFilters(filters: Record<string, FilterValue | null>): string {
    return Object.entries(filters).reduce((acc, [key, val]) => {
      acc += `&filter[${key}]=${val ? val?.join(',') : ''}`;
      return acc;
    }, '');
  }

  public static parseTableSorts<T>(
    sorter: SorterResult<T> | SorterResult<T>[] | undefined,
  ): string {
    if (
      !sorter ||
      (Array.isArray(sorter) && sorter.length === 0) ||
      Object.keys(sorter).length === 0
    ) {
      return '';
    }

    if (Array.isArray(sorter)) {
      const validSorters = sorter.filter((s): s is SorterResult<T> => !!s.order);
      return validSorters
        .map((s) => (s.order === 'ascend' ? s.field : `-${s.field}`))
        .join(',');
    }

    if (!sorter.order) return '';

    return sorter.order === 'ascend'
      ? `${sorter.field || ''}`
      : `-${sorter?.field || ''}`;
  }
}

export function modifyFilterString(queryString?: string): string | undefined {
  if (!queryString) return queryString;
  const params = new URLSearchParams(queryString);
  const DateValue = params.get('filters[date]');
  // Remove the date parameter
  params.delete('filters[date]');
  if (DateValue) {
    const [startDate, endDate] = DateValue.split(',');
    // Add the new parameters
    params.set('filters[start_date]', startDate || '');
    params.set('filters[end_date]', endDate || '');
  }
  const modifiedQueryString = params.toString();
  return modifiedQueryString ? '&' + modifiedQueryString : '';
}
