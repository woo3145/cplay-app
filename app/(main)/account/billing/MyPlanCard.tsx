'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDateKST } from '@/lib/dateFormat';
import { cn } from '@/lib/utils';

interface Props {}

export const MyPlanCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="py-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Badge variant="outline">Free</Badge>
          무료
        </CardTitle>
      </CardHeader>
      <Separator />

      <CardContent className="py-2">
        <div
          className={cn(
            'space-y-1 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground',
            'md:flex md:items-center md:space-x-4'
          )}
        >
          <p className="text-sm font-medium leading-none">구독 시작일</p>
          <p className="text-sm text-muted-foreground">
            {formatDateKST(new Date())}
          </p>
        </div>
        <div
          className={cn(
            'space-y-1 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground',
            'md:flex md:items-center md:space-x-4'
          )}
        >
          <p className="text-sm font-medium leading-none">구독 종료일</p>
          <p className="text-sm text-muted-foreground">
            {formatDateKST(new Date())}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
