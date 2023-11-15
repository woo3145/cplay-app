export class ExternalAPIError extends Error {
  constructor(message: string = '외부 API 에러가 발생했습니다.') {
    super(message);
    this.name = 'ExternalAPIError';
    Object.setPrototypeOf(this, ExternalAPIError.prototype);
  }
}
