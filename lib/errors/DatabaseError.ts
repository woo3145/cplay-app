export class DatabaseError extends Error {
  constructor(message: string = '데이터베이스 에러가 발생했습니다.') {
    super(message);
    this.name = 'DatabaseError';
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
