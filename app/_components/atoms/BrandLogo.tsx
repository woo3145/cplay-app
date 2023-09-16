import { BrandLogoIcon } from './BrandLogoIcon';
import { cva } from 'class-variance-authority';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const brandLogo = cva(
  ['flex items-center gap-2 px-2 text-foreground hover:text-foreground/80'],
  {
    variants: {
      size: {
        sm: 'text-md',
        md: 'text-lg',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const BrandLogo = ({ size = 'md' }: Props) => {
  return (
    <div className={brandLogo({ size })}>
      <BrandLogoIcon size={size} />
      <span>JAZZiT</span>
    </div>
  );
};
