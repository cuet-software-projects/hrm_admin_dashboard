import * as Yup from 'yup';

export const CreateUserSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  dob: Yup.string().required('Date of Birth is required'),
  fathers_name: Yup.string().optional(),
  mothers_name: Yup.string().optional(),
  blood_group: Yup.string().optional(),
  contact_number: Yup.string().optional(),
  emergency_contact_number: Yup.string().optional(),
  nid: Yup.string()
    .optional()
    .matches(
      /^\d{10}$|^\d{13}$|^\d{17}$/,
      'NID number must have exactly 10, 13 or 17 digits.',
    ),
  permanent_address: Yup.string().optional(),
  present_address: Yup.string().optional(),
  tshirt: Yup.string().optional(),
  tin_number: Yup.string().optional(),
  gender: Yup.string().required('Gender is required'),
  marital_status: Yup.string().optional(),
  profile_picture: Yup.string().optional(),
  religion: Yup.string().required('Religion is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').optional(),
});

export const UpdateUserSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  dob: Yup.string().required('Date of Birth is required'),
  fathers_name: Yup.string().optional(),
  mothers_name: Yup.string().optional(),
  blood_group: Yup.string().optional(),
  contact_number: Yup.string().optional(),
  emergency_contact_number: Yup.string().optional(),
  nid: Yup.string()
    .optional()
    .matches(
      /^\d{10}$|^\d{13}$|^\d{17}$/,
      'NID number must have exactly 10, 13 or 17 digits.',
    ),
  permanent_address: Yup.string().optional(),
  present_address: Yup.string().optional(),
  tshirt: Yup.string().optional(),
  tin_number: Yup.string().optional(),
  gender: Yup.string().required('Gender is required'),
  marital_status: Yup.string().optional(),
  profile_picture: Yup.string().optional(),
  religion: Yup.string().required('Religion is required'),
});

export type CreateUserSchemaType = Yup.InferType<typeof CreateUserSchema>;
export type UpdateUserSchemaType = Yup.InferType<typeof UpdateUserSchema>;
