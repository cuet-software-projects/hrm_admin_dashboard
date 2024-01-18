import * as Yup from 'yup';

export const CreateEmployeeSchema = Yup.object({
  user_id: Yup.string().required('User ID is required.'),
  branch_id: Yup.string().required('Branch selection is required.'),
  department_id: Yup.string().required('Department selection is required.'),
  reporting_officer_id: Yup.string().required('Reporting officer is required.'),
  designation_id: Yup.string().required('Designation selection is required.'),
  joined_at: Yup.string().required('Joined At date is required.'),
  left_at: Yup.string().optional(),
  work_type: Yup.string().required('Work Type is required.'),
  isCurrent: Yup.boolean().required('isCurrent status is required.'),
  salary: Yup.number()
    .required('Salary is required.')
    .moreThan(0, 'Salary must be greater than 0'),
  reason: Yup.string().required('Reason is required.'),
});

export const UpdateEmployeeSchema = Yup.object({
  user_id: Yup.string().required('User ID is required.'),
  branch_id: Yup.string().required('Branch selection is required.'),
  department_id: Yup.string().required('Department selection is required.'),
  reporting_officer_id: Yup.string().required('Reporting officer is required.'),
  designation_id: Yup.string().required('Designation selection is required.'),
  originalDesignationId: Yup.string(),
  joined_at: Yup.string().required('Joined At date is required.'),
  left_at: Yup.string().optional(),
  work_type: Yup.string().required('Work Type is required.'),
  isCurrent: Yup.boolean().required('isCurrent status is required.'),
  originalSalary: Yup.number().optional(),
  salary: Yup.number()
    .required('Salary is required.')
    .moreThan(0, 'Salary must be greater than 0'),
  reason: Yup.string().when(
    ['salary', 'originalSalary', 'designation_id', 'originalDesignationId'],
    (values, schema) => {
      if (values[0] != values[1] && values[2] != values[3]) {
        return schema.required('Must enter a reason of Salary and Designation change');
      }
      if (values[0] != values[1]) {
        return schema.required('Must enter a reason of salary change');
      }
      if (values[2] != values[3]) {
        return schema.required('Must enter a reason of Designation change');
      }
      return schema;
    },
  ),
});
export type CreateEmployeeSchemaType = Yup.InferType<typeof CreateEmployeeSchema>;
export type UpdateEmployeeSchemaType = Yup.InferType<typeof UpdateEmployeeSchema>;
