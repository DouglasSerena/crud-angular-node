export interface Address {
    user_id: number;
    street: string;
    neighborhood: string;
    number: string;
    zip_code: string;
    state: string;
    city: string;
    complement?: string;
    created_at: Date;
    updated_at: Date;
}