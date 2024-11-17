export interface Signup {
  email: string;
  password: string;
  username: string;
}

export interface Signin {
  email: string;
  password: string;
}

export enum EmailType {
  Verify = 'Verify',
  Reset = 'Reset',
}
