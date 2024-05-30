type ReplaceRouteParams<
  Route extends string,
  From extends string,
  To extends string
> = Route extends `${infer Prefix}/${From}/${infer Rest}`
  ? `${ReplaceRouteParams<`${Prefix}/${To}/${Rest}`, From, To>}`
  : Route extends `${infer Prefix}/${From}`
  ? `${Prefix}/${To}`
  : Route;
