/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { message } from 'antd';
import { FormikProvider, useFormik } from 'formik';

import { userRoles } from '../../../../constants/GlobalConstants';
import { useGetRoleListAll } from '../../../../customHooks/roles/useGetRoleListAll';
import { useUserDetails } from '../../../../customHooks/users/useUserDetails';
import { utils } from '../../../../helpers/utility';
import { ClientSchema, ClientSchemaType } from '../../../../schema/ClientSchema';
import UserService from '../../../../service/user.service';
import useDrawerStore from '../../../../store/drawerStore';
import { useInvoiceStore } from '../../../../store/invoiceStore';
import { IUser } from '../../../../types';
import DrawerTemplate from '../../../Resuables/DrawerTemplate';
import Loading from '../../../Resuables/Loader';
import ClientForm from '../../Forms/ClientForm';
import WarningToCreateClient from './WarningToCreateClient';

type Props = {
  onClose: () => void;
  userId: IUser['id'] | null;
  refetchAllUsers: () => void;
  handleSelectUserForBillingInfo?: (userId: string) => void;
};

export default function ClientDrawer({
  onClose,
  userId,
  refetchAllUsers,
  handleSelectUserForBillingInfo,
}: Props) {
  const { mode: drawerMode } = useDrawerStore();
  const { setSelectedUser } = useInvoiceStore();

  // Fetch data (user details and roles)
  const { data: userData, isLoading: isLoadingUserData } = useUserDetails({
    userId: userId,
  });
  const { data: rolesData, isLoading: isLoadingRolesData } = useGetRoleListAll();

  // get the client role id
  const clientRoleId = rolesData?.find((role) => role.name === userRoles.client)?.id;

  // Configuration of the client form
  const formikForClient = useFormik({
    initialValues: {
      first_name: userData?.first_name ?? '',
      last_name: userData?.last_name ?? '',
      userName: userData?.userName ?? '',
      email: userData?.email ?? '',
      client_role_id: clientRoleId,
      address_line_1: userData?.billing_info?.address_line_1 ?? '',
      address_line_2: userData?.billing_info?.address_line_2 ?? '',
      city: userData?.billing_info?.city ?? '',
      state: userData?.billing_info?.state ?? '',
      country: userData?.billing_info?.country ?? '',
      zip_code: userData?.billing_info?.zip_code ?? '',
    },
    validationSchema: ClientSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      drawerMode === 'create'
        ? onAddNewClient(values as ClientSchemaType)
        : onUpdateClient(values as ClientSchemaType);
    },
  });

  const { resetForm, setSubmitting } = formikForClient;

  // when drawer is closed
  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewClient = async (values: ClientSchemaType) => {
    try {
      const createdClient = await UserService.createClient(values);
      refetchAllUsers?.();
      onCloseDrawer();
      setSelectedUser(createdClient.data);
      handleSelectUserForBillingInfo?.(`${createdClient.data.id}`);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateClient = async (values: ClientSchemaType) => {
    const changedFields = utils.findChangedFields({
      currentValues: values,
      initialValues: {
        ...userData,
        ...userData?.billing_info,
        client_role_id: clientRoleId,
      } as ClientSchemaType,
    });

    if (Object.keys(changedFields).length === 0) {
      setSubmitting(false);
      message.warning('You did not update any information.', 3);
      return;
    }

    try {
      await UserService.updateClient({
        updatedData: changedFields,
        id: userId!,
      });
      refetchAllUsers?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  if (isLoadingRolesData || isLoadingUserData) {
    return <Loading />;
  }

  return (
    <DrawerTemplate onClose={onCloseDrawer} title={`${drawerMode.toUpperCase()} CLIENT`}>
      <FormikProvider value={formikForClient}>
        {clientRoleId && <ClientForm />}
        {!clientRoleId && <WarningToCreateClient />}
      </FormikProvider>
    </DrawerTemplate>
  );
}
