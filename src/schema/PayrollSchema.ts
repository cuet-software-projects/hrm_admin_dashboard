import * as Yup from 'yup';

export const PayrollCreateSchema = Yup.object({
  salary: Yup.number()
    .required('Salary is must.')
    .min(1, 'Salary must be greater than 0'),
  status: Yup.string().required('Selection of status is must.'),
  date: Yup.string().required('Date is must.'),
  bonus: Yup.number().optional().min(1, 'Bonus must be greater than 0.'),
  reason: Yup.string().when(['bonus'], (values, schema) => {
    if (values[0] > 0) {
      return schema.required('Must enter a reason for this bonus.');
    }
    return schema;
  }),
});

export const PayrollUpdateSchema = Yup.object({
  employee_id: Yup.string().optional(),
  date: Yup.string().optional(),
  salary: Yup.number().moreThan(0, 'Salary must be greater than 0').optional(),
  status: Yup.string().optional(),
});

export type PayrollCreateSchemaType = Yup.InferType<typeof PayrollCreateSchema>;
export type PayrollUpdateSchemaType = Yup.InferType<typeof PayrollUpdateSchema>;
