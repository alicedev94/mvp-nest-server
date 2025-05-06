export interface UserRequestBody {
  name: string;
  email: string;
  confirmPassword: string;
  password: string;
  roles: string[];
}
