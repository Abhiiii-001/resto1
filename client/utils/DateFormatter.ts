export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export function formatDateTime(isoString: string): { time: string; day: string } {
  const inputDate = new Date(isoString);
  const currentDate = new Date();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const timeString = inputDate.toLocaleTimeString('en-US', timeOptions);

  const diffInMs = currentDate.getTime() - inputDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  let dayString: string;

  switch (diffInDays) {
    case 0:
      dayString = 'Today';
      break;
    case 1:
      dayString = 'A day ago';
      break;
    default:
      dayString = `${diffInDays} days ago`;
  }

  return { time: timeString, day: dayString };
}