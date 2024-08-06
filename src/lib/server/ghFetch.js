import { env } from '$env/dynamic/private';

/**
 *
 * @param {RequestInit} [options]
 * @returns
 */
export const ghAuth = (options = {}) => {
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${env.GH_API_KEY}`
    }
  };
};
