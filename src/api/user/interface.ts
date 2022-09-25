export interface LoginData {
  cellphone: string;
  password: string;
}

export interface SafeUserData {
  uid: string;
  auth_token: string;
}

export interface SafeOutLoginData {
  uid: string;
}
