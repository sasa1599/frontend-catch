export function formatDate(dateString: string): string {
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Short day of the week (e.g., "Wed")
      month: "short", // Short month name (e.g., "Jan")
      day: "2-digit", // Two-digit day (e.g., "01")
    });
  }
  
  export function formatDateEvent(dateString: string): string {
  
  
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Return a default string for invalid dates
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
  
    // Format the date to match the required format
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  
    return formattedDate; // Return the formatted date directly without manually adding the timezone
  }
  
  export function timeFormat(dateString: string): string {
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid Date:", dateString); // Log an error if the date is invalid
      return "Invalid date"; // Return a default string for invalid dates
    }
  
    // Convert the date to Indonesian time (GMT+7)
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit", // '07'
      minute: "2-digit", // '00'
      hour12: true, // Use 12-hour clock
      timeZone: "Asia/Jakarta", // Use Indonesian time zone (GMT+7)
    };
  
    // Format the time to match the required format (12-hour with AM/PM)
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);
  
    // Return the formatted time with the "GMT+7" suffix
    return `${formattedTime} GMT+7`;
  }
  