/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useRoleDetails } from '../../../customHooks/roles/useRoleDetails';
import { RolesSchema, RolesSchemaType } from '../../../schema/RolesSchema';
import RoleService from '../../../service/roles.service';
import { IRole } from '../../../types/role.type';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import RoleForm from '../Forms/RoleForm';

type Props = {
  onClose: () => void;
  roleId?: IRole['id'] | null;
  refetch?: () => void;
};

export default function RoleDrawer({ onClose, roleId, refetch }: Props) {
  const { data, isLoading } = useRoleDetails({ roleId: roleId });

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
      description: data?.description ?? '',
    },
    validationSchema: RolesSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      roleId ? onUpdateNewRole(values) : onAddNewRole(values);
    },
  });

  const { resetForm, setSubmitting } = formik;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewRole = async (values: RolesSchemaType) => {
    try {
      await RoleService.createRole(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewRole = async (values: RolesSchemaType) => {
    try {
      await RoleService.updateRole({
        updatedData: values,
        id: roleId!,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <DrawerTemplate onClose={onCloseDrawer} title={roleId ? 'Update Role' : 'Add Role'}>
      {isLoading && <Loading />}
      {!isLoading && (
        <FormikProvider value={formik}>
          <RoleForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
