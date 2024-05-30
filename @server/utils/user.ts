/**
 * `auth.sub` から Prefix を取り除いたユーザー ID を取得する
 *
 * @param auth 認証情報
 */
export function getUserId(auth: Auth) {
  const prefixIndex = auth.sub.indexOf('|') || auth.sub.indexOf('%7C');
  return prefixIndex === -1 ? auth.sub : auth.sub.slice(prefixIndex + 1);
}

/**
 * ID から Prefix のインデックスを取得する
 *
 * @param id
 */
export function getUserIdPrefixIndex(id: string) {
  return id.indexOf('|') || id.indexOf('%7C');
}
