const BACKEND_DATE_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

export function dateReviver(_key: string, value: unknown): unknown {
  if (typeof value === "string" && BACKEND_DATE_FORMAT.test(value)) {
    return new Date(value);
  }
  return value;
}
