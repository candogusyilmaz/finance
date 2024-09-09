// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getNestedValue<T>(obj: T, path: string): any {
  // biome-ignore lint/complexity/useOptionalChain: <explanation>
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
