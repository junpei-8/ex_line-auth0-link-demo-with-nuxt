export function initEnv(environment: Record<string, unknown>) {
  const env = Object.assign(environment) as unknown as Writable<
    ImportMeta['env']
  >;

  return {
    ...env,
  } as const;
}
