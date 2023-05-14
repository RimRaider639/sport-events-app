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
  return getTime(Date.now()) >= getTime(time);
};
