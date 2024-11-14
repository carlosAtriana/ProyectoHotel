export interface IUser {
    id?: string;
    userName: string;
    name: string;
    lastName: string;
    fullName: string;
    email: string;
    active: boolean;
    roles: string[];
    roleName?: string;
    activeString? : string;
    lastLogin? : Date;
    lastLoginString? : string;
}
