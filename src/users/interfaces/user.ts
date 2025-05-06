import { Request } from 'express';

export interface User {
  userId: number;
  username: string;
  password: string;
  roles: [];
}

export interface AuthenticatedRequest extends Request {
  user: {
    username: string;
    userId: number;
  };
}
