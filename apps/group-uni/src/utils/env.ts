/**
 * @description: Development mode
 */
export const devMode = "development";

/**
 * @description: Production mode
 */
export const prodMode = "production";

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnvValue<T = string>(key: keyof ImportMetaEnv): T {
  const envValue = import.meta.env[key];
  return (envValue === "true"
    ? true
    : envValue === "false"
      ? false
      : envValue) as unknown as T;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return getEnvValue("VITE_ENV") === devMode;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return getEnvValue("VITE_ENV") === prodMode;
}
