import React from "react";
import AuthorsTable from "./author-table";
import { Author } from "../../lib/types";

async function getAuthors() {
  const url = `${process.env.NEXT_PUBLIC_API}/authors`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  return await res.json();
}

const authors = async () => {
  const authors: Author[] = await getAuthors();

  return <AuthorsTable authors={authors}></AuthorsTable>;
};

export default authors;
