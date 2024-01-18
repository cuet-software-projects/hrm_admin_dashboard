import * as Yup from 'yup';

export const BonusCreateSchema = Yup.object({
  status: Yup.string().required('Selection of status is must!'),
  date: Yup.string().required('Must select a date!'),
  bonus: Yup.number().moreThan(0, 'Bonus must be greter than 0!'),
  reason: Yup.string().required('Must enter a reason!'),
});

export const BonusUpdateSchema = Yup.object({
  employee_id: Yup.string().optional(),
  status: Yup.string().required('Selection of status is must.'),
  date: Yup.string().required('Must select a date.'),
  bonus: Yup.number().moreThan(0, 'Bonus must be greter than 0.'),
  reason: Yup.string().required('Must enter a reason'),
});

export type BonusCreateSchemaType = Yup.InferType<typeof BonusCreateSchema>;
export type BonusUpdateSchemaType = Yup.InferType<typeof BonusUpdateSchema>;
