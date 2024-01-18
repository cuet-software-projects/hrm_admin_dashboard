import * as Yup from 'yup';
export const CreateAttendanceSchema = Yup.object({
  employee_id: Yup.string().required('Employee Id must be added'),
  entry_time: Yup.string().required('Enter Your Entry Time.'),
  work_type: Yup.string().required('Must choose a work type.'),
  work_plan: Yup.string().required('Enter your work plan for today.'),
});
export const UpdateAttendanceSchema = Yup.object({
  exit_time: Yup.string().required('Enter Your Exit Time.'),
  work_descriptions: Yup.string().required('Must add a proper discussion.'),
  break_duration: Yup.number()
    .optional()
    .moreThan(0, 'Duration must be more than 0')
    .max(16, 'What!!! have you taken break all day?'),
  reason_of_break: Yup.string().when(['break_duration'], (values, schema) => {
    if (values[0] > 0) {
      return schema.required('Enter the reason for taking break.');
    }
    return schema;
  }),
});

export const CombinedCreateUpdateAttendanceSchema = Yup.object().shape(
  {
    employee_id: Yup.string().required('Employee Id must be added'),
    entry_time: Yup.string().required('Enter Your Entry Time.'),
    work_type: Yup.string().required('Must choose a work type.'),
    work_plan: Yup.string().required('Enter your work plan for today.'),
    exit_time: Yup.string().when(['work_descriptions'], (values, schema) => {
      if (values[0] && values[0].length > 0) {
        return schema.required('Enter Your Exit Time.');
      } else {
        return schema.optional();
      }
    }),
    work_descriptions: Yup.string()
      .nullable()
      .when(['exit_time'], (values, schema) => {
        if (values[0]) {
          return schema.required('Must add a proper discussion.');
        }
        return schema.optional();
      }),
    break_duration: Yup.number()
      .optional()
      .moreThan(0, 'Duration must be more than 0')
      .max(16, 'What!!! have you taken break all day?'),
    reason_of_break: Yup.string().when(['break_duration'], (values, schema) => {
      if (values[0] > 0) {
        return schema.required('Enter the reason for taking break.');
      }
      return schema;
    }),
  },
  [['exit_time', 'work_descriptions']],
);

export const UpdateAttendanceMarkingsSchema = Yup.object({
  markings: Yup.number().required('Must add a mark.'),
});

export type CreateAttendanceSchemaType = Yup.InferType<typeof CreateAttendanceSchema>;
export type UpdateAttendanceSchemaType = Yup.InferType<typeof UpdateAttendanceSchema>;
export type CombinedCreateUpdateAttendanceSchemaType = Yup.InferType<
  typeof CombinedCreateUpdateAttendanceSchema
>;
export type UpdateAttendanceMarkingsSchemaType = Yup.InferType<
  typeof UpdateAttendanceMarkingsSchema
>;
