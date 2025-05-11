export interface Response {
  success: boolean;
  statusCode: number;
  count: number | null;
  message?: string;
  data: any | null;
  error?: any;
}

export interface ActivateRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  resetCode: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  platform: Platform;
  coords: Coords;
}

export interface Platform {
  name: string;
  version: string;
  layout: string;
  description: string;
  ua: string;
}

export interface Coords {
  country: string;
  city: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: string;
  username: string;
}
