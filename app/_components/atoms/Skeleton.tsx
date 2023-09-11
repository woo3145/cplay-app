import { cn } from '@/libs/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-foreground/20 dark:bg-foreground/20',
        className
      )}
      {...props}
    />
  );
};
