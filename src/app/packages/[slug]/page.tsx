/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageBox from '@/components/shared/image-box';
import LetsTalk from '@/components/shared/let-talk';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';
import Image from 'next/image';

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params as { slug: string };
  // const data = IMAGE_BOX.find((item) => item.id === parseInt(slug));
const query = `*[_type == "packageItem" && slug.current == $slug][0]{
  title,
  slug,
  category,
  description,
  "image": image.asset->url,
  btn,
  section_1_title,
  section_1_description,
  section_1_tagline,
  "image_section": image_section.asset->url,
  section_2_cards[]{
    title,
    subtitle,
    "image": image.asset->url,
    description
  },
  letsTalkDescription,
  section_slug[]->{
    title,
    "slug": slug.current,
    image
  }
}`;

 const data = await client.fetch(query, { slug });
 console.log(data.section_slug)

 return (
    <main>
      {/* Hero Section */}
      <section className="h-[60vh] lg:h-screen w-full relative overflow-hidden mb-[90px]">
        <Image
          src={data?.image || ''}
          alt={data?.title || 'img'}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">
            {data?.title}
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[40px] lg:h-[80px] mb-[20px] lg:mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data?.section_1_title}</h1>
          </div>
          <div className="w-full lg:w-[920px]">
            <p className="text-[14px] lg:text-[16px] text-center my-[16px] lg:my-[24px]">
             {data.section_1_description}
            </p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold text-sm lg:text-lg">
              {data.section_1_tagline}        
              </span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[40px] lg:h-[80px] mt-[20px] lg:mt-[40px]" />
      </section>

      {/* Full Image Section */}
      <section className="h-[300px] lg:h-[90vh] mb-[90px]">
        <Image
          src={urlFor(data.image_section).url()}
          alt="img"
          height={700}
          width={700}
          className="h-full w-full object-cover"
        />
      </section>

      {/* Other Packages */}
      <section className="flex flex-col lg:px-[32px] px-[16px] my-[90px]">
        {data.section_2_cards.map(({ description, image, subtitle, title }: any, index:number) => (
          <div
            className={`flex flex-col lg:flex-row ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}
            key={index}
          >
            {/* Left Content */}
            <div className="flex flex-col justify-center items-center w-full lg:w-[50%] bg-[#111820] p-[20px]">
              <h1 className="text-white">{title}</h1>
              <p className="text-primary font-bold text-[14px] lg:text-[16px] mt-2">
                {subtitle}
              </p>
              <div className="px-[20px] lg:px-[60px] mt-[16px] lg:mt-[24px] pb-[20px] lg:pb-[32px]">
                <p className="text-white text-center text-[14px] lg:text-[16px]">
                  {description}
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[50%] relative h-[240px] lg:h-[540px] overflow-hidden">
              <Image
                src={urlFor(image).url()}
                alt="img"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Freedom Section */}
      <section className="px-[16px] lg:px-[32px] mb-[90px]">
        {/* <div className="bg-[#111820] w-full p-[16px] lg:p-[24px]">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-3">
              <h3 className="text-white">
                Freedom and <br /> Independence
              </h3>
            </div>
            <div className="flex-2">
              <p className="text-white text-[14px] lg:text-[16px]">
                Combine helicopter journeys with sustainable luxury lodges,
                curated local cuisine, and intimate cultural experiences for a
                fully bespoke Bhutanese exploration.
              </p>
            </div>
          </div>
          <div
            className="w-full mt-[24px] lg:mt-[32px] h-[300px] lg:h-[540px] flex items-center justify-center relative group cursor-pointer overflow-hidden"
            style={{
              backgroundImage: "url('/images/slide.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            <h4 className="relative z-10 text-white inline-block after:content-[''] after:block after:h-[2px] after:w-0 after:bg-white after:mx-auto after:transition-all after:duration-300 group-hover:after:w-full">
              Connect Now – We’ll throw in enlightenment
            </h4>
          </div>
        </div> */}
         <div className="h-[84vh] w-full">
                  <LetsTalk
                    description={data.letsTalkDescription}
                    images="/images/dummy/img8.jpg"
                  />
                </div>
      </section>

      {/* Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-[16px] lg:px-[32px] gap-[8px] mb-[90px]">
        {data.section_slug?.map(
          ({ image, title, subtitle, slug }:any) => (
            <ImageBox
              slug={slug}
              key={title}
              image={image}
              label={title || ''}
              subtitle={subtitle}
            />
          )
        )}
      </section>
    </main>
  );
}

export default Page;
