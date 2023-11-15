export class ValidationError extends Error {
  constructor(message: string = '유효하지 않은 입력 데이터입니다.') {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
