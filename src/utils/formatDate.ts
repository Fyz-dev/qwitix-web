export function formatDateShort(
  date?: Date,
): { month: string; day: number } | null {
  if (!date) return null;

  const month = date.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'Europe/Kyiv',
  });
  const day = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    timeZone: 'Europe/Kyiv',
  }).format(date);

  return { month, day: Number(day) };
}

export function formatFullDateTime(date?: Date) {
  if (!date) return null;

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Kyiv',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Europe/Kyiv',
  });

  return `${formattedDate} · ${formattedTime}`;
}
