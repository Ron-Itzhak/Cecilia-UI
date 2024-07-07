import { Book } from "@/lib/types";
import React from "react";
import BooksView from "./books-view";

async function getBooks(): Promise<Book[]> {
  const url = `${process.env.NEXT_PUBLIC_API}/books`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  return await res.json();
}
const page = async () => {
  const books: Book[] = await getBooks();

  return (
    <div>
      <BooksView books={books}></BooksView>
    </div>
  );
};

export default page;
