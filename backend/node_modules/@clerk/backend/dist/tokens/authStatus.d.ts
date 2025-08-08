import type { JwtPayload, PendingSessionOptions } from '@clerk/types';
import type { TokenVerificationErrorReason } from '../errors';
import type { AuthenticateContext } from './authenticateContext';
import type { AuthenticatedMachineObject, InvalidTokenAuthObject, SignedInAuthObject, SignedOutAuthObject, UnauthenticatedMachineObject } from './authObjects';
import type { MachineTokenType, SessionTokenType } from './tokenTypes';
import { TokenType } from './tokenTypes';
import type { MachineAuthType } from './types';
export declare const AuthStatus: {
    readonly SignedIn: "signed-in";
    readonly SignedOut: "signed-out";
    readonly Handshake: "handshake";
};
export type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];
type ToAuth<T extends TokenType | null, Authenticated extends boolean> = T extends null ? () => InvalidTokenAuthObject : T extends SessionTokenType ? Authenticated extends true ? (opts?: PendingSessionOptions) => SignedInAuthObject : () => SignedOutAuthObject : Authenticated extends true ? () => AuthenticatedMachineObject<Exclude<T, SessionTokenType | null>> : () => UnauthenticatedMachineObject<Exclude<T, SessionTokenType | null>>;
export type AuthenticatedState<T extends TokenType = SessionTokenType> = {
    status: typeof AuthStatus.SignedIn;
    reason: null;
    message: null;
    proxyUrl?: string;
    publishableKey: string;
    isSatellite: boolean;
    domain: string;
    signInUrl: string;
    signUpUrl: string;
    afterSignInUrl: string;
    afterSignUpUrl: string;
    /**
     * @deprecated Use `isAuthenticated` instead.
     */
    isSignedIn: true;
    isAuthenticated: true;
    headers: Headers;
    token: string;
    tokenType: T;
    toAuth: ToAuth<T, true>;
};
export type UnauthenticatedState<T extends TokenType | null = SessionTokenType> = {
    status: typeof AuthStatus.SignedOut;
    reason: AuthReason;
    message: string;
    proxyUrl?: string;
    publishableKey: string;
    isSatellite: boolean;
    domain: string;
    signInUrl: string;
    signUpUrl: string;
    afterSignInUrl: string;
    afterSignUpUrl: string;
    /**
     * @deprecated Use `isAuthenticated` instead.
     */
    isSignedIn: false;
    isAuthenticated: false;
    tokenType: T;
    headers: Headers;
    token: null;
    toAuth: ToAuth<T, false>;
};
export type HandshakeState = Omit<UnauthenticatedState<SessionTokenType>, 'status' | 'toAuth' | 'tokenType'> & {
    tokenType: SessionTokenType;
    status: typeof AuthStatus.Handshake;
    headers: Headers;
    toAuth: () => null;
};
/**
 * @deprecated Use AuthenticatedState instead
 */
export type SignedInState = AuthenticatedState<SessionTokenType>;
/**
 * @deprecated Use UnauthenticatedState instead
 */
export type SignedOutState = UnauthenticatedState<SessionTokenType>;
export declare const AuthErrorReason: {
    readonly ClientUATWithoutSessionToken: "client-uat-but-no-session-token";
    readonly DevBrowserMissing: "dev-browser-missing";
    readonly DevBrowserSync: "dev-browser-sync";
    readonly PrimaryRespondsToSyncing: "primary-responds-to-syncing";
    readonly PrimaryDomainCrossOriginSync: "primary-domain-cross-origin-sync";
    readonly SatelliteCookieNeedsSyncing: "satellite-needs-syncing";
    readonly SessionTokenAndUATMissing: "session-token-and-uat-missing";
    readonly SessionTokenMissing: "session-token-missing";
    readonly SessionTokenExpired: "session-token-expired";
    readonly SessionTokenIATBeforeClientUAT: "session-token-iat-before-client-uat";
    readonly SessionTokenNBF: "session-token-nbf";
    readonly SessionTokenIatInTheFuture: "session-token-iat-in-the-future";
    readonly SessionTokenWithoutClientUAT: "session-token-but-no-client-uat";
    readonly ActiveOrganizationMismatch: "active-organization-mismatch";
    readonly TokenTypeMismatch: "token-type-mismatch";
    readonly UnexpectedError: "unexpected-error";
};
export type AuthErrorReason = (typeof AuthErrorReason)[keyof typeof AuthErrorReason];
export type AuthReason = AuthErrorReason | TokenVerificationErrorReason;
export type RequestState<T extends TokenType | null = SessionTokenType> = AuthenticatedState<T extends null ? never : T> | UnauthenticatedState<T> | (T extends SessionTokenType ? HandshakeState : never);
type BaseSignedInParams = {
    authenticateContext: AuthenticateContext;
    headers?: Headers;
    token: string;
    tokenType: TokenType;
};
type SignedInParams = (BaseSignedInParams & {
    tokenType: SessionTokenType;
    sessionClaims: JwtPayload;
}) | (BaseSignedInParams & {
    tokenType: MachineTokenType;
    machineData: MachineAuthType;
});
export declare function signedIn<T extends TokenType>(params: SignedInParams & {
    tokenType: T;
}): AuthenticatedState<T>;
type SignedOutParams = Omit<BaseSignedInParams, 'token'> & {
    reason: AuthReason;
    message?: string;
};
export declare function signedOut<T extends TokenType>(params: SignedOutParams & {
    tokenType: T;
}): UnauthenticatedState<T>;
export declare function handshake(authenticateContext: AuthenticateContext, reason: AuthReason, message: string | undefined, headers: Headers): HandshakeState;
export declare function signedOutInvalidToken(): UnauthenticatedState<null>;
export {};
//# sourceMappingURL=authStatus.d.ts.map