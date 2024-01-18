import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import useNoticeStore from '../../../../store/noticeStore';

const NoticeHeaderBackButton = () => {
  const { isOpenNoticeModal } = useNoticeStore();
  return (
    <Button type="link">
      {!isOpenNoticeModal && (
        <Link to={'/notice'}>
          <ArrowLeftOutlined rev={''} className="text-grey-1 font-bold text-lg" />
        </Link>
      )}
    </Button>
  );
};

export default NoticeHeaderBackButton;
