export default function (timestamp) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return `${weekDays[new Date(timestamp.toDate()).getDay()]}  ${new Date(
    timestamp.toDate()
  ).getHours()}:${new Date(timestamp.toDate()).getMinutes()} `;
}
