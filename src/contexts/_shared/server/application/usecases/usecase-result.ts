export interface UsecaseResult<T = any> {
    data?: T;
    success: boolean;
    errorMessage?: string;
}