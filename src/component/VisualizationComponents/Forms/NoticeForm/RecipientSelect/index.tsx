import { Checkbox, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ErrorMessage, useFormikContext } from 'formik';
import { useState } from 'react';

import { useGetUserListAll } from '../../../../../customHooks/users/useUserListAll';
import { NoticeSchemaType } from '../../../../../schema/NoticeSchema';
import PictureOrAvatar from '../../../../Resuables/PictureOrAvatar';

const { Option } = Select;

const RecipientSelect = () => {
  const [maxTagNumber, setMaxTagNumber] = useState<number | undefined>(5);
  // Fetch All Users
  const { data: allUsers, isLoading } = useGetUserListAll();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  // formik context options
  const { values, setFieldValue } = useFormikContext<NoticeSchemaType>();

  // handle recipient selection
  const handleRecipientChange = (value: string[]) => {
    if (value.includes('all')) {
      const selectedIds = allUsers?.map((user) => user.id);
      setFieldValue('recipient_ids', selectedIds);
    } else {
      setFieldValue('recipient_ids', value);
    }
  };

  // When the user is searched
  const onFilterRecipient = (input: string, option?: DefaultOptionType) => {
    return !!option?.label?.toString().toLowerCase().includes(input);
  };

  // Toggle Max Tag number display
  const handleToggleMaxTagNumber = () => {
    setMaxTagNumber((prev) => (prev ? undefined : 5));
  };

  return (
    <>
      <div className="flex items-start gap-2">
        {values.recipient_ids && values.recipient_ids.length > 0 && (
          <div className="pt-3">
            <span>To</span>
            <Checkbox
              onChange={handleToggleMaxTagNumber}
              title="See All selected users"
            ></Checkbox>
          </div>
        )}
        <Select
          className="w-full py-2"
          bordered={false}
          allowClear
          mode="multiple"
          placeholder="Select Recipients"
          filterOption={onFilterRecipient}
          onChange={handleRecipientChange}
          optionLabelProp="label"
          maxTagCount={maxTagNumber}
          defaultValue={values.recipient_ids}
        >
          {values.recipient_ids?.length === 0 && (
            <Option key="all" value="all">
              --- SELECT ALL ---
            </Option>
          )}
          {allUsers &&
            allUsers.map((userItem) => {
              return (
                <Option
                  key={userItem.id}
                  value={userItem.id}
                  label={`${userItem.first_name} ${userItem.last_name}`}
                >
                  <div className="flex justify-start items-center">
                    <PictureOrAvatar userData={{ user: userItem }} />
                    <span className="ml-2 w-[100px] overflow-ellipsis text-left">{`${userItem.first_name} ${userItem.last_name}`}</span>
                  </div>
                </Option>
              );
            })}
        </Select>
      </div>
      <ErrorMessage component="div" name="recipient_ids" className="error" />
    </>
  );
};

export default RecipientSelect;
