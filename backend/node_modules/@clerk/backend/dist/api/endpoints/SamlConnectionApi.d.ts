import type { ClerkPaginationRequest, SamlIdpSlug } from '@clerk/types';
import type { SamlConnection } from '../resources';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import { AbstractAPI } from './AbstractApi';
import type { WithSign } from './util-types';
type SamlConnectionListParams = ClerkPaginationRequest<{
    /**
     * Returns SAML connections that have a name that matches the given query, via case-insensitive partial match.
     */
    query?: string;
    /**
     * Sorts SAML connections by phone_number, email_address, created_at, first_name, last_name or username.
     * By prepending one of those values with + or -, we can choose to sort in ascending (ASC) or descending (DESC) order.
     */
    orderBy?: WithSign<'phone_number' | 'email_address' | 'created_at' | 'first_name' | 'last_name' | 'username'>;
    /**
     * Returns SAML connections that have an associated organization ID to the given organizations.
     * For each organization id, the + and - can be prepended to the id, which denote whether the
     * respective organization should be included or excluded from the result set. Accepts up to 100 organization ids.
     */
    organizationId?: WithSign<string>[];
}>;
type CreateSamlConnectionParams = {
    name: string;
    provider: SamlIdpSlug;
    domain: string;
    organizationId?: string;
    idpEntityId?: string;
    idpSsoUrl?: string;
    idpCertificate?: string;
    idpMetadataUrl?: string;
    idpMetadata?: string;
    attributeMapping?: {
        emailAddress?: string;
        firstName?: string;
        lastName?: string;
        userId?: string;
    };
};
type UpdateSamlConnectionParams = {
    name?: string;
    provider?: SamlIdpSlug;
    domain?: string;
    organizationId?: string;
    idpEntityId?: string;
    idpSsoUrl?: string;
    idpCertificate?: string;
    idpMetadataUrl?: string;
    idpMetadata?: string;
    attributeMapping?: {
        emailAddress?: string;
        firstName?: string;
        lastName?: string;
        userId?: string;
    };
    active?: boolean;
    syncUserAttributes?: boolean;
    allowSubdomains?: boolean;
    allowIdpInitiated?: boolean;
};
export declare class SamlConnectionAPI extends AbstractAPI {
    getSamlConnectionList(params?: SamlConnectionListParams): Promise<PaginatedResourceResponse<SamlConnection[]>>;
    createSamlConnection(params: CreateSamlConnectionParams): Promise<SamlConnection>;
    getSamlConnection(samlConnectionId: string): Promise<SamlConnection>;
    updateSamlConnection(samlConnectionId: string, params?: UpdateSamlConnectionParams): Promise<SamlConnection>;
    deleteSamlConnection(samlConnectionId: string): Promise<SamlConnection>;
}
export {};
//# sourceMappingURL=SamlConnectionApi.d.ts.map