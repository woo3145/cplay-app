'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
  price: number;
  badge: string;
  title: string;
  description: string;
  isSelected: boolean;
  benefits: string[];
}

export const PricingCard = ({
  price,
  badge,
  title,
  description,
  benefits,
  isSelected,
}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="py-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          {badge === 'free' && <Badge variant="outline">{badge}</Badge>}
          {badge === 'player' && <Badge variant="default">{badge}</Badge>}
          {badge === 'pro' && <Badge variant="default">{badge}</Badge>}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />

      <CardContent className="py-2">
        <div className="py-4 flex justify-center items-end text-muted-foreground">
          <span className="text-3xl font-semibold text-foreground">
            {price}원
          </span>
          <span className="px-1 text-sm">/</span>
          <span className="text-sm">월</span>
        </div>
        {isSelected ? (
          <Button className="w-full" disabled>
            이용 중
          </Button>
        ) : (
          <Button className="w-full">이 요금제로 변경</Button>
        )}
        <ul className="space-y-3 py-4">
          {benefits.map((text, idx) => {
            return (
              <li key={idx} className="grid grid-cols-[25px_1fr] items-start">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                <p className="font-medium leading-none">{text}</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
