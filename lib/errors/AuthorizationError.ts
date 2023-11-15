export class AuthorizationError extends Error {
  constructor(message: string = '권한이 없습니다.') {
    super(message);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
