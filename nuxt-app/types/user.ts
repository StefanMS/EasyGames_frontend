export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    balance: number;
    is_superuser: boolean;
    created_at: string;
}