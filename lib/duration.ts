export function convertDuration(value: string): string | null {
  const match = /^(\d+):([0-5]\d):([0-5]\d)$/.exec(value.trim());
  if (!match) return null;

  // Integer arithmetic keeps rounding accurate even for very long durations.
  const seconds = BigInt(match[1]) * 3600n + BigInt(match[2]) * 60n + BigInt(match[3]);
  const hundredths = (seconds + 18n) / 36n;
  return `${hundredths / 100n}.${String(hundredths % 100n).padStart(2, "0")}`;
}
