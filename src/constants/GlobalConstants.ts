import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

export const DOTS = -1;
export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const months = dayjs.months();
export const userRoles = {
  admin: 'admin',
  manager: 'manager',
  user: 'user',
  client: 'client',
};
export const totalPaidLeaves = 15;

export const shortMonthsForEconomicYear = dayjs
  .monthsShort()
  .slice(6, 12)
  .concat(dayjs.monthsShort().slice(0, 6)); // It starts from "Jul" ["Jul", ...., "Jun"]

// Salary structure
export const salaryStructure = {
  basic: 60,
  houserRent: 30,
  medical: 5,
  convenience: 5,
};

// pdf file names
export const salaryCertificatePdfName = 'Salary Certificate.pdf';
export const invoicePdfName = 'invoice.pdf';

// Date Formats
export const defaultBackendDateFormate = 'YYYY-MM-DD';

// Social media links of diligite
export const facebookLink = 'https://www.facebook.com/diligiteBD';
export const linkedinLink = 'https://www.linkedin.com/company/diligite/mycompany';
export const twitterLink = '';

// Slack channel links
export const slack_hrm_channel_link = 'https://diligitebd.slack.com/archives/C0667B7685P';
