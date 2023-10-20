import { User } from '@prisma/client';
import {
  User as DomainUser,
  SessionUser as DomainSessionUser,
} from '../domain/user';
import { isUserRoleType } from '../domain/user.type.guard';

export const toUserDomainModel = (record: User): DomainUser => {
  return {
    id: record.id,
    name: record.name ?? '',
    email: record.email ?? '',
    image: record.image ?? '',
  };
};

export const toSessionUserDomainModel = (record: User): DomainSessionUser => {
  if (!isUserRoleType(record.role)) {
    throw new Error('Invalid SessionUser Type');
  }
  return {
    ...toUserDomainModel(record),
    role: record.role,
    isSocialLogin: !record.password,
  };
};
