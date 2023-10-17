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
export const formatDateForTable = (date: Date | null | undefined) => {
  try {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Seoul',
    };

    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    return formatter.format(date);
  } catch (e) {
    return '';
  }
};

export const formatSeconds = (totalSeconds: number) => {
  const seconds = Math.ceil(totalSeconds);
  const minutes = Math.floor(seconds / 60);
  const _seconds = seconds % 60;

  return `${minutes}:${_seconds < 10 ? '0' : ''}${_seconds}`;
};
