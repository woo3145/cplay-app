export class AuthenticationError extends Error {
  constructor(message: string = '인증 에러가 발생했습니다.') {
    super(message);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
