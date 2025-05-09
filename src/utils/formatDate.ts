export function formatDateShort(
  date?: Date,
): { month: string; day: number } | null {
  if (!date) return null;

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();

  return { month, day };
}
