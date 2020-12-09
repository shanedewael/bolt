import { AckHttpFn } from '../utilities';

/**
 * Arguments which listeners and middleware receive to process a hermes http event Slack.
 *
 * The type parameter `Http` represents the entire JSON-encoded request body from Slack.
 */
export interface SlackHttpMiddlewareArgs {
  payload: Http;
  body: this['payload'];
  ack: AckHttpFn;
}

/**
 * A Slack hermes http request wrapped in the standard metadata.
 *
 * This describes the entire JSON-encoded body of a request from Slack hermes http requests.
 */
export interface Http {
  type: 'http';
  method: string;
  path: string;
  headers: object;
  body: string;

  // these will never be present but we need to satisfy the interface
  // TODO(@mbrevoort): fix :)
  is_enterprise_install?: string;
  team?: string;
  user?: string;
  enterprise?: {
    id?: string;
  };
}
