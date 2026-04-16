/**
 * Typed version of Object.entries().
 *
 * Preserves key and value types of the given object instead of widening them to `string` and `any`.
 *
 * Useful when working with strongly typed objects (e.g. `as const`) to avoid losing type information.
 *
 * @template T - Object type
 * @param obj - Source object
 * @returns Array of key-value pairs with preserved types
 */

export function getTypedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
