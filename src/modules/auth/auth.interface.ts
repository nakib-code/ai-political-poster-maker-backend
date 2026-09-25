export interface RegisterInput {
  name: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface LoginInput {
  email?: string;
  phone?: string;
  password: string;
}