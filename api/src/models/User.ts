export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    birth?: Date;
    sex?: string;
    profission?: string;
    created_at: Date;
    updated_at: Date;
}