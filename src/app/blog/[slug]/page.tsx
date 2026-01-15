/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { client } from '@/lib/senity'; // your Sanity client
import { PortableText } from '@portabletext/react';
import { ComponentsBlock } from '../component/PortableText';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // GROQ query to fetch the blog by slug
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    date,
    place,
    tag,
    image{
      asset->{
        url
      }
    },
    description,
    blockContent
  }`;

  const blogPost: any = await client.fetch(query, { slug });

  if (!blogPost) {
    return <p>Blog post not found</p>;
  }

  return (
    <main className="px-6 lg:px-32 py-10">
      <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
      <div className="flex gap-4 text-black/40 mb-6">
        <span>{blogPost.place} |</span>
        <span>{new Date(blogPost.date).toLocaleDateString()} |</span>
        <span>{blogPost.tag}</span>
      </div>

      {blogPost.image?.asset?.url && (
        <div className="relative w-full h-[400px] mb-6">
          <Image
            src={blogPost.image.asset.url}
            alt={blogPost.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose max-w-none prose-p:mb-6">
        <div className="prose max-w-none">
          <PortableText value={blogPost.blockContent} components={ComponentsBlock} />
        </div>
      </div>
    </main>
  );
}
