import { Divider } from 'antd';
import { useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../schema/NoticeSchema';
import ContentInput from './ContentInput';
import RecipientSelect from './RecipientSelect';
import SubjectInput from './SubjectInput';

const NoticeForm = () => {
  const { setFieldValue } = useFormikContext<NoticeSchemaType>();

  // set the notice body value
  const handleChangeContent = (value: string) => setFieldValue('content', value);

  return (
    <form className="flex flex-col h-[100%] px-3">
      {/* Select Recipients */}
      <RecipientSelect />
      <Divider className="py-0 my-0" />

      {/* Enter Subject of the notice */}
      <SubjectInput />
      <Divider className="py-0 my-0" />

      {/* Enter Content of the notice */}
      <ContentInput handleChangeContent={handleChangeContent} />
    </form>
  );
};

export default NoticeForm;
