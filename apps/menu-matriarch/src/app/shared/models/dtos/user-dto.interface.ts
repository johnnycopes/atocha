import { UserPreferences } from "../user-preferences.interface";

export interface UserDto {
  uid: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}
