import 'react-quill/dist/quill.bubble.css';

import ReactQuill from 'react-quill';

import { INotice } from '../../../../types/notice.type';

interface props {
  content: INotice['content'] | undefined;
}

const NoticeBody: React.FC<props> = ({ content }) => {
  return <ReactQuill readOnly className="px-8" value={content} theme="bubble" />;
};

export default NoticeBody;
