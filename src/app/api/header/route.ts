import { client } from '@/lib/senity';

export async function GET() {
  const query = `
      *[_type == "header"][0]{
        mainLinks[]{label, link},
        platforms[]{label, link},
        packageLink[]->{
          title,
          "slug": slug.current
        },
        otherLink[]{label, link}
      }
    `;

  const data = await client.fetch(query, {}, { next: { revalidate: 0 } }); // NO CACHE

  return Response.json(data);
}
