export type WineJournalEntry = {
  id: string;
  userId: string;
  wineId: string;
  favorite: boolean;
  tasted: boolean;
  buyAgain: boolean;
  gift: boolean;
  avoid: boolean;
  rating: number | null;
  note: string | null;
  tastedAt: Date | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type WineJournalInput = {
  userId: string;
  wineId: string;
  favorite?: boolean;
  tasted?: boolean;
  buyAgain?: boolean;
  gift?: boolean;
  avoid?: boolean;
  rating?: number | null;
  note?: string | null;
  tastedAt?: Date | string | null;
  location?: string | null;
};

export type WineJournalStats = {
  total: number;
  favorites: number;
  tasted: number;
  buyAgain: number;
  gift: number;
  avoid: number;
};
