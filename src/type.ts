export interface Recommend {
  book_id: string,
  book_author: string,
  book_title: string,
  image: string,
  publisher: string,
  year_of_publication: number,
}

interface History extends Recommend {
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

interface Statistics {
  count: number;
  mean: number;
}

interface RatedAuthor extends Statistics {
  book_author: string;
}

interface RatedPublisher extends Statistics {
  publisher: string;
}

export interface BookInfo {
  history_book: History[];
  rated_book_author: RatedAuthor[];
  rated_publisher: RatedPublisher[];
}
