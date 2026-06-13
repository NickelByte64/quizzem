/**
 * Recursively checks whether a RHF dirtyFields node contains any true leaf.
 * Booleans are the leaf type; objects and arrays are walked.
 */
function isDirtyFieldValue(dirtyField: unknown): boolean {
  if (typeof dirtyField === "boolean") return dirtyField;
  if (Array.isArray(dirtyField)) return dirtyField.some(isDirtyFieldValue);
  if (typeof dirtyField === "object" && dirtyField !== null)
    return Object.values(dirtyField).some(isDirtyFieldValue);
  return false;
}

type GetDirtyValuesReturn<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Returns true if an array field changed — either a value edit (caught by getDirtyValues)
 * or a structural add/remove that RHF doesn't track in dirtyFields (detected by length diff).
 */
export function isArrayFieldChanged(
  diffValue: unknown[] | null,
  current: unknown[] | null | undefined,
  original: unknown[] | null | undefined,
): boolean {
  return diffValue !== null || (current?.length ?? 0) !== (original?.length ?? 0);
}

/**
 * Returns the current value for each key that RHF considers dirty, null otherwise.
 * Callers can use null to mean "omit from the PATCH payload".
 */
export function getDirtyValues<T extends Record<string, unknown>>(
  dirtyFields: Partial<Record<string, unknown>>,
  values: T,
): GetDirtyValuesReturn<T> {
  const result = {} as GetDirtyValuesReturn<T>;
  for (const key of Object.keys(values) as Array<keyof T>) {
    const dirtyField = dirtyFields[key as string];
    /**
     * useFieldArray structural changes (append/remove) produce an array entry in
     * dirtyFields where no individual item is marked dirty, so checking for a true
     * leaf via isDirtyFieldValue would incorrectly return false. The mere presence
     * of an array means the field was touched.
     */
    result[key] =
      Array.isArray(dirtyField) || isDirtyFieldValue(dirtyField)
        ? values[key]
        : null;
  }
  return result;
}
