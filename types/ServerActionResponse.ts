interface ServerActionSuccessResponse<T> {
  success: true;
  data: T;
}

interface ServerActionErrorResponse {
  success: false;
  error: string;
}

export type ServerActionResponse<T> =
  | ServerActionSuccessResponse<T>
  | ServerActionErrorResponse;
