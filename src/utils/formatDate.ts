export function formatDateShort(
  date?: Date,
): { month: string; day: number } | null {
  if (!date) return null;

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();

  return { month, day };
}

export function formatFullDateTime(date?: Date) {
  if (!date) return null;

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date
    .toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(':', '.');

  return `${formattedDate} · ${formattedTime}`;
}
