
export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

 export function formatDateTime(isoString:string) {
    const inputDate = new Date(isoString);
    const currentDate = new Date(); // Current date: March 27, 2025, in this context
  
    // 1. Format Time (e.g., "10:35 AM")
    const timeOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const timeString = inputDate.toLocaleTimeString("en-US", timeOptions);
  
    // 2. Calculate Relative Day (e.g., "Today", "One day ago")
    const diffInMs = currentDate - inputDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    let dayString;
    switch (diffInDays) {
      case 0:
        dayString = "Today";
        break;
      case 1:
        dayString = "A day ago";
        break;
      default:
        dayString = `${diffInDays} days ago`; // For dates older than 1 day
    }
  
    return { time: timeString, day: dayString };
  }
  