/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageBox from '@/components/shared/image-box';
import LetsTalk from '@/components/shared/let-talk';
import { client } from '@/lib/senity';
import Image from 'next/image';

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = (await params) as { slug: string };

  const query = `*[_type == "slugPage" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  subtitle,
  "image": bannerImage.asset->url,

  // Section 1 (Array)
  section_1[]{
    title,
    description
  },

  // Section 2
  "section_2_image1": section_2_image1.asset->url,
  "section_2_image2": section_2_image2.asset->url,
  section_2_title,
  section_2_description,
  section_2_taglin,

  // Section 3
  section_3_title,
  section_3_description,

  // Section 4 (Cards)
  section_4_cards[]{
    title,
    subtitle,
    "image": image.asset->url,
    description
  },

  // Section 5
  section_5_title,
  section_5_description,
  section_5_taglin,


    section_slug[]->{title, subtitle, image, slug},

  // Section 6
  section_6_title,
  section_6_description,
  section_6_taglin,

  // Lets Talk section
  letsTalkDescription,
      "letTalkImage": letsTalk.asset->url, // ← get URL directly

}`;

  const data = await client.fetch(query, { slug: slug }, { next: { revalidate: 0 } });
  return (
    <main>
      {/* Hero Section */}
      <section className="h-[60vh] lg:h-screen w-full relative overflow-hidden">
        <Image
          src={data?.image || ''}
          alt={data?.title || 'img'}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">{data?.title}</h1>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4">
        {data.section_1.map((item: any, index: number) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? 'bg-black text-white' : 'bg-primary'
            } h-[350px] flex flex-col items-center justify-center px-8 font-medium`}
          >
            <p className="font-bold text-[20px] text-center">{item.title}</p>
            <div
              className={`${
                index % 2 === 0
                  ? 'border border-primary'
                  : ' border border-black'
              }  w-[40%] my-4`}
            />
            <p className="text-center">{item.description}</p>
          </div>
        ))}
      </section>
      <section className="flex flex-col px-[16px] lg:px-[120px] my-[150px] py-[80px] bg-black">
        <div className="flex lg:flex-row flex-col text-start space-x-8">
          <div className="flex-1 relative flex lg:flex-row flex-col space-y-4 lg:space-x-4 w-full">
            <div className="bg-primary lg:h-[520px] h-[240px] w-full lg:w-[50%] lg:absolute lg:-top-40 lg:-left-20">
              <Image
                src={data.section_2_image1 || ''}
                alt={data?.title || 'img'}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-primary lg:h-[520px] h-[240px] w-full lg:w-[50%] lg:absolute lg:-bottom-40 lg:right-12">
              <Image
                src={data?.section_2_image2 || ''}
                alt={data?.title || 'img'}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 px-4">
            <h2 className="leading-[52px] text-start">
              {data.section_2_title}
            </h2>
            <div className="border border-white w-[58%] my-4" />
            <p className="text-white text-[18px] font-medium">
              {data.section_2_description}
            </p>
            <p className="text-white mt-[32px] font-bold text-[20px]">
              {data.section_2_taglin}
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[302px] my-[50px] text-center">
        <h1 className="text-center leading-[50px]">
          {data.section_3_title}
        </h1>
        <p className="mt-[24px]">
           {data.section_3_description}
        </p>
      </section>

      {/* Other Packages */}
      <section className="flex flex-col lg:px-[32px] px-[16px] my-[30px] lg:my-[50px] gap-2">
        {data.section_4_cards.map(({ image, title, subtitle,description }:any, index: number) => (
          <div
            className={`flex flex-col lg:flex-row gap-2 ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}
            key={index}
          >
            {/* Left Content */}
            <div className="flex flex-col justify-center items-center w-full lg:w-[50%] bg-[#111820] p-[20px]">
              <h1>{title}</h1>
              <p className="text-white font-bold text-[14px] lg:text-[16px] mt-2">
                {subtitle}
              </p>
              <div className="px-[20px] lg:px-[60px] mt-[16px] lg:mt-[24px] pb-[20px] lg:pb-[32px]">
                <p className="text-white text-center text-[14px] lg:text-[16px]">
                  {description}
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[50%] relative h-[240px] lg:h-[420px] overflow-hidden">
              <Image
                src={image}
                alt="img"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>
      {/* Intro Section */}
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] my-[50px]">
        <div className="border-[0.5px] border-primary h-[40px] lg:h-[80px] mb-[20px] lg:mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.section_5_title}</h1>
          </div>
          <div className="w-full lg:w-[920px]">
            <p className="text-[14px] lg:text-[16px] text-center my-[16px] lg:my-[24px]">
             {data.section_5_description}
            </p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold text-sm lg:text-lg">
               {data.section_5_taglin}
            </span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[40px] lg:h-[80px] mt-[20px] lg:mt-[40px]" />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-[16px] lg:px-[32px] gap-[8px] my-[24px] lg:my-[50px]">
        {data.section_slug.map(
          ({ image, title, subtitle, slug }: any) => (
            <ImageBox
              key={slug.current}
              slug={slug}
              image={image}
              label={title || ''}
              subtitle={subtitle}
            />
          )
        )}
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] my-[50px]">
        <div className="border-[0.5px] border-primary h-[40px] lg:h-[80px] mb-[20px] lg:mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.section_6_title}</h1>
          </div>
          <div className="w-full lg:w-[920px]">
            <p className="text-[14px] lg:text-[16px] text-center my-[16px] lg:my-[24px]">
               {data.section_6_description}
            </p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold text-sm lg:text-lg">
               {data.section_6_taglin}
            </span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[40px] lg:h-[80px] mt-[20px] lg:mt-[40px]" />
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] my-[50px]">
        <div className="h-[84vh]">
          <LetsTalk
            images={data.letTalkImage ?? "/images/dummy/img1.jpg"}
            description={data.letsTalkDescription}
          />
        </div>
      </section>
    </main>
  );
}

export default Page;
