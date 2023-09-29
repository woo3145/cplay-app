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
