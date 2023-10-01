import { Role } from '@prisma/client';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role; // 예외로 DB에 의존성을 만듬 (원래 규칙은 외부로 의존성 만들면 X)
  isSocialLogin: boolean;
}
