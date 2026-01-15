/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';
import Image from 'next/image';

async function Page() {
  const query = `*[_type == "travelPurpose"][0]{
  heroImage{
    asset->{url}
  },
  section1_title,
  section1_description,
  section1_tagline,

  featureBlocks[]{
    title,
    description,
    tagline,
    image{
      asset->{url}
    }
  },

  footer_title,
  footer_lines,
  footer_tagline
}
`;
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return (
    <div>
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden mb-[90px]">
        <Image
          src={urlFor(data?.heroImage).url()}
          alt="Bespoke Journey"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white/12 via-white/14 to-black/90"></div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.section1_title}</h1>
          </div>
          <div className="lg:w-[920px]">
            <p className="text-[14px] lg:text-[16px] text-center my-[24px]">
              {data.section1_description}
            </p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold">
              {data.section1_tagline}
            </span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] my-[40px]" />
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px] gap-4">
        {data.featureBlocks.map((item: any, index:number) => (
          <div
            key={index}
            className={`flex md:flex-row flex-col w-full justify-center gap-2 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="border w-full h-[550px]">
              <Image
                src={urlFor(item?.image).url()}
                alt="img"
                className="object-cover h-full w-full"
                height={500}
                width={500}
              />
            </div>
            <div className="flex flex-col justify-center md:px-4 md:h-[500px] md:w-full aspect-square">
              <h1>{item?.title}</h1>
              <p className="text-[14px] md:text-[16px]">
                {item?.description}
              </p>
              <p className="font-bold mt-4 italic text-[16px] text-primary">
                {item?.tagline}
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className="px-[16px] lg:px-[32px] mb-[90px]">
        <div className="flex flex-col items-center justify-center bg-primary w-full py-[24px] md:py-[52px]">
          <h2 className="text-white">{data?.footer_title}</h2>
          {
            data.footer_lines.map((item: string, index: number) => (
              <p key={index} className="text-[14px] md:text-[16px]">
           {item}
          </p>
          
            ))
          }
          <p className="mt-4 font-bold md:text-[16px]">
           {data.footer_tagline}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Page;
