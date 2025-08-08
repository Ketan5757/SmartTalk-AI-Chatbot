import type { RedirectUrlJSON } from './JSON';
/**
 * Redirect URLs are whitelisted URLs that facilitate secure authentication flows in native applications (e.g. React Native, Expo). In these contexts, Clerk ensures that security-critical nonces are passed only to the whitelisted URLs.

The Backend `RedirectUrl` object represents a redirect URL in your application. This object is used in the Backend API.
 */
export declare class RedirectUrl {
    /**
     * The unique identifier for the redirect URL.
     */
    readonly id: string;
    /**
     * The full URL value prefixed with `https://` or a custom scheme.
     * @example https://my-app.com/oauth-callback
     * @example my-app://oauth-callback
     */
    readonly url: string;
    /**
     * The date when the redirect URL was first created.
     */
    readonly createdAt: number;
    /**
     * The date when the redirect URL was last updated.
     */
    readonly updatedAt: number;
    constructor(
    /**
     * The unique identifier for the redirect URL.
     */
    id: string, 
    /**
     * The full URL value prefixed with `https://` or a custom scheme.
     * @example https://my-app.com/oauth-callback
     * @example my-app://oauth-callback
     */
    url: string, 
    /**
     * The date when the redirect URL was first created.
     */
    createdAt: number, 
    /**
     * The date when the redirect URL was last updated.
     */
    updatedAt: number);
    static fromJSON(data: RedirectUrlJSON): RedirectUrl;
}
//# sourceMappingURL=RedirectUrl.d.ts.map