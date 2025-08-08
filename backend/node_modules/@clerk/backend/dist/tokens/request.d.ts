import type { RequestState } from './authStatus';
import type { SessionTokenType } from './tokenTypes';
import { TokenType } from './tokenTypes';
import type { AuthenticateRequestOptions } from './types';
export declare const RefreshTokenErrorReason: {
    readonly NonEligibleNoCookie: "non-eligible-no-refresh-cookie";
    readonly NonEligibleNonGet: "non-eligible-non-get";
    readonly InvalidSessionToken: "invalid-session-token";
    readonly MissingApiClient: "missing-api-client";
    readonly MissingSessionToken: "missing-session-token";
    readonly MissingRefreshToken: "missing-refresh-token";
    readonly ExpiredSessionTokenDecodeFailed: "expired-session-token-decode-failed";
    readonly ExpiredSessionTokenMissingSidClaim: "expired-session-token-missing-sid-claim";
    readonly FetchError: "fetch-error";
    readonly UnexpectedSDKError: "unexpected-sdk-error";
    readonly UnexpectedBAPIError: "unexpected-bapi-error";
};
export interface AuthenticateRequest {
    /**
     * @example
     * clerkClient.authenticateRequest(request, { acceptsToken: ['session_token', 'api_key'] });
     */
    <T extends readonly TokenType[]>(request: Request, options: AuthenticateRequestOptions & {
        acceptsToken: T;
    }): Promise<RequestState<T[number] | null>>;
    /**
     * @example
     * clerkClient.authenticateRequest(request, { acceptsToken: 'session_token' });
     */
    <T extends TokenType>(request: Request, options: AuthenticateRequestOptions & {
        acceptsToken: T;
    }): Promise<RequestState<T>>;
    /**
     * @example
     * clerkClient.authenticateRequest(request, { acceptsToken: 'any' });
     */
    (request: Request, options: AuthenticateRequestOptions & {
        acceptsToken: 'any';
    }): Promise<RequestState<TokenType>>;
    /**
     * @example
     * clerkClient.authenticateRequest(request);
     */
    (request: Request, options?: AuthenticateRequestOptions): Promise<RequestState<SessionTokenType>>;
}
export declare const authenticateRequest: AuthenticateRequest;
/**
 * @internal
 */
export declare const debugRequestState: (params: RequestState) => {
    isSignedIn: boolean;
    isAuthenticated: boolean;
    proxyUrl: string | undefined;
    reason: string | null;
    message: string | null;
    publishableKey: string;
    isSatellite: boolean;
    domain: string;
};
//# sourceMappingURL=request.d.ts.map