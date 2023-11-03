import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { MyPlanCard } from './MyPlanCard';
import { PricingCard } from './PricingCard';

const pricingBundle = [
  {
    badge: 'free',
    title: '무료',
    description: '',
    price: 0,
    isSelected: true,
    benefits: ['JAZZiT 무료 콘텐츠 제공'],
  },
  {
    badge: 'player',
    title: '플레이어',
    description: '',
    price: 8900,
    isSelected: false,
    benefits: [
      '전체 트랙 스트리밍',
      'JAZZiT+ 전용 콘텐츠',
      '코드 진행 악보 제공',
      '모든 컨텐츠 다운로드',
      '개별 트랙 제공',
    ],
  },
];

export default async function AccountBillingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium">내 요금제</h3>
      </div>
      <div className="">
        <MyPlanCard />
      </div>

      <div>
        <h3 className="text-2xl font-medium">월 요금제</h3>
      </div>
      <Separator />
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-4">
        {pricingBundle.map((pricing, idx) => {
          return (
            <PricingCard
              key={idx}
              badge={pricing.badge}
              title={pricing.title}
              price={pricing.price}
              description={pricing.description}
              benefits={pricing.benefits}
              isSelected={pricing.isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}
