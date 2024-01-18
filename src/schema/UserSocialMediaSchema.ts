import * as yup from 'yup';

import { utils } from '../helpers/utility';

export const UserSocialMediaSchema = yup.object().shape({
  user_id: yup.string().required('User ID not selected'),
  facebook: yup
    .string()
    .notRequired()
    .test('valid-url', 'Entered URL is not valid', (value) => {
      if (!value) {
        return true;
      } else {
        return utils.isValidUrl(value);
      }
    }),
  linkedin: yup
    .string()
    .notRequired()
    .test('valid-url', 'Entered URL is not valid', (value) => {
      if (!value) {
        return true;
      } else {
        return utils.isValidUrl(value);
      }
    }),
});

export type UserSocialMediaSchemaType = yup.InferType<typeof UserSocialMediaSchema>;
