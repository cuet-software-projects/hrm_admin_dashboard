export const getEnvironmentName = (): string => {
  return import.meta.env.VITE_PUBLIC_APP_ENVIRONMENT_TYPE || 'development';
};

export const getBaseUrl = (): string => {
  return import.meta.env.VITE_PUBLIC_API_BASE_URL || '';
};

export const getS3BaseUrl = (): string => {
  return import.meta.env.VITE_PUBLIC_S3_BASE_URL || '';
};
