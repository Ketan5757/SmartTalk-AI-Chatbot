import type { APIKey } from '../resources/APIKey';
import { AbstractAPI } from './AbstractApi';
type CreateAPIKeyParams = {
    type?: 'api_key';
    /**
     * API key name
     */
    name: string;
    /**
     * user or organization ID the API key is associated with
     */
    subject: string;
    /**
     * API key description
     */
    description?: string | null;
    claims?: Record<string, any> | null;
    scopes?: string[];
    createdBy?: string | null;
    secondsUntilExpiration?: number | null;
};
type RevokeAPIKeyParams = {
    /**
     * API key ID
     */
    apiKeyId: string;
    /**
     * Reason for revocation
     */
    revocationReason?: string | null;
};
export declare class APIKeysAPI extends AbstractAPI {
    create(params: CreateAPIKeyParams): Promise<APIKey>;
    revoke(params: RevokeAPIKeyParams): Promise<APIKey>;
    getSecret(apiKeyId: string): Promise<{
        secret: string;
    }>;
    verifySecret(secret: string): Promise<APIKey>;
}
export {};
//# sourceMappingURL=APIKeysApi.d.ts.map