/**
 * `NodeEnv` type represents the possible environment modes a Node.js application can run in.
 */
type NodeEnv = 'production' | 'development' | 'test' | undefined

/**
 * `PRODUCTION_API_BASE_URL` is the base URL of the API in the production environment.
 */
export const PRODUCTION_API_BASE_URL = 'https://taskify-test-api-f7db16035640.herokuapp.com'

/**
 * `DEVELOPMENT_API_BASE_URL` is the base URL of the API in the development environment.
 */
export const DEVELOPMENT_API_BASE_URL = 'http://localhost:3001'

/**
 * `API_BASE_URL` is set depending on the environment in which the application is running.
 * If the application is running in a 'production' environment, `API_BASE_URL` will be set to
 * `PRODUCTION_API_BASE_URL`. In all other cases, it will be set to `DEVELOPMENT_API_BASE_URL`.
 */
export const API_BASE_URL =
    (process.env.NODE_ENV as NodeEnv) === 'production'
        ? PRODUCTION_API_BASE_URL
        : DEVELOPMENT_API_BASE_URL
