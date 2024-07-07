export interface Author {
  name: string;
  books: string[];
  country: string;
  picture: string;
  age: number;
  isActive: boolean;
}

export interface Book {
  title: string;
  price: number;
  description: string;
  genre: string;
  image: string;
  authorName: string;
  isActive: boolean;
}
