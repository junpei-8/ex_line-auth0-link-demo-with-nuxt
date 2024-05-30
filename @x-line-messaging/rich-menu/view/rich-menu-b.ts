import { readFileSync } from 'fs';
import { join } from 'path';
import { blobClient, client } from '../../utils/client';
import { richMenuAAliasId } from './rich-menu-a';

export const richMenuBAliasId = 'rich-menu-alias-b';

export async function renderRichMenuB() {
  const richMenuAliasId = richMenuBAliasId;

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
    name: 'rich-menu-b',
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
          type: 'richmenuswitch',
          richMenuAliasId: richMenuAAliasId,
          data: 'rich-menu-b-to-a',
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
          type: 'uri',
          uri: 'https://liff.line.me/2005255316-w8rBNrbm',
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

  // 4. Create rich menu Alias
  await client.createRichMenuAlias({ richMenuId, richMenuAliasId });
}
