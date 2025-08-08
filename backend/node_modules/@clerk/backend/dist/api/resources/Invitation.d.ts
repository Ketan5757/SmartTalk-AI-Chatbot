import type { InvitationStatus } from './Enums';
import type { InvitationJSON } from './JSON';
/**
 * The Backend `Invitation` object represents an invitation to join your application.
 */
export declare class Invitation {
    /**
     * The unique identifier for the `Invitation`.
     */
    readonly id: string;
    /**
     * The email address that the invitation was sent to.
     */
    readonly emailAddress: string;
    /**
     * [Metadata](https://clerk.com/docs/references/javascript/types/metadata#user-public-metadata){{ target: '_blank' }} that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API. Once the user accepts the invitation and signs up, these metadata will end up in the user's public metadata.
     */
    readonly publicMetadata: Record<string, unknown> | null;
    /**
     * The date when the `Invitation` was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the `Invitation` was last updated.
     */
    readonly updatedAt: number;
    /**
     * The status of the `Invitation`.
     */
    readonly status: InvitationStatus;
    /**
     * The URL that the user can use to accept the invitation.
     */
    readonly url?: string | undefined;
    /**
     * Whether the `Invitation` has been revoked.
     */
    readonly revoked?: boolean | undefined;
    private _raw;
    get raw(): InvitationJSON | null;
    constructor(
    /**
     * The unique identifier for the `Invitation`.
     */
    id: string, 
    /**
     * The email address that the invitation was sent to.
     */
    emailAddress: string, 
    /**
     * [Metadata](https://clerk.com/docs/references/javascript/types/metadata#user-public-metadata){{ target: '_blank' }} that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API. Once the user accepts the invitation and signs up, these metadata will end up in the user's public metadata.
     */
    publicMetadata: Record<string, unknown> | null, 
    /**
     * The date when the `Invitation` was first created.
     */
    createdAt: number, 
    /**
     * The date when the `Invitation` was last updated.
     */
    updatedAt: number, 
    /**
     * The status of the `Invitation`.
     */
    status: InvitationStatus, 
    /**
     * The URL that the user can use to accept the invitation.
     */
    url?: string | undefined, 
    /**
     * Whether the `Invitation` has been revoked.
     */
    revoked?: boolean | undefined);
    static fromJSON(data: InvitationJSON): Invitation;
}
//# sourceMappingURL=Invitation.d.ts.map