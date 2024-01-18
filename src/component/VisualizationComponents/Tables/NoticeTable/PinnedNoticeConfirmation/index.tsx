import { Flex, Modal, Typography } from 'antd';
import dayjs from 'dayjs';

import useNoticeStore from '../../../../../store/noticeStore';
import { INotice, NoticePinningPayloadType } from '../../../../../types/notice.type';
import Button from '../../../../Resuables/Button/Button';
import CustomDatePicker from '../../../../Resuables/CustomDatePicker';

interface props {
  noticeItem: INotice | undefined;
  date: Date | string | null;
  handleConfirmPinned: ({
    noticeId,
    payload,
  }: {
    noticeId: INotice['id'];
    payload: NoticePinningPayloadType;
  }) => void;
  handleSelectDate: (date: Date) => void;
}

const PinnedNoticeConfirmation: React.FC<props> = ({
  noticeItem,
  date,
  handleConfirmPinned,
  handleSelectDate,
}) => {
  const {
    isPinningConfirmationModalOpen,
    isPinningLoading,
    togglePinningConfirmationModal,
  } = useNoticeStore();

  return (
    <Modal
      centered
      open={isPinningConfirmationModalOpen}
      footer={null}
      closable={true}
      onCancel={togglePinningConfirmationModal}
    >
      <Flex vertical gap={15} className="mt-5">
        <div className="text-center">
          <Typography.Title level={3}>
            {noticeItem && !noticeItem.is_pinned
              ? 'Are you sure to make it pinned?'
              : 'Are you sure to make it unpinned?'}
          </Typography.Title>
          <Typography.Paragraph className="text-lg">
            {noticeItem &&
              !noticeItem.is_pinned &&
              'If you are sure, choose a unpinning date. N.B. The notice will be automatically unpinnned from that date.'}
          </Typography.Paragraph>
        </div>
        <Flex vertical gap={10} className="w-fit mx-auto">
          {noticeItem && !noticeItem.is_pinned && (
            <CustomDatePicker
              className="z-50"
              placement="bottomRight"
              allowClear={false}
              selectedDate={date ?? null}
              onChangeDate={handleSelectDate}
            />
          )}
          <Button
            isLoading={isPinningLoading}
            className="flex justify-center"
            onClick={() => {
              handleConfirmPinned({
                noticeId: `${noticeItem?.id}`,
                payload:
                  noticeItem && noticeItem.is_pinned
                    ? { is_pinned: !noticeItem.is_pinned }
                    : {
                        is_pinned: !noticeItem?.is_pinned,
                        unpinning_date: dayjs(date).toDate(),
                      },
              });
            }}
          >
            Confirm
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PinnedNoticeConfirmation;
