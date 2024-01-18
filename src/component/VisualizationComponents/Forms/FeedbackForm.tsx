import { useFormik } from 'formik';

import { FeedbackSchema, FeedbackSchemaType } from '../../../schema/FeedbackSchema';
import FeedbackService from '../../../service/feedback.service';
import useAuthStore from '../../../store/authStore';
import { FEEDBACK_VALUES } from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';
import Textarea from '../../Resuables/Textarea';

interface props {
  refetch: () => void;
}

const FeedbackForm: React.FC<props> = ({ refetch }) => {
  const { userProfileData } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      feedback_type: '',
      description: '',
    },
    validationSchema: FeedbackSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onAddFeedback(values);
    },
  });

  const onAddFeedback = async (values: FeedbackSchemaType) => {
    try {
      await FeedbackService.createFeedback({
        userId: `${userProfileData?.id}`,
        feedbackData: values,
      });
      resetForm();
      refetch?.();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setValues,
    resetForm,
    setSubmitting,
    isSubmitting,
  } = formik;

  return (
    <div className="w-full">
      <p className="stylishHeaderText text-2xl">Share Your Feedback</p>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <div className="py-3 w-full">
          <Label htmlFor="feedback_type" className="text-xl">
            Feedback Type
          </Label>
          <br />
          <Select
            id="feedback_type"
            size="large"
            options={FEEDBACK_VALUES.map((group: string) => ({
              label: group,
              value: group,
            }))}
            value={values.feedback_type.length > 0 ? values.feedback_type : undefined}
            onChange={(value) => setValues({ ...values, feedback_type: value })}
            errorMessage={
              errors.feedback_type && touched.feedback_type ? errors.feedback_type : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>
        <div className="py-3">
          <Label htmlFor="description" className="text-xl">
            Write Your Feedback in Details:
          </Label>
          <br />
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={handleChange}
            errorMessage={
              errors.description && touched.description ? errors.description : ''
            }
            className="w-full h-28 mt-2 text-black-1 outline-1 outline-dashed outline-brand-grad-1"
          />
        </div>
        <Button
          block
          className="flex justify-center items-center"
          loading={isSubmitting}
          htmlType={`${isSubmitting ? 'button' : 'submit'}`}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
