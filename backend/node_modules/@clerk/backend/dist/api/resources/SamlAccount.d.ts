import type { SamlAccountJSON } from './JSON';
import { SamlAccountConnection } from './SamlConnection';
import { Verification } from './Verification';
/**
 * The Backend `SamlAccount` object describes a SAML account.
 */
export declare class SamlAccount {
    /**
     * The unique identifier for the SAML account.
     */
    readonly id: string;
    /**
     * The provider of the SAML account.
     */
    readonly provider: string;
    /**
     * The user's ID as used in the provider.
     */
    readonly providerUserId: string | null;
    /**
     * A boolean that indicates whether the SAML account is active.
     */
    readonly active: boolean;
    /**
     * The email address of the SAML account.
     */
    readonly emailAddress: string;
    /**
     * The first name of the SAML account.
     */
    readonly firstName: string;
    /**
     * The last name of the SAML account.
     */
    readonly lastName: string;
    /**
     * The verification of the SAML account.
     */
    readonly verification: Verification | null;
    /**
     * The SAML connection of the SAML account.
     */
    readonly samlConnection: SamlAccountConnection | null;
    constructor(
    /**
     * The unique identifier for the SAML account.
     */
    id: string, 
    /**
     * The provider of the SAML account.
     */
    provider: string, 
    /**
     * The user's ID as used in the provider.
     */
    providerUserId: string | null, 
    /**
     * A boolean that indicates whether the SAML account is active.
     */
    active: boolean, 
    /**
     * The email address of the SAML account.
     */
    emailAddress: string, 
    /**
     * The first name of the SAML account.
     */
    firstName: string, 
    /**
     * The last name of the SAML account.
     */
    lastName: string, 
    /**
     * The verification of the SAML account.
     */
    verification: Verification | null, 
    /**
     * The SAML connection of the SAML account.
     */
    samlConnection: SamlAccountConnection | null);
    static fromJSON(data: SamlAccountJSON): SamlAccount;
}
//# sourceMappingURL=SamlAccount.d.ts.map