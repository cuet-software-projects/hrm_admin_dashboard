import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { ErrorMessage, useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../schema/NoticeSchema';
import useNoticeStore from '../../../../store/noticeStore';
import CustomDatePicker from '../../../Resuables/CustomDatePicker';
import NoticeCloseButton from './NoticeCloseButton';
import NoticeDefaultModeButton from './NoticeDefaultModeButton';
import NoticeMaximizedModeButton from './NoticeMaximizedModeButton';
import NoticeMinimizedModeButton from './NoticeMinimizedModeButton';

const { Title } = Typography;

const NoticeComposerHeader = () => {
  const { sizingMode: openMode } = useNoticeStore();

  const { setFieldValue, values } = useFormikContext<NoticeSchemaType>();

  const handleSelectDate = (date: Date) => {
    setFieldValue('issue_date', date);
  };

  return (
    <div className="flex justify-between items-center flex-wrap bg-grey-1 bg-opacity-10 p-3 rounded-t-lg notice-composer-header">
      <Flex justify="space-between" align="center" gap={4}>
        <Title className="hidden lg:block" level={5} style={{ margin: 0 }}>
          New Notice
        </Title>
        {openMode !== 'minimized' && (
          <div>
            <CustomDatePicker
              value={values.issue_date ? dayjs(values.issue_date) : null}
              selectedDate={
                values.issue_date.length > 0 ? dayjs(values.issue_date).toDate() : null
              }
              onChangeDate={handleSelectDate}
              placeholderText="Issue Date"
            />
            <ErrorMessage component="div" name="issue_date" className="error" />
          </div>
        )}
      </Flex>
      <Flex>
        <Flex className="hidden lg:flex">
          {/* Default (^) button will be shown when noice composer is minimized */}
          {openMode === 'minimized' && <NoticeDefaultModeButton />}
          {/* Minimizer (-) button will not be shown in minimized mode*/}
          {openMode !== 'minimized' && <NoticeMinimizedModeButton />}
          {/* Fullscreen open will be shown at default mode
            Fullscreen close will be shown at maximized mode  */}
          <NoticeMaximizedModeButton />
        </Flex>
        {/* Close button shown all the time */}
        <NoticeCloseButton />
      </Flex>
    </div>
  );
};

export default NoticeComposerHeader;
