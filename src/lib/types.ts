export interface Author {
  name: string;
  books: string[]; //booktitles
  country: string;
  picture: string; // URL to the picture
  age: number;
  isActive: boolean; // active status
}

export interface Book {
  title: string;
  price: number;
  description: string;
  genre: string;
  image: string;
  authorName: string;
  isActive: boolean; // active status
}

export const person1: Author = {
  name: "John Doe",
  books: ["Book 1", "Book 2"],
  country: "California",
  picture: "https://example.com/johndoe.jpg",
  age: 30,
  isActive: true,
};
export const person2: Author = {
  name: "John Doe",
  books: ["Book 1", "Book 2"],
  country: "California",
  picture: "https://example.com/johndoe.jpg",
  age: 30,
  isActive: true,
};
export const person3: Author = {
  name: "John Doe",
  books: ["Book 1", "Book 2"],
  country: "California",
  picture: "https://example.com/johndoe.jpg",
  age: 30,
  isActive: true,
};
