import type { OrganizationJSON } from './JSON';
/**
 * The Backend `Organization` object is similar to the [`Organization`](https://clerk.com/docs/references/javascript/organization) object as it holds information about an organization, as well as methods for managing it. However, the Backend `Organization` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/ListOrganizations){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 */
export declare class Organization {
    /**
     * The unique identifier for the organization.
     */
    readonly id: string;
    /**
     * The name of the organization.
     */
    readonly name: string;
    /**
     * The URL-friendly identifier of the user's active organization. If supplied, it must be unique for the instance.
     */
    readonly slug: string;
    /**
     * Holds the organization's logo. Compatible with Clerk's [Image Optimization](https://clerk.com/docs/guides/image-optimization).
     */
    readonly imageUrl: string;
    /**
     * Whether the organization has an image.
     */
    readonly hasImage: boolean;
    /**
     * The date when the organization was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the organization was last updated.
     */
    readonly updatedAt: number;
    /**
     * Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API.
     */
    readonly publicMetadata: OrganizationPublicMetadata | null;
    /**
     * Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}.
     */
    readonly privateMetadata: OrganizationPrivateMetadata;
    /**
     * The maximum number of memberships allowed in the organization.
     */
    readonly maxAllowedMemberships: number;
    /**
     * Whether the organization allows admins to delete users.
     */
    readonly adminDeleteEnabled: boolean;
    /**
     * The number of members in the organization.
     */
    readonly membersCount?: number | undefined;
    /**
     * The ID of the user who created the organization.
     */
    readonly createdBy?: string | undefined;
    private _raw;
    get raw(): OrganizationJSON | null;
    constructor(
    /**
     * The unique identifier for the organization.
     */
    id: string, 
    /**
     * The name of the organization.
     */
    name: string, 
    /**
     * The URL-friendly identifier of the user's active organization. If supplied, it must be unique for the instance.
     */
    slug: string, 
    /**
     * Holds the organization's logo. Compatible with Clerk's [Image Optimization](https://clerk.com/docs/guides/image-optimization).
     */
    imageUrl: string, 
    /**
     * Whether the organization has an image.
     */
    hasImage: boolean, 
    /**
     * The date when the organization was first created.
     */
    createdAt: number, 
    /**
     * The date when the organization was last updated.
     */
    updatedAt: number, 
    /**
     * Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API.
     */
    publicMetadata: (OrganizationPublicMetadata | null) | undefined, 
    /**
     * Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}.
     */
    privateMetadata: OrganizationPrivateMetadata | undefined, 
    /**
     * The maximum number of memberships allowed in the organization.
     */
    maxAllowedMemberships: number, 
    /**
     * Whether the organization allows admins to delete users.
     */
    adminDeleteEnabled: boolean, 
    /**
     * The number of members in the organization.
     */
    membersCount?: number | undefined, 
    /**
     * The ID of the user who created the organization.
     */
    createdBy?: string | undefined);
    static fromJSON(data: OrganizationJSON): Organization;
}
//# sourceMappingURL=Organization.d.ts.map