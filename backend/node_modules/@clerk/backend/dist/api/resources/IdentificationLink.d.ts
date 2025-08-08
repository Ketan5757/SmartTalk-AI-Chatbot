import type { IdentificationLinkJSON } from './JSON';
/**
 * Contains information about any identifications that might be linked to the email address.
 */
export declare class IdentificationLink {
    /**
     * The unique identifier for the identification link.
     */
    readonly id: string;
    /**
     * The type of the identification link, e.g., `"email_address"`, `"phone_number"`, etc.
     */
    readonly type: string;
    constructor(
    /**
     * The unique identifier for the identification link.
     */
    id: string, 
    /**
     * The type of the identification link, e.g., `"email_address"`, `"phone_number"`, etc.
     */
    type: string);
    static fromJSON(data: IdentificationLinkJSON): IdentificationLink;
}
//# sourceMappingURL=IdentificationLink.d.ts.map