// noop -- assume standard behavior.

export function wrapFetchWithBaseUrl(fetch, productionBaseUrl) {
  process.env.EXPO_ORIGIN = "";
  return fetch;
}
