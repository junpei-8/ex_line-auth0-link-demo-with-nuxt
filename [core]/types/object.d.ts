type RecordKey = string | number | symbol;
type Recordable<V = any> = Record<RecordKey, V>;

type Functionally<R = any> = (...args: any[]) => R;

type Writable<T, K extends keyof T = keyof T> = {
  -readonly [P in K]: T[P];
};

type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${any}` ? K : never]: T[K];
};
