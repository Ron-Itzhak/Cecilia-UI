import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <section className="w-full pt-12 md:pt-24 lg:pt-32 ">
        <div className="container space-y-10 xl:space-y-16 px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.5rem]  w-full max-w-3xl">
              Discover Your Next Great Read
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Explore our vast collection of books and find your next literary
              adventure.
            </p>
            <Link
              href="/books"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-6"
              prefetch={false}
            >
              Search Books
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Add Authors</h3>
              <p className="text-sm text-muted-foreground">
                Expand our library by adding new authors and their works.
              </p>
              <Link
                href="/createAuthor"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Add Author
              </Link>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Add Books</h3>
              <p className="text-sm text-muted-foreground">
                Expand our library by adding new books to our collection.
              </p>
              <Link
                href="/createBook"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Add Book
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
