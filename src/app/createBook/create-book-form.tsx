"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Author } from "@/lib/types";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface CreateBookFormProps {
  authors: Author[];
}
export function CreateBookForm(props: CreateBookFormProps) {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const handleAuthorChange = (authorName: string) => {
    const author = props.authors.find((author) => author.name === authorName);
    setSelectedAuthor(author!);
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    sendRequest(data);
  };

  const FormSchema = z.object({
    title: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "title must not be empty" }))
      .refine(
        (bookTitle) =>
          selectedAuthor
            ? !selectedAuthor!.books.some(
                (item) => item.toLowerCase() === bookTitle.toLowerCase()
              )
            : true,
        {
          message: "Book title already exists in the author's list",
        }
      ),

    genre: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "genre must not be empty" })),
    description: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "description must not be empty" })),
    price: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), { message: "Must be a number" })
      .refine((val) => val >= 10, { message: "Number must be at least 10" })
      .refine((val) => val <= 100, { message: "Number must be at most 100" }),
    image: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      )
      .transform((files: any[]) => files[0]),
    authorName: z.string({
      required_error: "Please select an author to book.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      price: 10,
      description: "",
      genre: "",
    },
  });
  const fileRef = form.register("image");

  return (
    <Card className=" w-[350px]">
      <CardHeader>
        <CardTitle>Create Book Form</CardTitle>
        <CardDescription>customize details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5 ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="enter price" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category/Genre</FormLabel>
                  <FormControl>
                    <Input placeholder="enter genre" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      handleAuthorChange(value);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectGroup>
                      <SelectContent>
                        {props.authors.length > 0 &&
                          props.authors
                            .filter((author: Author) => author.isActive)
                            .map((author: Author) => (
                              <SelectItem key={author.name} value={author.name}>
                                {author.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

async function sendRequest(data: any) {
  const formData = new FormData();
  for (let key in data) {
    let value = data[key];
    formData.append(key, value);
  }

  const url = `${process.env.NEXT_PUBLIC_API}/books`;

  const res = await fetch(url, {
    body: formData,
    method: "post",
  });

  const toastMessage =
    res.status === 201 ? `Book created successfully` : `Failed to create book`;
  toast({
    title: toastMessage,
    description: `Book created: ${formData.get("title")} `,
  });
  console.log(res);
}
