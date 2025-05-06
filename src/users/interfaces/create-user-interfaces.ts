export interface CreatedUser {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string;
}
