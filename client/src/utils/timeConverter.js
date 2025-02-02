export const timeConverter = (time) => {
  const date = new Date(time);
  const options = {
    month: "short", // Short month name (e.g., Nov)
    day: "numeric", // Numeric day (e.g., 19)
    year: "numeric", // Full year (e.g., 2024)
  };
  return date.toLocaleDateString("en-US", options);
};
