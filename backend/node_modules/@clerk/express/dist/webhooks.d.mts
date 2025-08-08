import * as _clerk_backend_webhooks from '@clerk/backend/webhooks';
import { VerifyWebhookOptions } from '@clerk/backend/webhooks';
export * from '@clerk/backend/webhooks';
import { Request } from 'express';

/**
 * Verifies the authenticity of a webhook request using Svix.
 *
 * @param request - The incoming webhook Express Request object
 * @param options - Optional configuration object
 * @param options.signingSecret - Custom signing secret. If not provided, falls back to CLERK_WEBHOOK_SIGNING_SECRET env variable
 * @throws Will throw an error if the webhook signature verification fails
 * @returns A promise that resolves to the verified webhook event data
 *
 * @example
 * ```typescript
 * import { verifyWebhook } from '@clerk/express/webhooks';
 *
 * app.post('/api/webhooks', async (req, res) => {
 *   try {
 *     const evt = await verifyWebhook(req);
 *     // handle event
 *     res.send('Webhook received');
 *   } catch (err) {
 *     res.status(400).send('Webhook verification failed');
 *   }
 * });
 * ```
 *
 * @see {@link https://clerk.com/docs/webhooks/sync-data} to learn more about syncing Clerk data to your application using webhooks
 */
declare function verifyWebhook(req: Request, options?: VerifyWebhookOptions): Promise<_clerk_backend_webhooks.WebhookEvent>;

export { verifyWebhook };
