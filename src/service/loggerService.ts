import { getEnvironmentName } from '../helpers/configs/envConfig';

export interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

/** Basic logger interface */
export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
  table: LogFn;
}

/** Log levels */
export type LogLevel = 'log' | 'warn' | 'error';

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;
  readonly table: LogFn;

  constructor(options?: { environment?: string }) {
    const { environment } = options || {};

    if (environment === 'production') {
      this.warn = NO_OP;
      this.log = NO_OP;
      this.error = NO_OP;
      this.table = NO_OP;
      return;
    }

    this.error = console.error.bind(console);
    this.warn = console.warn.bind(console);
    this.table = console.table.bind(console);
    this.log = console.log.bind(console);
  }
}

export const logger = new ConsoleLogger({ environment: getEnvironmentName() });
