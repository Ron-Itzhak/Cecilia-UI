"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Author } from "../../lib/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthorRowProps {
  author: Author;
  onStatusChange: (updatedAuthor: Author) => void;
}

const AuthorTableRow: React.FC<AuthorRowProps> = (
  AuthorRowProps: AuthorRowProps
) => {
  const { toast } = useToast();

  const [isActive, setIsActive] = useState(AuthorRowProps.author.isActive);

  const toggleActiveStatus = async () => {
    const updatedAuthor = {
      ...AuthorRowProps.author,
      isActive: !isActive,
    };

    const url = `${process.env.NEXT_PUBLIC_API}/authors/updateStatus`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive: !isActive,
        name: AuthorRowProps.author.name,
      }),
    });
    const toastMessage =
      res.status === 200
        ? `Updated status successfully`
        : `Failed to update status`;
    toast({
      title: toastMessage,
      description: `Update status for Author: ${AuthorRowProps.author.name} `,
    });
    setIsActive(!isActive);
    AuthorRowProps.onStatusChange(updatedAuthor);
  };

  return (
    <TableRow key={AuthorRowProps.author.name}>
      <TableCell className="font-medium">
        {AuthorRowProps.author.name}
      </TableCell>
      <TableCell>{AuthorRowProps.author.books.toLocaleString()}</TableCell>
      <TableCell>{AuthorRowProps.author.country}</TableCell>
      <TableCell>
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={AuthorRowProps.author.picture}
        />
      </TableCell>
      <TableCell className="text-right">{AuthorRowProps.author.age}</TableCell>

      <TableCell className="text-right">
        <Button variant="outline" onClick={() => toggleActiveStatus()}>
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AuthorTableRow;
