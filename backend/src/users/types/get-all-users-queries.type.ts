export type GetAllUsersQueries = {
    page: number;
    limit: number;
    sort: string;
    order: 'ASC' | 'DESC';
    search?: string;
};