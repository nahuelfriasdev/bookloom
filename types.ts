export type AuthContextType = {
  user: UserProfileType | null;
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

export type UserCurrentReading = {
  thumbnail: string
  title: string
  progress: number
}

export type UserRecentCompleted = {
  thumbnail: string
  title: string
}

export type UserProfileType = UserType & { stats?: UserStatsType, currentReading?: UserCurrentReading, recentCompleted?: UserRecentCompleted[]};

export type UserTypeDB = Omit <UserType, "uid"> 

export type BookType = {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
}

export type BookInCollectionType = BookType & {
  status: string;
  pageCount: number;
  pagesRead: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BookCardProps = {
  id: string
  title: string
  authors?: string[]
  thumbnail?: string
  status: string
  onClick?: () => void
}

export type BookFetcher = (query: string) => Promise<BookType[]>;

export type JournalType = {
  date: string;
  pagesRead: number;
  readingTime: number;
  notes: string;
}

export interface JournalWithPercentage extends JournalType {
  percentage: string;
}

export type JournalCardProps = {
  date: string;
  pagesRead: number;
  notes: string;
  readingTime?: string;
  percentage: string;
}