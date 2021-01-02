import { SignInResponse } from "../dto/auth-signinresponse.dto";

export interface UserJwtResponse {
  user: SignInResponse;
  accessToken: string;
}