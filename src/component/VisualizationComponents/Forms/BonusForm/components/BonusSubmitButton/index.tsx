import { useFormikContext } from 'formik';

import {
  BonusCreateSchemaType,
  BonusUpdateSchemaType,
} from '../../../../../../schema/BonusSchema';
import Button from '../../../../../Resuables/Button/Button';
import DrawerFooter from '../../../../../Resuables/DrawerFooter';
import Icon from '../../../../../Resuables/Icon/Icon';

interface props {
  isCreateMode: boolean;
}

const BonusSubmitButton: React.FC<props> = ({ isCreateMode }) => {
  const { isSubmitting } = isCreateMode
    ? useFormikContext<BonusCreateSchemaType>()
    : useFormikContext<BonusUpdateSchemaType>();

  return (
    <DrawerFooter>
      <Button
        htmlType={`${isSubmitting ? 'button' : 'submit'}`}
        isLoading={isSubmitting}
        className="flex items-center"
        icon={<Icon name={'ic_add'} color="white" size={20} />}
      >
        <span>{isCreateMode ? 'Create' : 'Update'} Bonus</span>
      </Button>
    </DrawerFooter>
  );
};

export default BonusSubmitButton;
