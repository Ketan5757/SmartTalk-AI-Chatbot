import { ClerkAPIResponseError as ClerkAPIResponseError$1, ClerkAPIError, ClerkAPIErrorJSON } from '@clerk/types';

/**
 * Checks if the provided error object is an unauthorized error.
 *
 * @internal
 *
 * @deprecated This is no longer used, and will be removed in the next major version.
 */
declare function isUnauthorizedError(e: any): boolean;
/**
 * Checks if the provided error object is a captcha error.
 *
 * @internal
 */
declare function isCaptchaError(e: ClerkAPIResponseError): boolean;
/**
 * Checks if the provided error is a 4xx error.
 *
 * @internal
 */
declare function is4xxError(e: any): boolean;
/**
 * Checks if the provided error is a network error.
 *
 * @internal
 */
declare function isNetworkError(e: any): boolean;
/**
 * Options for creating a ClerkAPIResponseError.
 *
 * @internal
 */
interface ClerkAPIResponseOptions {
    data: ClerkAPIErrorJSON[];
    status: number;
    clerkTraceId?: string;
    retryAfter?: number;
}
interface MetamaskError extends Error {
    code: 4001 | 32602 | 32603;
    message: string;
    data?: unknown;
}
/**
 * Checks if the provided error is either a ClerkAPIResponseError, a ClerkRuntimeError, or a MetamaskError.
 *
 * @internal
 */
declare function isKnownError(error: any): error is ClerkAPIResponseError | ClerkRuntimeError | MetamaskError;
/**
 * Checks if the provided error is a ClerkAPIResponseError.
 *
 * @internal
 */
declare function isClerkAPIResponseError(err: any): err is ClerkAPIResponseError;
/**
 * Checks if the provided error object is an instance of ClerkRuntimeError.
 *
 * @param err - The error object to check.
 * @returns True if the error is a ClerkRuntimeError, false otherwise.
 *
 * @example
 * const error = new ClerkRuntimeError('An error occurred');
 * if (isClerkRuntimeError(error)) {
 *   // Handle ClerkRuntimeError
 *   console.error('ClerkRuntimeError:', error.message);
 * } else {
 *   // Handle other errors
 *   console.error('Other error:', error.message);
 * }
 */
declare function isClerkRuntimeError(err: any): err is ClerkRuntimeError;
/**
 * Checks if the provided error is a Clerk runtime error indicating a reverification was cancelled.
 *
 * @internal
 */
declare function isReverificationCancelledError(err: any): boolean;
/**
 * Checks if the provided error is a Metamask error.
 *
 * @internal
 */
declare function isMetamaskError(err: any): err is MetamaskError;
/**
 * Checks if the provided error is clerk api response error indicating a user is locked.
 *
 * @internal
 */
declare function isUserLockedError(err: any): boolean;
/**
 * Checks if the provided error is a clerk api response error indicating a password was pwned.
 *
 * @internal
 */
declare function isPasswordPwnedError(err: any): boolean;
/**
 * Parses an array of ClerkAPIErrorJSON objects into an array of ClerkAPIError objects.
 *
 * @internal
 */
declare function parseErrors(data?: ClerkAPIErrorJSON[]): ClerkAPIError[];
/**
 * Parses a ClerkAPIErrorJSON object into a ClerkAPIError object.
 *
 * @internal
 */
declare function parseError(error: ClerkAPIErrorJSON): ClerkAPIError;
/**
 * Converts a ClerkAPIError object into a ClerkAPIErrorJSON object.
 *
 * @internal
 */
declare function errorToJSON(error: ClerkAPIError | null): ClerkAPIErrorJSON;
declare class ClerkAPIResponseError extends Error implements ClerkAPIResponseError$1 {
    clerkError: true;
    status: number;
    message: string;
    clerkTraceId?: string;
    retryAfter?: number;
    errors: ClerkAPIError[];
    constructor(message: string, { data, status, clerkTraceId, retryAfter }: ClerkAPIResponseOptions);
    toString: () => string;
}
/**
 * Custom error class for representing Clerk runtime errors.
 *
 * @class ClerkRuntimeError
 *
 * @example
 *   throw new ClerkRuntimeError('An error occurred', { code: 'password_invalid' });
 */
declare class ClerkRuntimeError extends Error {
    clerkRuntimeError: true;
    /**
     * The error message.
     *
     * @type {string}
     */
    message: string;
    /**
     * A unique code identifying the error, can be used for localization.
     *
     * @type {string}
     */
    code: string;
    constructor(message: string, { code }: {
        code: string;
    });
    /**
     * Returns a string representation of the error.
     *
     * @returns A formatted string with the error name and message.
     */
    toString: () => string;
}
declare class EmailLinkError extends Error {
    code: string;
    constructor(code: string);
}
/**
 * Checks if the provided error is an EmailLinkError.
 *
 * @internal
 */
declare function isEmailLinkError(err: Error): err is EmailLinkError;
/**
 * @deprecated Use `EmailLinkErrorCodeStatus` instead.
 *
 * @hidden
 */
declare const EmailLinkErrorCode: {
    Expired: string;
    Failed: string;
    ClientMismatch: string;
};
declare const EmailLinkErrorCodeStatus: {
    readonly Expired: "expired";
    readonly Failed: "failed";
    readonly ClientMismatch: "client_mismatch";
};
declare const DefaultMessages: Readonly<{
    InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})";
    InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})";
    MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.";
    MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.";
    MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider";
}>;
type MessageKeys = keyof typeof DefaultMessages;
type Messages = Record<MessageKeys, string>;
type CustomMessages = Partial<Messages>;
type ErrorThrowerOptions = {
    packageName: string;
    customMessages?: CustomMessages;
};
interface ErrorThrower {
    setPackageName(options: ErrorThrowerOptions): ErrorThrower;
    setMessages(options: ErrorThrowerOptions): ErrorThrower;
    throwInvalidPublishableKeyError(params: {
        key?: string;
    }): never;
    throwInvalidProxyUrl(params: {
        url?: string;
    }): never;
    throwMissingPublishableKeyError(): never;
    throwMissingSecretKeyError(): never;
    throwMissingClerkProviderError(params: {
        source?: string;
    }): never;
    throw(message: string): never;
}
/**
 * Builds an error thrower.
 *
 * @internal
 */
declare function buildErrorThrower({ packageName, customMessages }: ErrorThrowerOptions): ErrorThrower;
type ClerkWebAuthnErrorCode = 'passkey_not_supported' | 'passkey_pa_not_supported' | 'passkey_invalid_rpID_or_domain' | 'passkey_already_exists' | 'passkey_operation_aborted' | 'passkey_retrieval_cancelled' | 'passkey_retrieval_failed' | 'passkey_registration_cancelled' | 'passkey_registration_failed';
declare class ClerkWebAuthnError extends ClerkRuntimeError {
    /**
     * A unique code identifying the error, can be used for localization.
     */
    code: ClerkWebAuthnErrorCode;
    constructor(message: string, { code }: {
        code: ClerkWebAuthnErrorCode;
    });
}

export { ClerkAPIResponseError, ClerkRuntimeError, ClerkWebAuthnError, EmailLinkError, EmailLinkErrorCode, EmailLinkErrorCodeStatus, type ErrorThrower, type ErrorThrowerOptions, type MetamaskError, buildErrorThrower, errorToJSON, is4xxError, isCaptchaError, isClerkAPIResponseError, isClerkRuntimeError, isEmailLinkError, isKnownError, isMetamaskError, isNetworkError, isPasswordPwnedError, isReverificationCancelledError, isUnauthorizedError, isUserLockedError, parseError, parseErrors };
