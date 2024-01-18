import { LOGIN } from '../constants/api';
import { apiGet, apiPost } from '../helpers/axios/config';
import SuccessHandler from '../helpers/axios/successHandler';
import { ForgotPasswordSchemaType } from '../schema/ForgotPasswordSchema';
import { LoginSchemaType } from '../schema/LoginSchema';
import { ResetPasswordWhenForgotSchemaType } from '../schema/ResetPasswordWhenForgotSchema';
import { IUser, LoginSuccessType, ResponseSuccess } from '../types';

export class AuthInfo {
  expiresIn: number | undefined;
  accessToken: string | undefined;
  authenticated = false;
}

let authData: AuthInfo | null;

function _setSession(authResult: { exp: number; idToken: string }) {
  authData = new AuthInfo();
  authData.expiresIn = authResult.exp * 1000;
  authData.accessToken = authResult.idToken;
  authData.authenticated = true;
  localStorage.setItem('auth', JSON.stringify(authData));
}

export default class AuthService {
  static async login(
    credentials: LoginSchemaType,
  ): Promise<ResponseSuccess<LoginSuccessType>> {
    try {
      const apiUrl = LOGIN;
      const requestData = {
        apiPath: apiUrl,
        data: credentials,
      };
      const loginResponse = await apiPost<ResponseSuccess<LoginSuccessType>>(requestData);
      _setSession({
        exp: loginResponse.data.expiresIn,
        idToken: loginResponse.data.token,
      });
      return Promise.resolve(loginResponse);
    } catch (error) {
      return Promise.reject();
    }
  }

  // Forgot password
  static async forgotPassword(data: ForgotPasswordSchemaType): Promise<void> {
    try {
      await apiPost({
        apiPath: `/auth/forgot-password`,
        data,
      });
      SuccessHandler.handle(
        'Check your mail. You will recieve an email if user with that mail exist',
      );
    } catch (error) {
      return Promise.reject();
    }
  }

  // Reset Password when forgot
  static async resetPasswordWhenForgot(data: ResetPasswordWhenForgotSchemaType) {
    try {
      await apiPost({
        apiPath: `/auth/reset-password/${data.token}`,
        data: {
          password: data.password,
        },
      });
      SuccessHandler.handle('Your password is changed successfully. Now try to login.');
    } catch (error) {
      return Promise.reject();
    }
  }

  // Verify reset password token
  static async resetPasswordVerifyToken(token: string): Promise<{ verified: boolean }> {
    try {
      const verificationResponse = await apiGet<ResponseSuccess<{ verified: boolean }>>({
        apiPath: `/auth/reset-password/verify/${token}`,
      });
      return Promise.resolve({
        verified: verificationResponse.data.verified,
      });
    } catch (error) {
      return Promise.reject();
    }
  }

  // This function fetches the logged in user info
  static async fetchLoggedInUserInfo(): Promise<IUser> {
    try {
      const loggedInUserData = await apiGet<ResponseSuccess<IUser>>({ apiPath: '/me' });
      return Promise.resolve(loggedInUserData.data);
    } catch (e) {
      return Promise.reject();
    }
  }
}
