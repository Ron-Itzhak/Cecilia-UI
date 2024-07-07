"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Author } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface CreateAuthorFormProps {
  authors: Author[];
}

export function CreateAuthorForm(props: CreateAuthorFormProps) {
  const FormSchema = z.object({
    name: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "Author name must not be empty" }))
      .refine(
        (authorName) =>
          props.authors
            ? !props.authors.some(
                (author) =>
                  author.name.toLowerCase() === authorName.toLowerCase()
              )
            : true,
        {
          message:
            "Author with the same name already exists in the author's list",
        }
      ),

    country: z
      .string()
      .transform((t) => t?.trim())
      .pipe(z.string().min(1, { message: "country must not be empty" })),
    age: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), { message: "Must be a number" })
      .refine((val) => val >= 20, { message: "Number must be at least 20" })
      .refine((val) => val <= 120, { message: "Number must be at most 120" }),
    picture: z
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
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    sendRequest(data);
    console.log({
      title: "You submitted the following values:",
      data,
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      age: 20,
      country: "",
    },
  });
  const fileRef = form.register("picture");

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Author Form</CardTitle>
        <CardDescription>customize details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country/State</FormLabel>
                  <FormControl>
                    <Input placeholder="enter country/state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="age between (20-120)" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="picture"
              render={() => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>

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
  const url = `${process.env.NEXT_PUBLIC_API}/authors`;
  const res = await fetch(url, {
    body: formData,
    method: "post",
  });

  const toastMessage =
    res.status === 201 ? `Added author successfully` : `Failed to add author`;
  toast({
    title: toastMessage,
    description: `Author : ${formData.get("name")} `,
  });
  console.log(res);
}
