import type { IdPOAuthAccessTokenJSON } from './JSON';
export declare class IdPOAuthAccessToken {
    readonly id: string;
    readonly clientId: string;
    readonly type: string;
    readonly subject: string;
    readonly scopes: string[];
    readonly revoked: boolean;
    readonly revocationReason: string | null;
    readonly expired: boolean;
    readonly expiration: number | null;
    readonly createdAt: number;
    readonly updatedAt: number;
    constructor(id: string, clientId: string, type: string, subject: string, scopes: string[], revoked: boolean, revocationReason: string | null, expired: boolean, expiration: number | null, createdAt: number, updatedAt: number);
    static fromJSON(data: IdPOAuthAccessTokenJSON): IdPOAuthAccessToken;
}
//# sourceMappingURL=IdPOAuthAccessToken.d.ts.map