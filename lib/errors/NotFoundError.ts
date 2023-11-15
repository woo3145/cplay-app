export class NotFoundError extends Error {
  constructor(message: string = '요청한 리소스를 찾을 수 없습니다.') {
    super(message);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
