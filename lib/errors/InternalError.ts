export class InternalError extends Error {
  constructor(message: string = '내부 서버 에러가 발생했습니다.') {
    super(message);
    this.name = 'InternalError';
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
