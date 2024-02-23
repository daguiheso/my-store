import { IPagination } from "./pagination.interface";

export interface IApiListResponse<T> extends IPagination {
  data: T;
}