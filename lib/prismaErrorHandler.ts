import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime/library';
import { DatabaseError, InternalError, NotFoundError } from './errors';

/** Prisma를 사용하는 Repository의 에러 핸들러 */
export const handlePrismaError = (error: unknown) => {
  if (error instanceof NotFoundError) {
    throw error;
  } else if (error instanceof PrismaClientKnownRequestError) {
    console.error('데이터베이스 에러 발생');
    return new DatabaseError();
  } else if (error instanceof PrismaClientInitializationError) {
    console.error('데이터베이스 초기화 중 에러 발생');
    return new InternalError();
  } else if (error instanceof PrismaClientRustPanicError) {
    console.error('Prisma 내부 에러 발생');
    return new InternalError();
  }
  console.log('예상치 못한 에러 발생');
  return new InternalError();
};
