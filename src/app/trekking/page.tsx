/* eslint-disable @typescript-eslint/no-explicit-any */
import LetsTalk from '@/components/shared/let-talk';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SideSelling from './components/slider';
import { client } from '@/lib/senity';

export default async function Page() {
  const query = `*[_type == "curatedBhutanBirding"][0]{
  // HERO
  hero{
    "backgroundImageUrl": image.asset->url,
    video{
        asset->{
          _id,
          url
        }
      },
    title
  },

  // SECTION 1
  section1{
    title,
    description,
    buttonLabel,
    sliderImages[]{ "url": asset->url }
  },

  // SECTION 2
  section2{
    topBlocks[]{
      title,
      description
    },
    bottomGrid[]{
      title,
      description,
      "imageUrl": image.asset->url
    }
  },

  // SECTION 3 – GETAWAYS
  getaways{
    title,
    description,
    getaways_cards[]->{
      title,
      description,
      "slug": slug.current,
      facts{
        bestSeason,
        highAlt,
        lowAlt,
        daysOnTrek,
        grade
      },
      "heroImageUrl": hero.image.asset->url
    }
  },

  // SECTION 4 – TRAVEL WITH PURPOSE
  travelPurpose{
    "imageUrl": image.asset->url,
    title,
    description1,
    description2,
    buttonLink
  },

  // SECTION 5 – BROCHURE
  brochure{
    images[]{ "url": asset->url },
    title,
    subtitle,
    description,
    cta1,
    cta2
  },

  // SECTION 6 – LET'S TALK
  letsTalk{
    description,
    "letTalkImage": letsTalk.asset->url, // ← get URL directly

  }
}`;
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });

  return (
    <main>
      <section className="relative h-[60vh] md:h-screen w-full overflow-hidden">
        {data.hero.video ? (
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={data.hero.video?.asset?.url}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={data.hero.backgroundImageUrl}
            alt="Bespoke Journey"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-center px-4 w-[60%]">
            {data.hero.title}
          </h1>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-[24px] px-[16px] lg:px-[32px] mt-[90px]">
        <div className="flex-1">
          <h1 className="leading-[52px]">{data.section1.title}</h1>
          <p className="my-[24px] font-medium">{data.section1.description}</p>
          <Link href="/contact-us">
            <Button className="rounded-none">
              {data.section1.buttonLabel}
            </Button>
          </Link>
        </div>
        <div className="flex-1 w-full !h-[400px] lg:w-[50%] lg:h-[500px]">
          <SideSelling images={data.section1.sliderImages} />
        </div>
      </section>
      <section className="gap-[50px] px-[16px] lg:px-[32px] mt-[90px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {data.section2.topBlocks
            .slice(0, 3)
            .map((item: any, index: number) => (
              <Link
                href="/birding"
                key={index}
                className={`aspect-square border cursor-pointer flex flex-col items-center justify-center px-[42px] text-center ${
                  index % 2 === 0 ? 'bg-primary ' : 'bg-black text-white'
                }`}
              >
                <h1
                  className={`leading-[52px] ${
                    index % 2 === 0 ? 'text-black' : 'text-white'
                  }`}
                >
                  {item.title}
                </h1>
                <div
                  className={`border w-[50%] my-[24px] ${
                    index % 2 === 0 ? 'border-black' : 'border-white'
                  }`}
                />
                <p className="font-medium">{item.description}</p>
              </Link>
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
          {data.section2.bottomGrid?.map((item: any, index: number) =>
            index <= 1 ? (
              <div key={index} className="relative lg:aspect-square border">
                <Image
                  src={item?.imageUrl ?? '/images/slide.jpg'}
                  alt="bg"
                  height={500}
                  width={500}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 px-[24px] text-white">
                  <h3>{item?.title}</h3>
                  <p>{item?.description}</p>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center lg:px-4 "
                key={item}
              >
                <h1 className="leading-[52px]">{item?.title}</h1>
                <p className="my-6 text-[18px] font-medium">
                  {item?.description}
                </p>
              </div>
            ),
          )}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mt-[90px]">
        <h1 className="text-center">{data.getaways.title}</h1>
        <p className="lg:px-[240px] text-center font-medium">
          {data.getaways.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-6">
          {data?.getaways.getaways_cards?.map((item: any, index: number) => (
            <div key={index} className="w-full border">
              <div className="h-[500px]">
                <Image
                  src={item.heroImageUrl}
                  height={500}
                  width={500}
                  className="h-full w-full object-cover"
                  alt={'img'}
                />
              </div>
              <div className="bg-primary p-4 lg:p-[24px] flex flex-col items-center justify-center">
                <h2 className="text-white text-center">{item.title}</h2>
                <p className="text-center font-medium lg:px-[46px] my-6">
                  {item.description}
                </p>
                <Link href={`/trekking/${item.slug}`}>
                  <Button className="bg-black rounded-none text-primary font-bold hover:bg-black/60">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col lg:flex-row px-[16px] lg:px-[32px] mt-[90px] gap-2 items-stretch">
        {/* LEFT IMAGE SECTION */}
        <div className="w-full lg:w-[70%] relative bg-black/70 flex">
          <Image
            src={data.travelPurpose.imageUrl}
            alt="img"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="w-full lg:w-[34.5%] bg-[#111820] p-[24px] flex flex-col justify-between">
          <div>
            <h2>{data.travelPurpose.title}</h2>

            <p className="text-white text-[16px] mt-[32px]">
              {data.travelPurpose.description1}
            </p>

            <p className="text-white text-[16px] mt-[32px]">
              {data.travelPurpose.description2}
            </p>
          </div>

          <div className="mt-[32px] flex">
            <Link
              className="bg-primary py-2 px-3 text-[20px] font-bold text-white"
              href="/travel-purpose"
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row px-[16px] lg:px-[32px] mt-[90px] gap-2">
        <div className="bg-[#111820] w-full py-10 flex flex-col lg:flex-row">
          <div className="flex lg:w-[50%] p-8">
            <div className="h-[240px] lg:h-full bg-primary w-full lg:w-[25%] border">
              <Image
                src={data.brochure.images[0]?.url}
                alt="img"
                height={500}
                width={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[240px] lg:h-full bg-primary w-full lg:w-[30%] scale-y-110 border">
              <Image
                src={data.brochure.images[1]?.url}
                alt="img"
                height={500}
                width={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[240px] lg:h-full bg-primary w-full lg:w-[25%] border">
              <Image
                src={data.brochure.images[2]?.url}
                alt="img"
                height={500}
                width={500}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-[50%] px-8">
            <h4 className="text-white">{data.brochure.title}</h4>
            <h3>{data.brochure.subtitle}</h3>
            <p className="text-white">{data.brochure.description}</p>
            <div className="flex text-white space-x-8 font-bold mt-4">
              <span className="border-b">{data.brochure.cta1}</span>
              <span className="border-b">{data.brochure.cta2}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center my-[90px] px-[16px] lg:px-[32px]">
        <div className="h-[84vh]">
          <LetsTalk
            images={data.letsTalk.letTalkImage ?? '/images/dummy/img2.jpg'}
            description={data.letsTalk.description}
          />
        </div>
      </section>
    </main>
  );
}
