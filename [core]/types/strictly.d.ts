type Strictly<T> = T extends Builtin
  ? T
  : { [K in keyof T]: K extends keyof T ? T[K] : never };

type DeepStrictly<T> = T extends Builtin
  ? T
  : { [K in keyof T]: K extends keyof T ? DeepStrictly<T[K]> : never };

type StrictlyExclude<T, U extends T> = Exclude<T, U>;
type StrictlyExtract<T, U extends T> = Extract<T, U>;
type StrictlyOmit<T, K extends keyof T> = Omit<T, K>;
