export function filled(value: string | undefined, fallback: string): string {
  const text = value?.trim();
  return text ? text : fallback;
}
