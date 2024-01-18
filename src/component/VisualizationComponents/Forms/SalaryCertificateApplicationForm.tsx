import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useState } from 'react';

import {
  SalaryCertificateSchema,
  SalaryCertificateSchemaType,
} from '../../../schema/SalaryCertificateSchema';
import DocuemntApplyService from '../../../service/documentApplyService';
import useAuthStore from '../../../store/authStore';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import Label from '../../Resuables/Label';
import Textarea from '../../Resuables/Textarea';

const SalaryCertificateApplicationForm = () => {
  const [issue_date_state, setIssueDate] = useState<Date | string | null>(null);
  const { userProfileData } = useAuthStore();

  const formikForApply = useFormik({
    initialValues: {
      issue_date: '',
      reason: '',
    },
    validationSchema: SalaryCertificateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onApply(values);
    },
  });

  async function onApply(values: SalaryCertificateSchemaType) {
    try {
      await DocuemntApplyService.createSalaryCertApplication({
        userId: `${userProfileData?.id}`,
        salaryCertData: values,
      });
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  }

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setValues,
    isSubmitting,
    resetForm,
    setSubmitting,
  } = formikForApply;

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <div className="py-3 w-full">
        <Label htmlFor="issue-date">Select Desired Issue Date</Label>
        <br />
        <CustomDatePicker
          size="large"
          className="bg-brand-grad-1 bg-opacity-10 rounded-md px-4 w-full mt-2 text-black-1"
          selectedDate={issue_date_state}
          onChangeDate={(date: Date) => {
            setIssueDate(date);
            setValues({ ...values, issue_date: dayjs(date).format('YYYY-MM-DD') });
          }}
        />
        {errors.issue_date && touched.issue_date && (
          <p className="text-danger font-bold pt-3">{errors.issue_date}</p>
        )}
      </div>
      <div className="py-3">
        <Label htmlFor="reason">Reason</Label>
        <br />
        <Textarea
          id="reason"
          name="reason"
          placeholder="Write the reason"
          value={values.reason}
          onChange={handleChange}
          errorMessage={errors.reason && touched.reason ? errors.reason : ''}
          className="w-full h-28 mt-2 outline-none text-black-1"
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="flex justify-center items-center"
          block
          htmlType="submit"
          isLoading={isSubmitting}
        >
          Click for apply
        </Button>
      </div>
    </form>
  );
};

export default SalaryCertificateApplicationForm;
