import { readFileSync } from 'fs';
import { join } from 'path';
import { blobClient, client } from '../../utils/client';
import { richMenuBAliasId } from './rich-menu-b';

export const richMenuAAliasId = 'rich-menu-alias-a';

export async function renderRichMenuA() {
  const richMenuAliasId = richMenuAAliasId;

  // 1. Delete Already rich menu Alias
  const alreadyRichMenuAlias = await client
    .getRichMenuAlias(richMenuAliasId)
    .catch(() => null);

  if (alreadyRichMenuAlias) {
    await Promise.all([
      client.deleteRichMenu(alreadyRichMenuAlias.richMenuId),
      client.deleteRichMenuAlias(alreadyRichMenuAlias.richMenuAliasId),
    ]);
  }

  // 2. Create rich menu
  const { richMenuId } = await client.createRichMenu({
    name: 'rich-menu-a',
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    chatBarText: 'メニュー',
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 1250,
          height: 1686,
        },
        action: {
          type: 'uri',
          uri: 'https://liff.line.me/2005255316-w8rBNrbm',
        },
      },
      {
        bounds: {
          x: 1251,
          y: 0,
          width: 1250,
          height: 1686,
        },
        action: {
          type: 'richmenuswitch',
          richMenuAliasId: richMenuBAliasId,
          data: 'rich-menu-a-to-b',
        },
      },
    ],
  });

  // 3. Upload image to rich menu
  await blobClient.setRichMenuImage(
    richMenuId,
    new Blob(
      [readFileSync(join(import.meta.dirname, '../images/rich-menu-a.png'))],
      { type: 'image/png' },
    ),
  );

  // 4. Set rich menu as the default rich menu
  await client.setDefaultRichMenu(richMenuId);

  // 5. Create rich menu Alias
  await client.createRichMenuAlias({ richMenuId, richMenuAliasId });
}
