/**
 * Converts a UTC timestamp to Indian Standard Time (IST) in a proper format.
 *
 * @param {string} utcTimestamp - The UTC timestamp to convert (e.g., '2024-12-03T23:18:23.720294').
 * @returns {string} - The date and time in IST format.
 */
export const convertToIST = (utcTimestamp) => {
    const date = new Date(utcTimestamp);
    
    // Define options for formatting the date and time
    const options = {
      timeZone: 'Asia/Kolkata',  // IST time zone
      year: 'numeric',
      month: 'long',  // Full month name
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,  // 12-hour format with AM/PM
    };
    
    return date.toLocaleString('en-IN', options);  // Format date according to Indian locale
  };