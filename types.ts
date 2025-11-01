export type AuthContextType = {
  user: UserWithStatsType | null;
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
  uid: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UserStatsType = {
  booksRead: number;
  pagesRead: number;
  readingSessions: number;
  journalsWritten: number;
};

export type UserWithStatsType = UserType & { stats?: UserStatsType };

export type UserTypeDB = Omit <UserType, "uid"> 

export type BookType = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
}

