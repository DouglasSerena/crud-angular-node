export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    birth?: string;
    sex?: string;
    profission?: string;
    created_at: Date;
    updated_at: Date;
}
