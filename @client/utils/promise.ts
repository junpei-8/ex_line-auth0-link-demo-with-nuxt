export type GetFirstResolvedPromiseRejectSymbol =
  typeof getFirstResolvedPromiseRejectSymbol;

export const getFirstResolvedPromiseRejectSymbol = Symbol(
  getFirstResolvedPromise.name,
);

export function getFirstResolvedPromise<
  P,
  R extends Awaited<P> | GetFirstResolvedPromiseRejectSymbol,
>(
  promises: P[],
  filter?: (
    result: Awaited<P>,
    reject: GetFirstResolvedPromiseRejectSymbol,
  ) => R,
): Promise<Exclude<R, GetFirstResolvedPromiseRejectSymbol>> {
  return new Promise((resolve, reject) => {
    const promiseLength = promises.length;
    const settled = { value: false };
    const remaining = { count: promiseLength };
    const errors: any[] = [];

    if (remaining.count === 0) {
      reject(new AggregateError(errors, 'All promises were rejected'));
      return;
    }

    for (let i = 0; i < promiseLength; i++) {
      const promise = promises[i];

      if (promise instanceof Promise) {
        promise
          .then((result) =>
            handleFirstResolvedPromiseResult(
              result as Awaited<P>,
              i,
              filter,
              errors,
              remaining,
              settled,
              resolve,
              reject,
            ),
          )
          .catch((error) =>
            handleFirstResolvedPromiseError(
              error,
              i,
              errors,
              remaining,
              settled,
              reject,
            ),
          );

        // This is a type assertion
      } else {
        handleFirstResolvedPromiseResult(
          promise as Awaited<P>,
          i,
          filter,
          errors,
          remaining,
          settled,
          resolve,
          reject,
        );
      }
    }
  });
}

function handleFirstResolvedPromiseResult<
  P,
  R extends Awaited<P> | GetFirstResolvedPromiseRejectSymbol,
>(
  result: Awaited<P>,
  index: number,
  filter:
    | ((result: Awaited<P>, reject: GetFirstResolvedPromiseRejectSymbol) => R)
    | undefined,
  errors: any[],
  remaining: { count: number },
  settled: { value: boolean },
  resolve: (value: Exclude<R, GetFirstResolvedPromiseRejectSymbol>) => void,
  reject: (reason?: any) => void,
) {
  if (settled.value) return;

  if (
    filter &&
    filter(result as any, getFirstResolvedPromiseRejectSymbol) ===
      getFirstResolvedPromiseRejectSymbol
  ) {
    errors[index] = new Error('Filtered out');

    if (--remaining.count === 0) {
      reject(new AggregateError(errors, 'All promises were rejected'));
    }

    return;
  }

  settled.value = true;
  resolve(result as Exclude<R, GetFirstResolvedPromiseRejectSymbol>);
}

function handleFirstResolvedPromiseError(
  error: any,
  index: number,
  errors: any[],
  remaining: { count: number },
  settled: { value: boolean },
  reject: (reason?: any) => void,
) {
  if (settled.value) return;

  errors[index] = error;
  if (--remaining.count === 0) {
    reject(new AggregateError(errors, 'All promises were rejected'));
  }
}
