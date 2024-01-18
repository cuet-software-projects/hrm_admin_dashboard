/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormikProvider, useFormik } from 'formik';

import { useTeamDetails } from '../../../customHooks/teams/useTeamDetails';
import { TeamSchema, TeamSchemaType } from '../../../schema/TeamSchema';
import TeamService from '../../../service/team.service';
import { ITeam } from '../../../types';
import DrawerTemplate from '../../Resuables/DrawerTemplate';
import Loading from '../../Resuables/Loader';
import TeamForm from '../Forms/TeamForm';

type Props = {
  onClose: () => void;
  teamId?: ITeam['id'] | null;
  refetch?: () => void;
};

export default function TeamDrawer({ onClose, teamId, refetch }: Props) {
  const { data, isLoading } = useTeamDetails({ teamId: teamId });

  const formik = useFormik({
    initialValues: {
      name: data?.name ?? '',
      description: data?.description ?? '',
    },
    validationSchema: TeamSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      teamId ? onUpdateNewTeam(values) : onAddNewTeam(values);
    },
  });

  const { resetForm, setSubmitting } = formik;

  const onCloseDrawer = () => {
    onClose();
    resetForm();
  };

  const onAddNewTeam = async (values: TeamSchemaType) => {
    try {
      await TeamService.createTeam(values);
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onUpdateNewTeam = async (values: TeamSchemaType) => {
    try {
      await TeamService.updateTeam({
        updatedData: values,
        id: teamId!,
      });
      refetch?.();
      onCloseDrawer();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <DrawerTemplate onClose={onCloseDrawer} title={teamId ? 'Update Team' : 'Add Team'}>
      {isLoading && <Loading />}
      {!isLoading && (
        <FormikProvider value={formik}>
          <TeamForm />
        </FormikProvider>
      )}
    </DrawerTemplate>
  );
}
