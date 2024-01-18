/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { utils } from '../utility';
import axiosInstance from './axiosInstance';

type HTTPRequestCommon = {
  apiPath: string;
  data?: any;
  config?: object;
  withCredentials?: boolean;
  external?: boolean;
};

function transformConfig(config: any, data: any) {
  let transformedData = data;
  if (
    config &&
    utils.isDefined(config, 'headers') &&
    utils.isDefined(config.headers, 'Content-Type') &&
    config.headers['Content-Type'] === 'multipart/form-data'
  ) {
    return data;
  }
  if (
    config &&
    utils.isDefined(config, 'headers') &&
    utils.isDefined(config.headers, 'Content-Type') &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    transformedData = JSON.stringify(data);
  }
  return transformedData;
}

function apiGet<T>({
  apiPath,
  config = {},
  withCredentials = false,
  external = false,
}: HTTPRequestCommon): Promise<T> {
  const axiosToUse = external ? axios : axiosInstance();
  const fullUrl = apiPath;
  const newConfig = {
    ...config,
    withCredentials,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosToUse.get(fullUrl, newConfig);
      resolve(response as T);
    } catch (error) {
      reject(error);
    }
  });
}

const apiPost = <T>({
  apiPath,
  data,
  config = {},
  withCredentials = false,
  external = false,
}: HTTPRequestCommon): Promise<T> => {
  const newConfig = {
    ...config,
    withCredentials,
  };

  const transformedData = transformConfig(newConfig, data);
  const axiosToUse = external ? axios : axiosInstance();
  const fullUrl = apiPath;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosToUse.post(fullUrl, transformedData, newConfig);
      resolve(response as T);
    } catch (error) {
      reject(error);
    }
  });
};

function apiPut({ apiPath, data, config = {}, external = false }: HTTPRequestCommon) {
  const newConfig = {
    ...config,
  };
  const transformedData = transformConfig(newConfig, data);
  const axiosToUse = external ? axios : axiosInstance();
  const fullUrl = apiPath;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosToUse.put(fullUrl, transformedData, newConfig);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

function apiPatch({ apiPath, data, config = {}, external = false }: HTTPRequestCommon) {
  const newConfig = {
    ...config,
  };
  const transformedData = transformConfig(newConfig, data);
  const axiosToUse = external ? axios : axiosInstance();
  const fullUrl = apiPath;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosToUse.patch(fullUrl, transformedData, newConfig);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

function apiDelete({ apiPath, config = {}, external = false }: HTTPRequestCommon) {
  const newConfig = {
    ...config,
  };
  const axiosToUse = external ? axios : axiosInstance();
  const fullUrl = apiPath;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosToUse.delete(fullUrl, newConfig);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export { apiDelete, apiGet, apiPatch, apiPost, apiPut };
