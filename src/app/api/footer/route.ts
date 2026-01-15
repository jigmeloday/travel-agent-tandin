import { client } from '@/lib/senity';

export async function GET() {
  const query = `*[_type == "footer"][0]{
    logo {
    asset->{
      url
    }
  },
    newsletterTitle,
    newsletterSubtitle1,
    newsletterSubtitle2,
    newsletterDescription,
    companyLinks,
    servicesLinks
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 0 } }); // NO CACHE

  return Response.json(data);
}
