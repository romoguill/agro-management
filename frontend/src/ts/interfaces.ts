export interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
  roles: string[];
}
