type Falsy = false | 0 | '' | null | undefined;

type Primitive = string | number | symbol | bigint | boolean | undefined | null;

type Primitivity<T> = T extends Functionally
  ? ReturnType<T>
  : T extends Primitive
    ? T
    : T extends Array<infer U>
      ? U
      : T extends { [K in RecordKey]: infer U }
        ? U
        : T;
