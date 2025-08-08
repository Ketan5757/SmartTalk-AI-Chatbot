import { EmailAddress } from './EmailAddress';
import { ExternalAccount } from './ExternalAccount';
import type { UserJSON } from './JSON';
import { PhoneNumber } from './PhoneNumber';
import { SamlAccount } from './SamlAccount';
import { Web3Wallet } from './Web3Wallet';
/**
 * The Backend `User` object is similar to the `User` object as it holds information about a user of your application, such as their unique identifier, name, email addresses, phone numbers, and more. However, the Backend `User` object is different from the `User` object in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/Users#operation/GetUser){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 */
export declare class User {
    /**
     * The unique identifier for the user.
     */
    readonly id: string;
    /**
     * A boolean indicating whether the user has a password on their account.
     */
    readonly passwordEnabled: boolean;
    /**
     * A boolean indicating whether the user has enabled TOTP by generating a TOTP secret and verifying it via an authenticator app.
     */
    readonly totpEnabled: boolean;
    /**
     * A boolean indicating whether the user has enabled Backup codes.
     */
    readonly backupCodeEnabled: boolean;
    /**
     * A boolean indicating whether the user has enabled two-factor authentication.
     */
    readonly twoFactorEnabled: boolean;
    /**
     * A boolean indicating whether the user is banned or not.
     */
    readonly banned: boolean;
    /**
     * A boolean indicating whether the user is banned or not.
     */
    readonly locked: boolean;
    /**
     * The date when the user was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the user was last updated.
     */
    readonly updatedAt: number;
    /**
     * The URL of the user's profile image.
     */
    readonly imageUrl: string;
    /**
     * A getter boolean to check if the user has uploaded an image or one was copied from OAuth. Returns `false` if Clerk is displaying an avatar for the user.
     */
    readonly hasImage: boolean;
    /**
     * The ID for the `EmailAddress` that the user has set as primary.
     */
    readonly primaryEmailAddressId: string | null;
    /**
     * The ID for the `PhoneNumber` that the user has set as primary.
     */
    readonly primaryPhoneNumberId: string | null;
    /**
     * The ID for the [`Web3Wallet`](https://clerk.com/docs/references/backend/types/backend-web3-wallet) that the user signed up with.
     */
    readonly primaryWeb3WalletId: string | null;
    /**
     * The date when the user last signed in. May be empty if the user has never signed in.
     */
    readonly lastSignInAt: number | null;
    /**
     * The ID of the user as used in your external systems. Must be unique across your instance.
     */
    readonly externalId: string | null;
    /**
     * The user's username.
     */
    readonly username: string | null;
    /**
     * The user's first name.
     */
    readonly firstName: string | null;
    /**
     * The user's last name.
     */
    readonly lastName: string | null;
    /**
     * Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API.
     */
    readonly publicMetadata: UserPublicMetadata;
    /**
     * Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}.
     */
    readonly privateMetadata: UserPrivateMetadata;
    /**
     * Metadata that can be read and set from the Frontend API. It's considered unsafe because it can be modified from the frontend.
     */
    readonly unsafeMetadata: UserUnsafeMetadata;
    /**
     * An array of all the `EmailAddress` objects associated with the user. Includes the primary.
     */
    readonly emailAddresses: EmailAddress[];
    /**
     * An array of all the `PhoneNumber` objects associated with the user. Includes the primary.
     */
    readonly phoneNumbers: PhoneNumber[];
    /**
     * An array of all the `Web3Wallet` objects associated with the user. Includes the primary.
     */
    readonly web3Wallets: Web3Wallet[];
    /**
     * An array of all the `ExternalAccount` objects associated with the user via OAuth. **Note**: This includes both verified & unverified external accounts.
     */
    readonly externalAccounts: ExternalAccount[];
    /**
     * An array of all the `SamlAccount` objects associated with the user via SAML.
     */
    readonly samlAccounts: SamlAccount[];
    /**
     * Date when the user was last active.
     */
    readonly lastActiveAt: number | null;
    /**
     * A boolean indicating whether the organization creation is enabled for the user or not.
     */
    readonly createOrganizationEnabled: boolean;
    /**
     * An integer indicating the number of organizations that can be created by the user. If the value is `0`, then the user can create unlimited organizations. Default is `null`.
     */
    readonly createOrganizationsLimit: number | null;
    /**
     * A boolean indicating whether the user can delete their own account.
     */
    readonly deleteSelfEnabled: boolean;
    /**
     * The unix timestamp of when the user accepted the legal requirements. `null` if [**Require express consent to legal documents**](https://clerk.com/docs/authentication/configuration/legal-compliance) is not enabled.
     */
    readonly legalAcceptedAt: number | null;
    private _raw;
    get raw(): UserJSON | null;
    constructor(
    /**
     * The unique identifier for the user.
     */
    id: string, 
    /**
     * A boolean indicating whether the user has a password on their account.
     */
    passwordEnabled: boolean, 
    /**
     * A boolean indicating whether the user has enabled TOTP by generating a TOTP secret and verifying it via an authenticator app.
     */
    totpEnabled: boolean, 
    /**
     * A boolean indicating whether the user has enabled Backup codes.
     */
    backupCodeEnabled: boolean, 
    /**
     * A boolean indicating whether the user has enabled two-factor authentication.
     */
    twoFactorEnabled: boolean, 
    /**
     * A boolean indicating whether the user is banned or not.
     */
    banned: boolean, 
    /**
     * A boolean indicating whether the user is banned or not.
     */
    locked: boolean, 
    /**
     * The date when the user was first created.
     */
    createdAt: number, 
    /**
     * The date when the user was last updated.
     */
    updatedAt: number, 
    /**
     * The URL of the user's profile image.
     */
    imageUrl: string, 
    /**
     * A getter boolean to check if the user has uploaded an image or one was copied from OAuth. Returns `false` if Clerk is displaying an avatar for the user.
     */
    hasImage: boolean, 
    /**
     * The ID for the `EmailAddress` that the user has set as primary.
     */
    primaryEmailAddressId: string | null, 
    /**
     * The ID for the `PhoneNumber` that the user has set as primary.
     */
    primaryPhoneNumberId: string | null, 
    /**
     * The ID for the [`Web3Wallet`](https://clerk.com/docs/references/backend/types/backend-web3-wallet) that the user signed up with.
     */
    primaryWeb3WalletId: string | null, 
    /**
     * The date when the user last signed in. May be empty if the user has never signed in.
     */
    lastSignInAt: number | null, 
    /**
     * The ID of the user as used in your external systems. Must be unique across your instance.
     */
    externalId: string | null, 
    /**
     * The user's username.
     */
    username: string | null, 
    /**
     * The user's first name.
     */
    firstName: string | null, 
    /**
     * The user's last name.
     */
    lastName: string | null, 
    /**
     * Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }} and can be set only from the Backend API.
     */
    publicMetadata: UserPublicMetadata | undefined, 
    /**
     * Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}.
     */
    privateMetadata: UserPrivateMetadata | undefined, 
    /**
     * Metadata that can be read and set from the Frontend API. It's considered unsafe because it can be modified from the frontend.
     */
    unsafeMetadata: UserUnsafeMetadata | undefined, 
    /**
     * An array of all the `EmailAddress` objects associated with the user. Includes the primary.
     */
    emailAddresses: EmailAddress[] | undefined, 
    /**
     * An array of all the `PhoneNumber` objects associated with the user. Includes the primary.
     */
    phoneNumbers: PhoneNumber[] | undefined, 
    /**
     * An array of all the `Web3Wallet` objects associated with the user. Includes the primary.
     */
    web3Wallets: Web3Wallet[] | undefined, 
    /**
     * An array of all the `ExternalAccount` objects associated with the user via OAuth. **Note**: This includes both verified & unverified external accounts.
     */
    externalAccounts: ExternalAccount[] | undefined, 
    /**
     * An array of all the `SamlAccount` objects associated with the user via SAML.
     */
    samlAccounts: SamlAccount[] | undefined, 
    /**
     * Date when the user was last active.
     */
    lastActiveAt: number | null, 
    /**
     * A boolean indicating whether the organization creation is enabled for the user or not.
     */
    createOrganizationEnabled: boolean, 
    /**
     * An integer indicating the number of organizations that can be created by the user. If the value is `0`, then the user can create unlimited organizations. Default is `null`.
     */
    createOrganizationsLimit: number | null | undefined, 
    /**
     * A boolean indicating whether the user can delete their own account.
     */
    deleteSelfEnabled: boolean, 
    /**
     * The unix timestamp of when the user accepted the legal requirements. `null` if [**Require express consent to legal documents**](https://clerk.com/docs/authentication/configuration/legal-compliance) is not enabled.
     */
    legalAcceptedAt: number | null);
    static fromJSON(data: UserJSON): User;
    /**
     * The primary email address of the user.
     */
    get primaryEmailAddress(): EmailAddress | null;
    /**
     * The primary phone number of the user.
     */
    get primaryPhoneNumber(): PhoneNumber | null;
    /**
     * The primary web3 wallet of the user.
     */
    get primaryWeb3Wallet(): Web3Wallet | null;
    /**
     * The full name of the user.
     */
    get fullName(): string | null;
}
//# sourceMappingURL=User.d.ts.map