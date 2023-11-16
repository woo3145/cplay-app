export class NoChangeError extends Error {
  constructor(message: string = '변경 된 내용이 없습니다.') {
    super(message);
    this.name = 'NoChangeError';
    Object.setPrototypeOf(this, NoChangeError.prototype);
  }
}
