import { cn } from '@/lib/utils';
import * as React from 'react';

export interface Props {
  message?: string;
  className?: string;
}

export const InputErrorMessage = ({ message, className }: Props) => {
  if (!message) return null;
  return (
    <span className={cn('text-xs text-destructive', className)}>{message}</span>
  );
};
