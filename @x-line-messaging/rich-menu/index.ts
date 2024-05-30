/**
 * @see {@link https://github.com/line/line-bot-sdk-nodejs} Documents
 * @see {@link https://github.com/line/line-bot-sdk-nodejs/blob/master/examples/rich-menu/index.js} Rich Menu Example
 */

import { renderRichMenuA } from './view/rich-menu-a';
import { renderRichMenuB } from './view/rich-menu-b';

console.log('\n🚀 Line Rich Menu Deploy Started...');

await Promise.all([
  // Render Rich Menus
  renderRichMenuA(),
  renderRichMenuB(),
]);

console.log('⭐️ Line Rich Menu Deploy Successfully.');
