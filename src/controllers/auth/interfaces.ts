export interface UserTokenPayload {
  id: number;
  name: string;
  role: string;
}

export interface AuthUserDto {
  email: string;
  password: string;
}
