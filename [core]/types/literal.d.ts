type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);

type Literal<T extends string | number> = T | Omit<T, T>;
