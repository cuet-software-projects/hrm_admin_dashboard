import { useFormikContext } from 'formik';

import { UserSocialMediaSchemaType } from '../../../schema/UserSocialMediaSchema';
import Button from '../../Resuables/Button/Button';
import Input from '../../Resuables/Input';

export default function UserSocialMediaForm() {
  const { handleChange, handleSubmit, values, touched, errors, isSubmitting } =
    useFormikContext<UserSocialMediaSchemaType>();

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2 py-5">
          <label className="font-semibold">Enter Your Facebook Profile Link</label>
          <Input
            id="facebook"
            name="facebook"
            type="text"
            value={values.facebook ?? ''}
            onChange={handleChange}
            placeholder="Type here"
            errorMessage={errors.facebook && touched.facebook ? errors.facebook : ''}
            className="border border-black-1 border-opacity-20 rounded-lg w-full h-[50px] outline-none bg-white-1 p-0 text-sm"
          />
        </div>

        <div className="flex flex-col space-y-2 py-5">
          <label className="font-semibold">Enter Your Linkedin Profile Link</label>
          <Input
            id="linkedin"
            name="linkedin"
            type="text"
            value={values.linkedin ?? ''}
            onChange={handleChange}
            placeholder="Type here"
            errorMessage={errors.linkedin && touched.linkedin ? errors.linkedin : ''}
            className="border border-black-1 border-opacity-20 rounded-lg w-full h-[50px] outline-none bg-white-1 p-0 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button
            htmlType={isSubmitting ? 'button' : 'submit'}
            isLoading={isSubmitting}
            className="w-full flex justify-center items-center"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
