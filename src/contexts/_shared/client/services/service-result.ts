export interface ServiceResult<T = any> {
    data?: T;
    success: boolean;
    errorMessage?: string;
}