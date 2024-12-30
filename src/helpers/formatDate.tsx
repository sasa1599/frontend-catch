export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
}

export function formatDateEvent(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Create an options object for the DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // 'Thu'
    year: "numeric", // '2025'
    month: "short", // 'Jan'
    day: "2-digit", // '02'
    // hour: "2-digit", // '02'
    // minute: "2-digit", // '00'
    // hour12: true, // Use 12-hour clock
    // timeZoneName: "short", // GMT+7
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}

export function timeFormat(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid Date:", dateString);
    return "Invalid date";
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Jakarta",
  };

  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

  return `${formattedTime} GMT+7`;
}

export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Create an options object for the DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // 'Thu'
    year: "numeric", // '2025'
    month: "short", // 'Jan'
    day: "2-digit", // '02'
    hour: "2-digit", // '02'
    minute: "2-digit", // '00'
    hour12: true, // Use 12-hour clock
    timeZoneName: "short", // GMT+7
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}