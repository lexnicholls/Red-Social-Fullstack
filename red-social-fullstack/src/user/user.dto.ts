export interface CreateUserDTO {
  fullName: string;
  age: number;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  fullName: string;
  email: string;
  password: string;
}
