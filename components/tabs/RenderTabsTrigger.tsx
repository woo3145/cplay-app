import { cn } from '@/lib/utils';
import { TabsTrigger } from '../ui/tabs';
import { buttonVariants } from '../ui/button';

interface Props {
  value: string;
  name: string;
}

export const RenderTabsTrigger = ({ value, name }: Props) => {
  return (
    <TabsTrigger
      key={value}
      value={value}
      className={cn(
        buttonVariants({
          variant: 'outline',
          shape: 'circle',
        }),
        'data-[state=active]:bg-primary data-[state=active]:text-white'
      )}
    >
      {name}
    </TabsTrigger>
  );
};
