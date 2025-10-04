export function dateToDatetimeLocal(date: Date | null): string {
  if (!date) return '';

  try {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - tzOffset);
    return localDate.toISOString().slice(0, 16);
  } catch {
    return '';
  }
}

export function datetimeLocalToDate(datetimeLocal: string): Date | null {
  if (!datetimeLocal) return null;

  try {
    return new Date(datetimeLocal);
  } catch {
    return null;
  }
}