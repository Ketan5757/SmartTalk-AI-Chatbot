import type { SessionActivityJSON, SessionJSON } from './JSON';
/**
 * The Backend `SessionActivity` object models the activity of a user session, capturing details such as the device type, browser information, and geographical location.
 */
export declare class SessionActivity {
    /**
     * The unique identifier for the session activity record.
     */
    readonly id: string;
    /**
     * Will be set to `true` if the session activity came from a mobile device. Set to `false` otherwise.
     */
    readonly isMobile: boolean;
    /**
     * The IP address from which this session activity originated.
     */
    readonly ipAddress?: string | undefined;
    /**
     * The city from which this session activity occurred. Resolved by IP address geo-location.
     */
    readonly city?: string | undefined;
    /**
     * The country from which this session activity occurred. Resolved by IP address geo-location.
     */
    readonly country?: string | undefined;
    /**
     * The version of the browser from which this session activity occurred.
     */
    readonly browserVersion?: string | undefined;
    /**
     * The name of the browser from which this session activity occurred.
     */
    readonly browserName?: string | undefined;
    /**
     * The type of the device which was used in this session activity.
     */
    readonly deviceType?: string | undefined;
    constructor(
    /**
     * The unique identifier for the session activity record.
     */
    id: string, 
    /**
     * Will be set to `true` if the session activity came from a mobile device. Set to `false` otherwise.
     */
    isMobile: boolean, 
    /**
     * The IP address from which this session activity originated.
     */
    ipAddress?: string | undefined, 
    /**
     * The city from which this session activity occurred. Resolved by IP address geo-location.
     */
    city?: string | undefined, 
    /**
     * The country from which this session activity occurred. Resolved by IP address geo-location.
     */
    country?: string | undefined, 
    /**
     * The version of the browser from which this session activity occurred.
     */
    browserVersion?: string | undefined, 
    /**
     * The name of the browser from which this session activity occurred.
     */
    browserName?: string | undefined, 
    /**
     * The type of the device which was used in this session activity.
     */
    deviceType?: string | undefined);
    static fromJSON(data: SessionActivityJSON): SessionActivity;
}
/**
 * The Backend `Session` object is similar to the [`Session`](https://clerk.com/docs/references/javascript/session) object as it is an abstraction over an HTTP session and models the period of information exchange between a user and the server. However, the Backend `Session` object is different as it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/Sessions#operation/GetSessionList) and is not directly accessible from the Frontend API.
 */
export declare class Session {
    /**
     * The unique identifier for the `Session`.
     */
    readonly id: string;
    /**
     * The ID of the client associated with the `Session`.
     */
    readonly clientId: string;
    /**
     * The ID of the user associated with the `Session`.
     */
    readonly userId: string;
    /**
     * The current state of the `Session`.
     */
    readonly status: string;
    /**
     * The time the session was last active on the [`Client`](https://clerk.com/docs/references/backend/types/backend-client).
     */
    readonly lastActiveAt: number;
    /**
     * The date when the `Session` will expire.
     */
    readonly expireAt: number;
    /**
     * The date when the `Session` will be abandoned.
     */
    readonly abandonAt: number;
    /**
     * The date when the `Session` was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the `Session` was last updated.
     */
    readonly updatedAt: number;
    /**
     * The ID of the last active organization.
     */
    readonly lastActiveOrganizationId?: string | undefined;
    /**
     * An object that provides additional information about this session, focused around user activity data.
     */
    readonly latestActivity?: SessionActivity | undefined;
    /**
     * The JWT actor for the session. Holds identifier for the user that is impersonating the current user. Read more about [impersonation](https://clerk.com/docs/users/user-impersonation).
     */
    readonly actor: Record<string, unknown> | null;
    constructor(
    /**
     * The unique identifier for the `Session`.
     */
    id: string, 
    /**
     * The ID of the client associated with the `Session`.
     */
    clientId: string, 
    /**
     * The ID of the user associated with the `Session`.
     */
    userId: string, 
    /**
     * The current state of the `Session`.
     */
    status: string, 
    /**
     * The time the session was last active on the [`Client`](https://clerk.com/docs/references/backend/types/backend-client).
     */
    lastActiveAt: number, 
    /**
     * The date when the `Session` will expire.
     */
    expireAt: number, 
    /**
     * The date when the `Session` will be abandoned.
     */
    abandonAt: number, 
    /**
     * The date when the `Session` was first created.
     */
    createdAt: number, 
    /**
     * The date when the `Session` was last updated.
     */
    updatedAt: number, 
    /**
     * The ID of the last active organization.
     */
    lastActiveOrganizationId?: string | undefined, 
    /**
     * An object that provides additional information about this session, focused around user activity data.
     */
    latestActivity?: SessionActivity | undefined, 
    /**
     * The JWT actor for the session. Holds identifier for the user that is impersonating the current user. Read more about [impersonation](https://clerk.com/docs/users/user-impersonation).
     */
    actor?: Record<string, unknown> | null);
    static fromJSON(data: SessionJSON): Session;
}
//# sourceMappingURL=Session.d.ts.map