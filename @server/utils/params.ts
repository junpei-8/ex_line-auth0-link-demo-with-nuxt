/**
 * Event もしくは Auth から userId を取得する。\
 * その際、`me` が指定された場合は Auth の sub を元に userId を取得する。
 */
export function getMyLikelyParam(
  event: { context: { params?: { [key in string]: string } } },
  auth: Auth,
  paramsName: string,
) {
  const param = event.context.params![paramsName];

  if (param === 'me') {
    return getUserId(auth);
  }

  return param;
}
