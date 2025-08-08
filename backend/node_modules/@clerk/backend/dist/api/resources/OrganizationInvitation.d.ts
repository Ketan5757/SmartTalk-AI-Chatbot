import type { OrganizationInvitationStatus, OrganizationMembershipRole } from './Enums';
import type { OrganizationInvitationJSON, PublicOrganizationDataJSON } from './JSON';
/**
 * The Backend `OrganizationInvitation` object is similar to the [`OrganizationInvitation`](https://clerk.com/docs/references/javascript/types/organization-invitation) object as it's the model around an organization invitation. However, the Backend `OrganizationInvitation` object is different in that it's used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations#operation/CreateOrganizationInvitation){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 */
export declare class OrganizationInvitation {
    /**
     * The unique identifier for the `OrganizationInvitation`.
     */
    readonly id: string;
    /**
     * The email address of the user who is invited to the [`Organization`](https://clerk.com/docs/references/backend/types/backend-organization).
     */
    readonly emailAddress: string;
    /**
     * The role of the invited user.
     */
    readonly role: OrganizationMembershipRole;
    /**
     * The name of the role of the invited user.
     */
    readonly roleName: string;
    /**
     * The ID of the [`Organization`](https://clerk.com/docs/references/backend/types/backend-organization) that the user is invited to.
     */
    readonly organizationId: string;
    /**
     * The date when the invitation was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the invitation was last updated.
     */
    readonly updatedAt: number;
    /**
     * The date when the invitation expires.
     */
    readonly expiresAt: number;
    /**
     * The URL that the user can use to accept the invitation.
     */
    readonly url: string | null;
    /**
     * The status of the invitation.
     */
    readonly status?: OrganizationInvitationStatus | undefined;
    /**
     * Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API.
     */
    readonly publicMetadata: OrganizationInvitationPublicMetadata;
    /**
     * Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}.
     */
    readonly privateMetadata: OrganizationInvitationPrivateMetadata;
    /**
     * Public data about the organization that the user is invited to.
     */
    readonly publicOrganizationData?: (PublicOrganizationDataJSON | null) | undefined;
    private _raw;
    get raw(): OrganizationInvitationJSON | null;
    constructor(
    /**
     * The unique identifier for the `OrganizationInvitation`.
     */
    id: string, 
    /**
     * The email address of the user who is invited to the [`Organization`](https://clerk.com/docs/references/backend/types/backend-organization).
     */
    emailAddress: string, 
    /**
     * The role of the invited user.
     */
    role: OrganizationMembershipRole, 
    /**
     * The name of the role of the invited user.
     */
    roleName: string, 
    /**
     * The ID of the [`Organization`](https://clerk.com/docs/references/backend/types/backend-organization) that the user is invited to.
     */
    organizationId: string, 
    /**
     * The date when the invitation was first created.
     */
    createdAt: number, 
    /**
     * The date when the invitation was last updated.
     */
    updatedAt: number, 
    /**
     * The date when the invitation expires.
     */
    expiresAt: number, 
    /**
     * The URL that the user can use to accept the invitation.
     */
    url: string | null, 
    /**
     * The status of the invitation.
     */
    status?: OrganizationInvitationStatus | undefined, 
    /**
     * Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API.
     */
    publicMetadata?: OrganizationInvitationPublicMetadata, 
    /**
     * Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}.
     */
    privateMetadata?: OrganizationInvitationPrivateMetadata, 
    /**
     * Public data about the organization that the user is invited to.
     */
    publicOrganizationData?: (PublicOrganizationDataJSON | null) | undefined);
    static fromJSON(data: OrganizationInvitationJSON): OrganizationInvitation;
}
//# sourceMappingURL=OrganizationInvitation.d.ts.map