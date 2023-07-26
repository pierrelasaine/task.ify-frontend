/**
 * Interface defining the shape of an API error.
 */
interface IAPIError {
    statusCode: number;
    endpoint: string;
    originalError: any;
    message: string;
}

/**
 * Custom error class to represent API related errors.
 */
class APIError extends Error implements IAPIError {
    statusCode: number;
    endpoint: string;
    originalError: any;

    /**
     * Construct a new APIError instance.
     *
     * @param message - Human-readable error message.
     * @param statusCode - The HTTP status code of the error.
     * @param endpoint - The endpoint where the error occurred.
     * @param originalError - The original error thrown, if any.
     */
    constructor(
        message: string,
        statusCode: number,
        endpoint: string,
        originalError: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.endpoint = endpoint;
        this.originalError = originalError;
    }
}

/**
 * Enum representing common HTTP status codes.
 */
enum HttpStatusCodes {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
    // ... others as needed
}

/**
 * Type representing a mapping from HTTP status codes to error messages.
 */
type ErrorMap = {
    [key: number]: string;
}

/**
 * Default error messages for specific HTTP status codes.
 */
const ERROR_MAP: ErrorMap = {
    [HttpStatusCodes.BAD_REQUEST]: 'Bad request. Please check the input.',
    [HttpStatusCodes.UNAUTHORIZED]: 'You are not authenticated. Please log in.',
    [HttpStatusCodes.NOT_FOUND]: 'The requested resource was not found.',
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: 'Internal server error. Please try again later.'
    // ... others as needed
}

export { APIError, ERROR_MAP, HttpStatusCodes }