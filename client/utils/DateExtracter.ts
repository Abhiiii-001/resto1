export function getDayAndMonthName(isoString: string) {
    const date = new Date(isoString);
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",   // Monday, Tuesday, etc.
      month: "short",     // January, February, etc.
      day: "numeric",
      year: "numeric",
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(date);
  
    const weekday = parts.find(p => p.type === "weekday")?.value.toUpperCase() || "";
    const month = parts.find(p => p.type === "month")?.value.toUpperCase() || "";
    const day = parts.find(p => p.type === "day")?.value || "";
    const year = parts.find(p => p.type === "year")?.value || "";
  
    return {
      weekday, // e.g., "Monday"
      month,   // e.g., "April"
      day,     // e.g., "17"
      year     // e.g., "2025"
    };
  }
  