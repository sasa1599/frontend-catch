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

export function displayDate(start_date: string, end_date: string) {
  
  if (start_date == end_date) return `${start_date}`;

  const start = start_date.split(" ");
  const end = end_date.split(" ");

  if (start[2] !== end[2]) {
    return `${start} - ${end}`;
  } else {
    return `${start[0]} ${start[1]} - ${end.join(" ")}`;
  }
}

export function  formatDate1(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};