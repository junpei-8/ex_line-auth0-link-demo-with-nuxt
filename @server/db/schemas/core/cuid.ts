import { createId } from '@paralleldrive/cuid2';
import { text } from 'drizzle-orm/sqlite-core';
import type { SQLiteTextConfig } from 'drizzle-orm/sqlite-core';

export function cuid(
  name: string,
  config?: SQLiteTextConfig<'text', undefined>,
) {
  const textType = text(name, { mode: 'text', length: 128, ...config });

  function defaultRandom() {
    return textType.$defaultFn(createId);
  }

  // @ts-expect-error: Property 'defaultRandom' does not exist on type 'TextType'.
  textType.defaultRandom = defaultRandom;

  return textType as typeof textType & { defaultRandom: typeof defaultRandom };
}
