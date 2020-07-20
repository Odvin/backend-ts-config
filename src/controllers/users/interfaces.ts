export enum UserRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  INSPECTOR = 'inspector'
}

export interface UserFilterDto {
  name?: string;
  role?: UserRole;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

export interface UpdateUserDto {
  email: string;
  password: string;
  name: string;
}
