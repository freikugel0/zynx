export type SingularResponse<T> = {
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  message: string;
  data: T[];
};

export type ErrorResponse<T> = {
  message: string;
  details: T[];
};

export type ActionResponse<T> = {
  ok: boolean;
  message: string;
  data: T;
};
