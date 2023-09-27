import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function sanitizeFilename(filename: string) {
  return filename.replace(/\//g, '_');
}
