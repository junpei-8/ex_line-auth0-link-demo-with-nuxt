import { messagingApi } from '@line/bot-sdk';
import { $env } from '../../^env/shell';

// 1. Setup LINE Messaging API client
if (!$env.LINE_CHANNEL_ACCESS_TOKEN) {
  throw new Error(
    '"LINE_CHANNEL_ACCESS_TOKEN" environment variable is required',
  );
}

export const client = new messagingApi.MessagingApiClient({
  channelAccessToken: $env.LINE_CHANNEL_ACCESS_TOKEN,
});

export const blobClient = new messagingApi.MessagingApiBlobClient({
  channelAccessToken: $env.LINE_CHANNEL_ACCESS_TOKEN,
});
