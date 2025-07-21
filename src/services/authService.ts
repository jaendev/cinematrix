import { apiClient } from "@/api/apiClient";
import { CreateUserDTO } from "@/types/user";

export const createUser = async (userData: CreateUserDTO) => apiClient.post<CreateUserDTO>("/auth/register", userData)