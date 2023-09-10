'use client';
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
            <li
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="flex items-center justify-center gap-2 w-full py-2 border border-border rounded-lg cursor-pointer hover:bg-accent"
            >
              {ProviderIcon[provider.id]}
              <span>Continue with {provider.name}</span>
            </li>
          );
        })}
    </ul>
  );
};
