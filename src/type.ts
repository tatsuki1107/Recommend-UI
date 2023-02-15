export interface Recommend {
  book_id: string,
  book_author: string,
  book_title: string,
  image: string,
  publisher: string,
  year_of_publication: number,
}

export interface History extends Recommend {
  book_rating: number
}

export type Children = {
  children: React.ReactNode
}

export type Context = {
  user: Number | null;
  onLogin: (uid: Number) => void;
  onLogout: () => void;
}
