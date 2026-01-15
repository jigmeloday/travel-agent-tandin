/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import BlogSwapper from './component/slider';
import Link from 'next/link';
import { client } from '@/lib/senity';
import { getBlogPostsQuery, getTotalCountQuery } from '@/lib/query';

interface PageProps {
  searchParams: { page?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 6; // posts per page

  // Fetch posts for current page
  const slides = await client.fetch(getBlogPostsQuery(page, limit), {}, {next: { revalidate: 0 }});

  // Fetch total count to calculate total pages
  const totalPosts: number = await client.fetch(getTotalCountQuery, {}, {next: { revalidate: 0 }});
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <main className="px-[16px] lg:px-[32px]">
      <section className="mb-[90px]">
        <h1 className="py-10">Travel Journal</h1>
        <BlogSwapper swapper={slides} />
      </section>

      <section id="posts" className='mb-[94px]'>
        <h3 className="mb-8">All Journal Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map(
            ({
              _id,
              date,
              description,
              title,
              image,
              place,
              tag,
              slug,
            }: any) => (
              <Link href={`/blog/${slug.current}`} key={_id}>
                <div className="w-full h-[420px] relative">
                  <Image
                    src={image.asset.url}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-3 flex gap-2 text-black/40 font-medium">
                  <span>{place} |</span>
                  <span>{new Date(date).toLocaleDateString()} |</span>
                  <span>{tag}</span>
                </div>

                <p className="font-semibold my-2">{title}</p>
                <p className="text-black/70">{`${description.slice(
                  0,
                  260
                )}...`}</p>
              </Link>
            )
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <Link
              key={num}
              href={`/blog?page=${num}#posts`}
              className={`px-4 py-2 rounded ${
                num === page ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {num}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
