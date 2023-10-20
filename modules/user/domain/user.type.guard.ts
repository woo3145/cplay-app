import { UserRole } from './user';

export const isUserRoleType = (userRoleType: any): userRoleType is UserRole => {
  return Object.values(UserRole).includes(userRoleType);
};
