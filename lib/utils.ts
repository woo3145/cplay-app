import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const sanitizeFilename = (filename: string) => {
  return filename.replace(/\//g, '_');
};
export const getFileExtension = (filename: string) => {
  return filename.split('.').pop();
};

export const arraysEqual = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  for (let i = 0; i < a.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }

  return true;
};

export const capitalizeFirstLetter = (text: string) => {
  if (text.length === 0) {
    return '';
  }

  return text.charAt(0).toUpperCase();
};
