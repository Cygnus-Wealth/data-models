import { ApiError } from './ApiError';

export interface ApiResponse<T extends object> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}