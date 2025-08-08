import type { ClerkPaginationRequest, SessionStatus } from '@clerk/types';
import type { Cookies } from '../resources/Cookies';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { Session } from '../resources/Session';
import type { Token } from '../resources/Token';
import { AbstractAPI } from './AbstractApi';
type SessionListParams = ClerkPaginationRequest<{
    clientId?: string;
    userId?: string;
    status?: SessionStatus;
}>;
type RefreshTokenParams = {
    expired_token: string;
    refresh_token: string;
    request_origin: string;
    request_originating_ip?: string;
    request_headers?: Record<string, string[]>;
    suffixed_cookies?: boolean;
    format?: 'token' | 'cookie';
};
type CreateSessionParams = {
    userId: string;
};
export declare class SessionAPI extends AbstractAPI {
    getSessionList(params?: SessionListParams): Promise<PaginatedResourceResponse<Session[]>>;
    getSession(sessionId: string): Promise<Session>;
    createSession(params: CreateSessionParams): Promise<Session>;
    revokeSession(sessionId: string): Promise<Session>;
    verifySession(sessionId: string, token: string): Promise<Session>;
    /**
     * Retrieves a session token or generates a JWT using a specified template.
     *
     * @param sessionId - The ID of the session for which to generate the token
     * @param template - Optional name of the JWT template configured in the Clerk Dashboard.
     * @param expiresInSeconds - Optional expiration time for the token in seconds.
     *   If not provided, uses the default expiration.
     *
     * @returns A promise that resolves to the generated token
     *
     * @throws {Error} When sessionId is invalid or empty
     */
    getToken(sessionId: string, template?: string, expiresInSeconds?: number): Promise<Token>;
    refreshSession(sessionId: string, params: RefreshTokenParams & {
        format: 'token';
    }): Promise<Token>;
    refreshSession(sessionId: string, params: RefreshTokenParams & {
        format: 'cookie';
    }): Promise<Cookies>;
    refreshSession(sessionId: string, params: RefreshTokenParams): Promise<Token>;
}
export {};
//# sourceMappingURL=SessionApi.d.ts.map