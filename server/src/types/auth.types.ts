export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface JWTPayload {
  userId: number;
  email: string;
}
