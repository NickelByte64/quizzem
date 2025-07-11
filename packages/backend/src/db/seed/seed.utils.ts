export function randomDateLast6Months(): Date {
  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(now.getMonth() - 6);

  const randomTimestamp =
    Math.random() * (now.getTime() - threeMonthsAgo.getTime()) +
    threeMonthsAgo.getTime();
  return new Date(randomTimestamp);
}
