"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const BookCard = (book: Book) => {
  const { toast } = useToast();

  const [isActive, setIsActive] = useState(book.isActive);
  const toggleActiveStatus = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}/books/updateStatus`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !isActive,
          title: book.title,
        }),
      });
      const toastMessage =
        res.status === 200
          ? `Updated book status successfully`
          : `Failed to update book status: `;
      toast({
        title: toastMessage,
        description: `Book name :${book.title} `,
      });
      setIsActive(!isActive);
    } catch (error) {
      toast({
        title: "Failed to update book status:",
        description: "erorr in sending request",
      });
    }
  };
  return (
    <div>
      <Card className="h-full	 w-[350px]">
        <CardHeader>
          <CardTitle className="truncate ">{book.title}</CardTitle>
          <CardDescription className="max-h-3">
            {book.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row space-x-4 p-10">
          <img className="w-60 h-60  object-cover" src={book.image} />
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <p className="text-s">Author: {book.authorName}</p>
          <p className="text-s">Genre: {book.genre}</p>
          <p className="text-s">Price: {book.price}</p>
          <Button variant="outline" onClick={() => toggleActiveStatus()}>
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookCard;
