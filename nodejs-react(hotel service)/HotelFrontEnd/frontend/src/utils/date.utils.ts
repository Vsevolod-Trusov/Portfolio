export function formatDate(inputDate: any) {
  const date = new Date(inputDate);

  const month = ('0' + (date.getMonth() + 1)).slice(-2); // add leading zero if necessary
  const day = ('0' + date.getDate()).slice(-2); // add leading zero if necessary
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}
