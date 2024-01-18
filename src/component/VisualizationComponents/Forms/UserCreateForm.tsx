import dayjs from 'dayjs';
import { ErrorMessage, useFormikContext } from 'formik';
import React, { useState } from 'react';

import {
  bloodGroups,
  defaultBackendDateFormate,
} from '../../../constants/GlobalConstants';
import { CreateUserSchemaType } from '../../../schema/UserSchema';
import {
  RELIGION,
  TSHIRT,
  USER_GENDER,
  USER_MARITAL_STATUS,
} from '../../../types/values';
import Button from '../../Resuables/Button/Button';
import CustomDatePicker from '../../Resuables/CustomDatePicker';
import DrawerFooter from '../../Resuables/DrawerFooter';
import Icon from '../../Resuables/Icon/Icon';
import Input from '../../Resuables/Input';
import Label from '../../Resuables/Label';
import Select from '../../Resuables/Select/Select';

const UserCreateForm: React.FC = () => {
  const { errors, values, handleChange, touched, setValues, handleSubmit, isSubmitting } =
    useFormikContext<CreateUserSchemaType>();
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | string | null>(null);

  return (
    <div className="px-2 h-full w-full flex flex-col">
      <form className="flex-1 overflow-auto w-full mb-20" onSubmit={handleSubmit}>
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="first_name">First Name</Label>
            <br />
            <Input
              type="text"
              id="first_name"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              placeholder="First Name"
              errorMessage={
                errors.first_name && touched.first_name ? errors.first_name : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="last_name">Last Name</Label>
            <br />
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              errorMessage={errors.last_name && touched.last_name ? errors.last_name : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="userName">Username</Label>
            <br />
            <Input
              type="text"
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              placeholder="Username"
              errorMessage={errors.userName && touched.userName ? errors.userName : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="dob">Date of Birth</Label>
            <br />
            <CustomDatePicker
              className="bg-brand-grad-1 bg-opacity-10 rounded-md px-4 w-full mt-2 text-black-1"
              size="large"
              selectedDate={dateOfBirth}
              onChangeDate={(date: Date) => {
                setDateOfBirth(date);
                setValues({
                  ...values,
                  dob: dayjs(date).format(defaultBackendDateFormate),
                });
              }}
            />
            <ErrorMessage name={'dob'} component="div" className="error" />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="blood_group">Blood Group</Label>
            <br />
            <div>
              <Select
                id="blood_group"
                size="large"
                options={bloodGroups.map((group: string) => ({
                  label: group,
                  value: group,
                }))}
                value={values.blood_group}
                onChange={(value) => setValues({ ...values, blood_group: value })}
                errorMessage={
                  errors.blood_group && touched.blood_group ? errors.blood_group : ''
                }
                className="w-full mt-2 text-black-1 outline-none"
              />
            </div>
          </div>
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="email">Email</Label>
            <br />
            <Input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              errorMessage={errors.email && touched.email ? errors.email : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="fathers_name">{"Father's Name"}</Label>
            <br />
            <Input
              type="text"
              id="fathers_name"
              name="fathers_name"
              value={values.fathers_name}
              onChange={handleChange}
              placeholder="Father's Name"
              errorMessage={
                errors.fathers_name && touched.fathers_name ? errors.fathers_name : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="mothers_name">{"Mother's Name"}</Label>
            <br />
            <Input
              type="text"
              id="mothers_name"
              name="mothers_name"
              value={values.mothers_name}
              onChange={handleChange}
              placeholder="Mother's Name"
              errorMessage={
                errors.mothers_name && touched.mothers_name ? errors.mothers_name : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <br />
            <Input
              type="text"
              id="contact_number"
              name="contact_number"
              value={values.contact_number}
              onChange={handleChange}
              placeholder="Contact Number"
              errorMessage={
                errors.contact_number && touched.contact_number
                  ? errors.contact_number
                  : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>

          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="emergency_contact_number">Emergency Contact No</Label>
            <br />
            <Input
              type="text"
              id="emergency_contact_number"
              name="emergency_contact_number"
              value={values.emergency_contact_number}
              onChange={handleChange}
              placeholder="Emergency Contact Number"
              errorMessage={
                errors.emergency_contact_number && touched.emergency_contact_number
                  ? errors.emergency_contact_number
                  : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="nid">NID</Label>
            <br />
            <Input
              type="text"
              id="nid"
              name="nid"
              value={values.nid}
              onChange={handleChange}
              placeholder="NID"
              errorMessage={errors.nid && touched.nid ? errors.nid : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="tin_number">TIN Number</Label>
            <br />
            <Input
              type="text"
              id="tin_number"
              name="tin_number"
              value={values.tin_number}
              onChange={handleChange}
              placeholder="TIN Number"
              errorMessage={
                errors.tin_number && touched.tin_number ? errors.tin_number : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="py-3">
          <Label htmlFor="permanent_address">Permanent Address</Label>
          <br />
          <Input
            type="text"
            id="permanent_address"
            name="permanent_address"
            value={values.permanent_address}
            onChange={handleChange}
            placeholder="Permanent Address"
            errorMessage={
              errors.permanent_address && touched.permanent_address
                ? errors.permanent_address
                : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3">
          <Label htmlFor="present_address">Present Address</Label>
          <br />
          <Input
            type="text"
            id="present_address"
            name="present_address"
            value={values.present_address}
            onChange={handleChange}
            placeholder="Present Address"
            errorMessage={
              errors.present_address && touched.present_address
                ? errors.present_address
                : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="tshirt">T-shirt Size</Label>
            <br />
            <Select
              id="tshirt"
              size="large"
              options={TSHIRT.map((size: string) => ({ label: size, value: size }))}
              value={values.tshirt}
              onChange={(value) => setValues({ ...values, tshirt: value })}
              errorMessage={errors.tshirt && touched.tshirt ? errors.tshirt : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>

          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="gender">Gender</Label>
            <br />
            <Select
              id="gender"
              size="large"
              options={USER_GENDER.map((genderType: string) => ({
                label: genderType,
                value: genderType,
              }))}
              value={values.gender.length > 0 ? values.gender : undefined}
              onChange={(value) => setValues({ ...values, gender: value })}
              errorMessage={errors.gender && touched.gender ? errors.gender : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="w-full flex flex-wrap lg:flex-nowrap gap-x-8">
          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="marital_status">Marital Status</Label>
            <br />
            <Select
              id="marital_status"
              size="large"
              options={USER_MARITAL_STATUS.map((maritalStatus: string) => ({
                label: maritalStatus,
                value: maritalStatus,
              }))}
              value={values.marital_status}
              onChange={(value) => setValues({ ...values, marital_status: value })}
              errorMessage={
                errors.marital_status && touched.marital_status
                  ? errors.marital_status
                  : ''
              }
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>

          <div className="py-3 w-full lg:w-1/2">
            <Label htmlFor="religion">Religion</Label>
            <br />
            <Select
              id="religion"
              size="large"
              options={RELIGION.map((religionName: string) => ({
                label: religionName,
                value: religionName,
              }))}
              onChange={(value) => setValues({ ...values, religion: value })}
              value={values.religion.length > 0 ? values.religion : undefined}
              errorMessage={errors.religion && touched.religion ? errors.religion : ''}
              className="w-full mt-2 text-black-1 outline-none"
            />
          </div>
        </div>

        <div className="py-3">
          <Label htmlFor="password">Password</Label>
          <br />
          <Input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            errorMessage={errors.password && touched.password ? errors.password : ''}
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <div className="py-3">
          <Label htmlFor="password">Confirm Password</Label>
          <br />
          <Input
            type="password"
            id="password"
            name="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Password"
            errorMessage={
              values.password && values.password !== confirmPass
                ? 'Password Did not match'
                : ''
            }
            className="w-full mt-2 text-black-1 outline-none"
          />
        </div>

        <DrawerFooter>
          <Button
            disabled={values.password !== confirmPass}
            htmlType={`${isSubmitting ? 'button' : 'submit'}`}
            icon={<Icon name={'ic_add'} color="white" size={20} />}
          >
            <span className="uppercase">Create User</span>
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default UserCreateForm;
