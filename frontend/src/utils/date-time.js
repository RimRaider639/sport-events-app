export const getDate = time => {
  const date = new Date(time);
  return date.toDateString();
};
export const getTime = time => {
  const date = new Date(time);
  return (
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  );
};

export const checkElapsed = time => {
  console.log(Date.now(), Date.parse(time));
  return Date.now() >= Date.parse(time);
};
