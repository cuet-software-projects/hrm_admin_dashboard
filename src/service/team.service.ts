import { ALL_TEAMS, TEAM, TEAMS } from '../constants/api';
import { apiDelete, apiGet, apiPatch, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { TeamSchemaType } from '../schema/TeamSchema';
import {
  ITeam,
  PaginateResponse,
  PaginationQueryParams,
  ResponseSuccess,
} from '../types';

export default class TeamService {
  static async getTeams({
    page = 1,
    limit = 10,
    sorts = '-created_at',
  }: PaginationQueryParams): Promise<PaginateResponse<ITeam>> {
    try {
      const teamResponse = await apiGet<PaginateResponse<ITeam>>({
        apiPath: `${TEAMS}?page=${page}&limit=${limit}&sorts=${sorts}`,
      });

      return Promise.resolve(teamResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllTeams(): Promise<ITeam[]> {
    try {
      const allTeam = await apiGet<ResponseSuccess<ITeam[]>>({
        apiPath: ALL_TEAMS,
      });
      return Promise.resolve(allTeam.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async createTeam(teamData: TeamSchemaType): Promise<ResponseSuccess<ITeam[]>> {
    try {
      const teamResponse = await apiPost<ResponseSuccess<ITeam[]>>({
        apiPath: TEAM,
        data: teamData,
      });
      SuccessHandler.handle('Successfully Created.');
      return Promise.resolve(teamResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async updateTeam({
    updatedData,
    id,
  }: {
    updatedData: TeamSchemaType;
    id: string;
  }): Promise<void> {
    try {
      await apiPatch({
        apiPath: `${TEAMS}/${id}`,
        data: updatedData,
      });
      SuccessHandler.handle('Successfully Updated.');
      Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async deleteTeam(id: string): Promise<void> {
    try {
      await apiDelete({
        apiPath: `${TEAMS}/${id}`,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }

  static async getTeamDetails(id: ITeam['id']): Promise<ITeam> {
    try {
      const teamResponse = await apiGet<ResponseSuccess<ITeam>>({
        apiPath: `${TEAMS}/${id}`,
      });
      return Promise.resolve(teamResponse.data);
    } catch (error) {
      return Promise.reject();
    }
  }
}
