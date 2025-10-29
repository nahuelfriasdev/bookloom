export type AuthContextType = {
  user: UserType;
  setUser: (user: UserType) => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name: string,
    username: string
  ) => Promise<{ success: boolean; msg?: string }>;
  updateUserData: (userId: string) => Promise<void>;
};

export type UserType = {
  uid?: string;
  email?: string | null;
  name?: string | null;
  image?: unknown;
  username?: string;
  username_lowercase?: string;
} | null;