import configPromise from '@payload-config';
import { getPayload, type Payload } from 'payload';

let payloadClient: Promise<Payload> | null = null;

export function getPayloadClient() {
  if (!payloadClient) {
    payloadClient = getPayload({
      config: configPromise,
    });
  }

  return payloadClient;
}
