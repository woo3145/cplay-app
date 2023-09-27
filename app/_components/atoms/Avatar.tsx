import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | null | undefined;
  circle?: boolean;
}

export const Avatar = ({ className, src, circle, ...props }: AvatarProps) => {
  return (
    <div
      className={cn('relative bg-foreground/20 rounded-full', className)}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt="avatar"
          fill
          style={{
            objectFit: 'fill',
            borderRadius: circle ? '100%' : '10%',
          }}
        />
      ) : null}
    </div>
  );
};
