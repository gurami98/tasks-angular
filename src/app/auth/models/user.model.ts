export interface User {
  accessToken: string;
  user: {
    email: string;
    confirmPassword: string;
    nickname: string;
    phone: string;
    website: string;
    id: number;
  }
}
