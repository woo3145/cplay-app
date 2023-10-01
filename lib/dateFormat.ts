export const formatDateKST = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  return formatter.format(date);
};
