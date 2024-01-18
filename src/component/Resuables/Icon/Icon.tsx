import { useMemo } from 'react';

import { ReactComponent as IC_Add } from '../../../assets/svgs/ic_add.svg';
import { ReactComponent as IC_Apply } from '../../../assets/svgs/ic_apply.svg';
import { ReactComponent as IC_Attendance } from '../../../assets/svgs/ic_attendance.svg';
import { ReactComponent as IC_Bonus } from '../../../assets/svgs/ic_bonus.svg';
import { ReactComponent as IC_Branch } from '../../../assets/svgs/ic_branch.svg';
import { ReactComponent as IC_Break } from '../../../assets/svgs/ic_break.svg';
import { ReactComponent as IC_Break1 } from '../../../assets/svgs/ic_break1.svg';
import { ReactComponent as IC_Certificate } from '../../../assets/svgs/ic_certificate.svg';
import { ReactComponent as IC_Change } from '../../../assets/svgs/ic_change.svg';
import { ReactComponent as IC_ChooseFile } from '../../../assets/svgs/ic_chooseFile.svg';
import { ReactComponent as IC_Clock } from '../../../assets/svgs/ic_clock.svg';
import { ReactComponent as IC_SidebarEllipse } from '../../../assets/svgs/ic_closeSidebarEllipse.svg';
import { ReactComponent as IC_CreateUser } from '../../../assets/svgs/ic_create_user.svg';
import { ReactComponent as IC_Cross } from '../../../assets/svgs/ic_cross.svg';
import { ReactComponent as IC_Dashboard } from '../../../assets/svgs/ic_dashboard.svg';
import { ReactComponent as IC_Date } from '../../../assets/svgs/ic_date.svg';
import { ReactComponent as IC_Default } from '../../../assets/svgs/ic_default.svg';
import { ReactComponent as IC_Department } from '../../../assets/svgs/ic_department.svg';
import { ReactComponent as IC_Designation } from '../../../assets/svgs/ic_designation.svg';
import { ReactComponent as IC_Documents } from '../../../assets/svgs/ic_documents.svg';
import { ReactComponent as IC_DownCaret } from '../../../assets/svgs/ic_downCaret.svg';
import { ReactComponent as IC_Download } from '../../../assets/svgs/ic_download.svg';
import { ReactComponent as IC_Edit } from '../../../assets/svgs/ic_edit.svg';
import { ReactComponent as IC_Employees } from '../../../assets/svgs/ic_employees.svg';
import { ReactComponent as IC_Entry } from '../../../assets/svgs/ic_entry.svg';
import { ReactComponent as IC_Exit } from '../../../assets/svgs/ic_exit.svg';
import { ReactComponent as IC_Facebook } from '../../../assets/svgs/ic_facebook.svg';
import { ReactComponent as IC_FacebookSm } from '../../../assets/svgs/ic_facebookSm.svg';
import { ReactComponent as IC_Feedback } from '../../../assets/svgs/ic_feedback.svg';
import { ReactComponent as IC_File } from '../../../assets/svgs/ic_file.svg';
import { ReactComponent as IC_History } from '../../../assets/svgs/ic_history.svg';
import { ReactComponent as IC_Instagram } from '../../../assets/svgs/ic_instagram.svg';
import { ReactComponent as IC_Invoice } from '../../../assets/svgs/ic_invoice.svg';
import { ReactComponent as IC_Job } from '../../../assets/svgs/ic_job.svg';
import { ReactComponent as IC_Jpg } from '../../../assets/svgs/ic_jpg.svg';
import { ReactComponent as IC_Leave } from '../../../assets/svgs/ic_leave.svg';
import { ReactComponent as IC_LeaveInfo } from '../../../assets/svgs/ic_leaveInfo.svg';
import { ReactComponent as IC_LeftCaret } from '../../../assets/svgs/ic_leftCaret.svg';
import { ReactComponent as IC_LinkedIn } from '../../../assets/svgs/ic_linkedIn.svg';
import { ReactComponent as IC_LinkedInSm } from '../../../assets/svgs/ic_linkedInSm.svg';
import { ReactComponent as IC_List } from '../../../assets/svgs/ic_list.svg';
import { ReactComponent as IC_Logo } from '../../../assets/svgs/ic_logo.svg';
import { ReactComponent as IC_Notice } from '../../../assets/svgs/ic_notice.svg';
import { ReactComponent as IC_Notification } from '../../../assets/svgs/ic_notification.svg';
import { ReactComponent as IC_NotificationSm } from '../../../assets/svgs/ic_notificationSm.svg';
import { ReactComponent as IC_Open } from '../../../assets/svgs/ic_open.svg';
import { ReactComponent as IC_Payment } from '../../../assets/svgs/ic_paymentMethod.svg';
import { ReactComponent as IC_Payroll } from '../../../assets/svgs/ic_payroll.svg';
import { ReactComponent as IC_PayrollInfo } from '../../../assets/svgs/ic_payroll_info.svg';
import { ReactComponent as IC_Pdf } from '../../../assets/svgs/ic_pdf.svg';
import { ReactComponent as IC_Pencil } from '../../../assets/svgs/ic_pencil.svg';
import { ReactComponent as IC_Plus } from '../../../assets/svgs/ic_plus.svg';
import { ReactComponent as IC_Png } from '../../../assets/svgs/ic_png.svg';
import { ReactComponent as IC_RightCaret } from '../../../assets/svgs/ic_rightCaret.svg';
import { ReactComponent as IC_Role } from '../../../assets/svgs/ic_role.svg';
import { ReactComponent as IC_Salary_Info } from '../../../assets/svgs/ic_salary_info.svg';
import { ReactComponent as IC_Save } from '../../../assets/svgs/ic_save.svg';
import { ReactComponent as IC_Search } from '../../../assets/svgs/ic_search.svg';
import { ReactComponent as IC_SearchSm } from '../../../assets/svgs/ic_searchSm.svg';
import { ReactComponent as IC_Send } from '../../../assets/svgs/ic_send.svg';
import { ReactComponent as IC_SidebarMenu } from '../../../assets/svgs/ic_sidebarMenu.svg';
import { ReactComponent as IC_Social } from '../../../assets/svgs/ic_social.svg';
import { ReactComponent as IC_Table1 } from '../../../assets/svgs/ic_table1.svg';
import { ReactComponent as IC_TableMenu } from '../../../assets/svgs/ic_tablemenu.svg';
import { ReactComponent as IC_Teammate } from '../../../assets/svgs/ic_teammate.svg';
import { ReactComponent as IC_Teams } from '../../../assets/svgs/ic_teams.svg';
import { ReactComponent as IC_Trash } from '../../../assets/svgs/ic_trash.svg';
import { ReactComponent as IC_Twitter } from '../../../assets/svgs/ic_twitter.svg';
import { ReactComponent as IC_TwitterSm } from '../../../assets/svgs/ic_twitterSm.svg';
import { ReactComponent as IC_Update } from '../../../assets/svgs/ic_update.svg';
import { ReactComponent as IC_Upload } from '../../../assets/svgs/ic_upload.svg';
import { ReactComponent as IC_UploadFile } from '../../../assets/svgs/ic_uploadFile.svg';
import { ReactComponent as IC_UserAdd } from '../../../assets/svgs/ic_user_add.svg';
import { ReactComponent as IC_User_Role } from '../../../assets/svgs/ic_user_role.svg';

export default function Icon({
  size,
  name,
  color,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  const IconComponent: any = useMemo(() => {
    switch (name) {
      case 'ic_add':
        return IC_Add;
      case 'ic_break':
        return IC_Break;
      case 'ic_dashboard':
        return IC_Dashboard;
      case 'ic_attendance':
        return IC_Attendance;
      case 'ic_leave':
        return IC_Leave;
      case 'ic_payroll':
        return IC_Payroll;
      case 'ic_downCaret':
        return IC_DownCaret;
      case 'ic_closeSidebarEllipse':
        return IC_SidebarEllipse;
      case 'ic_entry':
        return IC_Entry;
      case 'ic_exit':
        return IC_Exit;
      case 'ic_history':
        return IC_History;
      case 'ic_leaveInfo':
        return IC_LeaveInfo;
      case 'ic_apply':
        return IC_Apply;
      case 'ic_search':
        return IC_Search;
      case 'ic_notification':
        return IC_Notification;
      case 'ic_date':
        return IC_Date;
      case 'ic_clock':
        return IC_Clock;
      case 'ic_file':
        return IC_File;
      case 'ic_upload':
        return IC_Upload;
      case 'ic_table1':
        return IC_Table1;
      case 'ic_leftCaret':
        return IC_LeftCaret;
      case 'ic_rightCaret':
        return IC_RightCaret;
      case 'ic_break1':
        return IC_Break1;
      case 'ic_list':
        return IC_List;
      case 'ic_edit':
        return IC_Edit;
      case 'ic_payment':
        return IC_Payment;
      case 'ic_facebook':
        return IC_Facebook;
      case 'ic_linkedIn':
        return IC_LinkedIn;
      case 'ic_twitter':
        return IC_Twitter;
      case 'ic_instagram':
        return IC_Instagram;
      case 'ic_pencil':
        return IC_Pencil;
      case 'ic_plus':
        return IC_Plus;
      case 'ic_pdf':
        return IC_Pdf;
      case 'ic_png':
        return IC_Png;
      case 'ic_jpg':
        return IC_Jpg;
      case 'ic_save':
        return IC_Save;
      case 'ic_cross':
        return IC_Cross;
      case 'ic_tablemenu':
        return IC_TableMenu;
      case 'ic_logo':
        return IC_Logo;
      case 'ic_searchSm':
        return IC_SearchSm;
      case 'ic_sidebarMenu':
        return IC_SidebarMenu;
      case 'ic_notificationSm':
        return IC_NotificationSm;
      case 'ic_facebookSm':
        return IC_FacebookSm;
      case 'ic_linkedInSm':
        return IC_LinkedInSm;
      case 'ic_twitterSm':
        return IC_TwitterSm;
      case 'ic_trash':
        return IC_Trash;
      case 'ic_chooseFile':
        return IC_ChooseFile;
      case 'ic_uploadFile':
        return IC_UploadFile;
      case 'ic_update':
        return IC_Update;
      case 'ic_create_user':
        return IC_CreateUser;
      case 'ic_branch':
        return IC_Branch;
      case 'ic_teams':
        return IC_Teams;
      case 'ic_teammate':
        return IC_Teammate;
      case 'ic_role':
        return IC_Role;
      case 'ic_user_role':
        return IC_User_Role;
      case 'ic_department':
        return IC_Department;
      case 'ic_social':
        return IC_Social;
      case 'ic_designation':
        return IC_Designation;
      case 'ic_documents':
        return IC_Documents;
      case 'ic_user_add':
        return IC_UserAdd;
      case 'ic_job':
        return IC_Job;
      case 'ic_open':
        return IC_Open;
      case 'ic_change':
        return IC_Change;
      case 'ic_payroll_info':
        return IC_PayrollInfo;
      case 'ic_bonus':
        return IC_Bonus;
      case 'ic_feedback':
        return IC_Feedback;
      case 'ic_salary_info':
        return IC_Salary_Info;
      case 'ic_download':
        return IC_Download;
      case 'ic_certificate':
        return IC_Certificate;
      case 'ic_invoice':
        return IC_Invoice;
      case 'ic_send':
        return IC_Send;
      case 'ic_notice':
        return IC_Notice;
      case 'ic_employees':
        return IC_Employees;
      default:
        return IC_Default;
    }
  }, [name]);

  return <IconComponent stroke={color} width={size} height={size} />;
}
