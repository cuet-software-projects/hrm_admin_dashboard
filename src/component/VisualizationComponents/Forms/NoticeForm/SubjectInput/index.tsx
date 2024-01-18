import { Input } from 'antd';
import { ErrorMessage, useFormikContext } from 'formik';

import { NoticeSchemaType } from '../../../../../schema/NoticeSchema';

const SubjectInput = () => {
  const { values, handleChange } = useFormikContext<NoticeSchemaType>();

  return (
    <>
      <Input
        name="subject"
        bordered={false}
        classNames={{ input: 'py-3' }}
        placeholder="Subject"
        value={values.subject}
        onChange={handleChange}
      />
      <ErrorMessage component="div" name="subject" className="error" />
    </>
  );
};

export default SubjectInput;
