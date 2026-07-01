export function getApiErrorMessage(error: unknown) {
  const maybeError = error as {
    response?: { data?: unknown };
    message?: string;
  };

  const data = maybeError.response?.data;

  if (typeof data === "string") return data;

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    if (typeof record.detail === "string") return record.detail;

    const firstValue = Object.values(record)[0];
    if (Array.isArray(firstValue) && firstValue.length > 0) {
      return String(firstValue[0]);
    }
    if (typeof firstValue === "string") return firstValue;
  }

  return maybeError.message || "خطایی رخ داد. دوباره تلاش کنید.";
}