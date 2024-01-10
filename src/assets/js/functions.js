
/// funciton to get the date

   export function getDate() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format

  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${
    formattedHours.toString().padStart(2, '0')
  }:${currentDate.getMinutes().toString().padStart(2, '0')} ${ampm}`;

  return formattedDate;
}
