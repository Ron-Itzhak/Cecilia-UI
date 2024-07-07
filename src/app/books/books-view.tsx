"use client";

import { Book } from "@/lib/types";
import { useState } from "react";
import BookCard from "./book-card";
import { SearchComponent } from "../components/search-input";

interface BooksViewComponentProps {
  books: Book[];
}

const BooksView = (props: BooksViewComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = props.books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="pt-2  flex items-center justify-center ">
        <SearchComponent onSearchChange={setSearchQuery}></SearchComponent>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book: Book) => (
            <BookCard key={book.title} {...book} />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BooksView;
