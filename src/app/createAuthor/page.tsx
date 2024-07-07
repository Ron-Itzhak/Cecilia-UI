import React from "react";
import { CreateAuthorForm } from "./create-author-form";
import { Author } from "@/lib/types";

async function getAuthors(): Promise<Author[]> {
  const url = `${process.env.NEXT_PUBLIC_API}/authors`;

  const res = await fetch(url, {
    cache: "no-store",
  });
  return await res.json();
}
const page = async () => {
  const authors: Author[] = await getAuthors();

  return (
    <div className=" pt-2 flex items-center justify-center ">
      <CreateAuthorForm authors={authors}></CreateAuthorForm>
    </div>
  );
};

export default page;
