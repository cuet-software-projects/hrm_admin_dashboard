import Select from 'antd/es/select';
import { useFormikContext } from 'formik';

import { utils } from '../../../../../helpers/utility';
import { InvoiceSchemaType } from '../../../../../schema/InvoiceSchema';
import { IUser } from '../../../../../types';
import Label from '../../../../Resuables/Label';
import PictureOrAvatar from '../../../../Resuables/PictureOrAvatar';

interface props {
  userDataList: IUser[] | undefined;
  selectedReceiver: IUser | undefined;
  handleSelectReceiver: (value: string) => void;
}

const { Option } = Select;

const NoteWithSignature: React.FC<props> = ({
  userDataList,
  selectedReceiver,
  handleSelectReceiver,
}) => {
  const { values, setValues } = useFormikContext<InvoiceSchemaType>();

  return (
    <div className="p-4">
      <div className="font-semibold">Notes</div>
      <div className="mt-2">
        <textarea
          className="w-full bg-primary bg-opacity-10 p-2"
          placeholder="Enter note if you have any..."
          value={values.note}
          onChange={(e) => setValues({ ...values, note: e.target.value })}
        />
      </div>
      <div className="my-4">
        <div className="w-[200px] py-3">
          <Label htmlFor="received_by_id">Received By</Label>
          <br />
          <Select
            id="received_by_id"
            size="large"
            showSearch
            optionLabelProp="label"
            filterOption={utils.onFilterOption}
            value={
              values.received_by_id && values.received_by_id.length > 0
                ? values.received_by_id
                : undefined
            }
            placeholder="Select Receiver"
            onSelect={handleSelectReceiver}
            dropdownRender={(menu) => menu}
            className="w-full"
          >
            {userDataList &&
              userDataList.map((userItem) => {
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
        {/* Show Receiver Data */}
        {selectedReceiver && (
          <div>
            <p>
              {selectedReceiver?.first_name} {selectedReceiver?.last_name},
            </p>
            <p>Diligite</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteWithSignature;
