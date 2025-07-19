import { User } from "next-auth"

export interface CreateUserDTO {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: Date
}

export interface CustomUserToken extends User {
  firstName: string;
  lastName: string;
  phone: string | null;
  isActive: boolean;
}
