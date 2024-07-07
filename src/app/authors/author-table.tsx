"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import AuthorTableRow from "./author-table-row";
import { Author } from "../../lib/types";

interface AuthorListComponentProps {
  authors: Author[];
}

const AuthorsTable = (props: AuthorListComponentProps) => {
  const [authors, setAuthors] = useState<Author[]>(props.authors);
  const handleStatusChange = (updatedAuthor: Author) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.name === updatedAuthor.name ? updatedAuthor : author
      )
    );
  };
  return (
    <div>
      {authors.length > 0 && (
        <Table>
          <TableCaption>Authors List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Books List</TableHead>
              <TableHead>State/Country</TableHead>
              <TableHead className="text-right">Picture</TableHead>
              <TableHead className="text-right">Age</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.map((author: Author) => (
              <AuthorTableRow
                key={author.name}
                author={author}
                onStatusChange={handleStatusChange}
              ></AuthorTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AuthorsTable;
