export function capitalizeText(text) {
  if (typeof text !== "string") {
    return;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${day}-${month}-${year}`;
}
