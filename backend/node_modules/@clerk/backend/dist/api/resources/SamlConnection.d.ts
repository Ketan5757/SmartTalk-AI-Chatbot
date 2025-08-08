import type { AttributeMappingJSON, SamlAccountConnectionJSON, SamlConnectionJSON } from './JSON';
/**
 * The Backend `SamlConnection` object holds information about a SAML connection for an organization.
 */
export declare class SamlConnection {
    /**
     * The unique identifier for the connection.
     */
    readonly id: string;
    /**
     * The name to use as a label for the connection.
     */
    readonly name: string;
    /**
     * The domain of your organization. Sign in flows using an email with this domain will use the connection.
     */
    readonly domain: string;
    /**
     * The organization ID of the organization.
     */
    readonly organizationId: string | null;
    /**
     * The Entity ID as provided by the Identity Provider (IdP).
     */
    readonly idpEntityId: string | null;
    /**
     * The Single-Sign On URL as provided by the Identity Provider (IdP).
     */
    readonly idpSsoUrl: string | null;
    /**
     * The X.509 certificate as provided by the Identity Provider (IdP).
     */
    readonly idpCertificate: string | null;
    /**
     * The URL which serves the Identity Provider (IdP) metadata. If present, it takes priority over the corresponding individual properties.
     */
    readonly idpMetadataUrl: string | null;
    /**
     * The XML content of the Identity Provider (IdP) metadata file. If present, it takes priority over the corresponding individual properties.
     */
    readonly idpMetadata: string | null;
    /**
     * The Assertion Consumer Service (ACS) URL of the connection.
     */
    readonly acsUrl: string;
    /**
     * The Entity ID as provided by the Service Provider (Clerk).
     */
    readonly spEntityId: string;
    /**
     * The metadata URL as provided by the Service Provider (Clerk).
     */
    readonly spMetadataUrl: string;
    /**
     * Indicates whether the connection is active or not.
     */
    readonly active: boolean;
    /**
     * The Identity Provider (IdP) of the connection.
     */
    readonly provider: string;
    /**
     * The number of users associated with the connection.
     */
    readonly userCount: number;
    /**
     * Indicates whether the connection syncs user attributes between the Service Provider (SP) and Identity Provider (IdP) or not.
     */
    readonly syncUserAttributes: boolean;
    /**
     * Indicates whether users with an email address subdomain are allowed to use this connection in order to authenticate or not.
     */
    readonly allowSubdomains: boolean;
    /**
     * Indicates whether the connection allows Identity Provider (IdP) initiated flows or not.
     */
    readonly allowIdpInitiated: boolean;
    /**
     * The date when the connection was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the SAML connection was last updated.
     */
    readonly updatedAt: number;
    /**
     * Defines the attribute name mapping between the Identity Provider (IdP) and Clerk's [`User`](https://clerk.com/docs/references/javascript/user) properties.
     */
    readonly attributeMapping: AttributeMapping;
    constructor(
    /**
     * The unique identifier for the connection.
     */
    id: string, 
    /**
     * The name to use as a label for the connection.
     */
    name: string, 
    /**
     * The domain of your organization. Sign in flows using an email with this domain will use the connection.
     */
    domain: string, 
    /**
     * The organization ID of the organization.
     */
    organizationId: string | null, 
    /**
     * The Entity ID as provided by the Identity Provider (IdP).
     */
    idpEntityId: string | null, 
    /**
     * The Single-Sign On URL as provided by the Identity Provider (IdP).
     */
    idpSsoUrl: string | null, 
    /**
     * The X.509 certificate as provided by the Identity Provider (IdP).
     */
    idpCertificate: string | null, 
    /**
     * The URL which serves the Identity Provider (IdP) metadata. If present, it takes priority over the corresponding individual properties.
     */
    idpMetadataUrl: string | null, 
    /**
     * The XML content of the Identity Provider (IdP) metadata file. If present, it takes priority over the corresponding individual properties.
     */
    idpMetadata: string | null, 
    /**
     * The Assertion Consumer Service (ACS) URL of the connection.
     */
    acsUrl: string, 
    /**
     * The Entity ID as provided by the Service Provider (Clerk).
     */
    spEntityId: string, 
    /**
     * The metadata URL as provided by the Service Provider (Clerk).
     */
    spMetadataUrl: string, 
    /**
     * Indicates whether the connection is active or not.
     */
    active: boolean, 
    /**
     * The Identity Provider (IdP) of the connection.
     */
    provider: string, 
    /**
     * The number of users associated with the connection.
     */
    userCount: number, 
    /**
     * Indicates whether the connection syncs user attributes between the Service Provider (SP) and Identity Provider (IdP) or not.
     */
    syncUserAttributes: boolean, 
    /**
     * Indicates whether users with an email address subdomain are allowed to use this connection in order to authenticate or not.
     */
    allowSubdomains: boolean, 
    /**
     * Indicates whether the connection allows Identity Provider (IdP) initiated flows or not.
     */
    allowIdpInitiated: boolean, 
    /**
     * The date when the connection was first created.
     */
    createdAt: number, 
    /**
     * The date when the SAML connection was last updated.
     */
    updatedAt: number, 
    /**
     * Defines the attribute name mapping between the Identity Provider (IdP) and Clerk's [`User`](https://clerk.com/docs/references/javascript/user) properties.
     */
    attributeMapping: AttributeMapping);
    static fromJSON(data: SamlConnectionJSON): SamlConnection;
}
export declare class SamlAccountConnection {
    readonly id: string;
    readonly name: string;
    readonly domain: string;
    readonly active: boolean;
    readonly provider: string;
    readonly syncUserAttributes: boolean;
    readonly allowSubdomains: boolean;
    readonly allowIdpInitiated: boolean;
    readonly createdAt: number;
    readonly updatedAt: number;
    constructor(id: string, name: string, domain: string, active: boolean, provider: string, syncUserAttributes: boolean, allowSubdomains: boolean, allowIdpInitiated: boolean, createdAt: number, updatedAt: number);
    static fromJSON(data: SamlAccountConnectionJSON): SamlAccountConnection;
}
declare class AttributeMapping {
    /**
     * The user ID attribute name.
     */
    readonly userId: string;
    /**
     * The email address attribute name.
     */
    readonly emailAddress: string;
    /**
     * The first name attribute name.
     */
    readonly firstName: string;
    /**
     * The last name attribute name.
     */
    readonly lastName: string;
    constructor(
    /**
     * The user ID attribute name.
     */
    userId: string, 
    /**
     * The email address attribute name.
     */
    emailAddress: string, 
    /**
     * The first name attribute name.
     */
    firstName: string, 
    /**
     * The last name attribute name.
     */
    lastName: string);
    static fromJSON(data: AttributeMappingJSON): AttributeMapping;
}
export {};
//# sourceMappingURL=SamlConnection.d.ts.map