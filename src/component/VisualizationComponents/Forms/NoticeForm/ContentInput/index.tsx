import 'react-quill/dist/quill.bubble.css';
import './style.css';

import { ErrorMessage, useFormikContext } from 'formik';
import ReactQuill from 'react-quill';

import { NoticeSchemaType } from '../../../../../schema/NoticeSchema';
import QuillToolbar, { modules } from './ToolbarOptions';

interface props {
  handleChangeContent: (value: string) => void;
}

const ContentInput: React.FC<props> = ({ handleChangeContent }) => {
  const { values } = useFormikContext<NoticeSchemaType>();

  return (
    <div className="flex-1 p-0 overflow-auto hide-scrollbar">
      <QuillToolbar />
      <ReactQuill
        theme="bubble"
        value={values.content}
        onChange={(value) => handleChangeContent(value)}
        modules={modules}
      />
      <ErrorMessage component="div" name="content" className="error" />
    </div>
  );
};

export default ContentInput;
