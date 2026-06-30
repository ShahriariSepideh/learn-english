export function getListFromResponse<T>(data: T[] | { results?: T[] }): T[] {
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}
