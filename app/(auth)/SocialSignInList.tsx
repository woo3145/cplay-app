'use client';
import { Button } from '@/components/ui/button';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { ReactNode } from 'react';
import { BsGoogle } from 'react-icons/bs';

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const ProviderIcon: { [key: string]: ReactNode } = {
  google: <BsGoogle />,
};

export const SocialSignInList = ({ providers }: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {providers &&
        Object.values(providers).map((provider) => {
          if (provider.id === 'credentials') return null;
          return (
            <li key={provider.name}>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn(provider.id)}
              >
                {ProviderIcon[provider.id]}
                <span>Continue with {provider.name}</span>
              </Button>
            </li>
          );
        })}
    </ul>
  );
};
