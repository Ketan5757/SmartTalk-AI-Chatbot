import type { APIKeyJSON } from './JSON';
export declare class APIKey {
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly subject: string;
    readonly scopes: string[];
    readonly claims: Record<string, any> | null;
    readonly revoked: boolean;
    readonly revocationReason: string | null;
    readonly expired: boolean;
    readonly expiration: number | null;
    readonly createdBy: string | null;
    readonly description: string | null;
    readonly lastUsedAt: number | null;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly secret?: string | undefined;
    constructor(id: string, type: string, name: string, subject: string, scopes: string[], claims: Record<string, any> | null, revoked: boolean, revocationReason: string | null, expired: boolean, expiration: number | null, createdBy: string | null, description: string | null, lastUsedAt: number | null, createdAt: number, updatedAt: number, secret?: string | undefined);
    static fromJSON(data: APIKeyJSON): APIKey;
}
//# sourceMappingURL=APIKey.d.ts.map