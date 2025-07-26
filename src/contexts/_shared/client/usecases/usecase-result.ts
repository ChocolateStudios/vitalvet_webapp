export interface UsecaseResult<T> {
    data?: T;
    success: boolean;
    errorMessage?: string;
}