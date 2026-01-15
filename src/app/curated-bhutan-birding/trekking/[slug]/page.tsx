/* eslint-disable @typescript-eslint/no-explicit-any */
import LetsTalk from '@/components/shared/let-talk';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SideSelling from '../../components/slider';
import { client } from '@/lib/senity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const query = `*[_type == "trek" && slug.current == $slug][0]{
  title,
  "slug": slug.current,

  // ============ HERO ============
  hero{
    image{asset->{url}},
    title,
    subtitle
  },

  // ============ INTRO ============
  intro{
    title,
    description,
    tagline
  },

  // ============ SLIDER IMAGES ============
  sliderImages[]{
    asset->{url}
  },

  // ============ TREK FACTS ============
  facts{
    bestSeason,
    highAltitude,
    lowAltitude,
    days,
    grade
  },


 essentialsHeader{
  title,
  description,
},


  // ============ ESSENTIAL INFO ============
  essentialsLeft[]{
    type,
    title,
    description,
    "imageUrl": image.asset->url
  },

   essentialsRight[]{
    type,
    title,
    description,
    "imageUrl": image.asset->url
  },

  // ============ LET'S TALK ============
  letsTalk{
    "imageUrl": image.asset->url,
    description
  },

  // ============ PARALLAX IMAGE ============
  "parallaxImageUrl": parallaxImage.asset->url,

  // ============ TRAVEL WITH PURPOSE ============
  purpose{
    "imageUrl": image.asset->url,
    title,
    description1,
    description2,
    buttonLink
  },

  // ============ RELATED TREKS ============
relatedTreks[]->{
  title,
  description,
  slug,
  hero{
    "imageUrl": image.asset->url,
    title,
    subtitle
  }
},
  relatedTreks2[]->{
  title,
  description,
  slug,
  hero{
    "imageUrl": image.asset->url,
    title,
    subtitle
  }
}
}`;
  const { slug } = await params;

  const data = await client.fetch(query, { slug }, { next: { revalidate: 0 } });

  return (
    <main>
      <section className="relative h-[60vh] md:h-screen w-full overflow-hidden mb-[90px]">
        <Image
          src={data.hero.image?.asset?.url}
          alt="Hero image"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">
            {data.hero.title} <br />
            {data.hero.subtitle}
          </h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1> {data.intro.title}</h1>
          </div>
          <div className="lg:w-[920px]">
            <p className="text-center my-[24px]">{data.intro.description}</p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold">{data.intro.tagline}</span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] my-[40px]" />
      </section>
      <section className="flex items-center justify-center px-[16px] lg:px-[32px] mb-[90px] gap-2">
        <div className="flex-1 h-[362px] w-[50%]">
          <SideSelling images={data.sliderImages} />
        </div>
        <div className="flex-1  space-y-2">
          <div className="flex gap-2">
            <div className="flex-2 border p-4 bg-primary">
              <h3 className="text-black">Best Season</h3>
              <p className="text-white font-medium">{data.facts.bestSeason}</p>
            </div>
            <div className="flex-1 border p-4 bg-primary text-center">
              <h3 className="text-black">Alt.m</h3>
              <p className="text-white font-medium">
                {data.facts.highAltitude}
              </p>
              <p className="text-white font-medium">{data.facts.lowAltitude}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 border bg-primary py-6 px-4 text-center">
              <h3 className="text-black">On Trek</h3>
              <p className="text-white font-medium">{data.facts.days}</p>
            </div>
            <div className="flex-1 border bg-primary py-6 px-4 text-center">
              <h3 className="text-black">Grade</h3>
              <p className="text-white font-medium">{data.facts.grade}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <h1 className="text-center">Essential Information for the Trek</h1>
        <p className="lg:px-[240px] text-center font-medium">
          The Gangkar puensum Trek is one of Bhutan’s most legendary
          high-altitude adventures. To help you prepare, here are the key things
          every traveler must know before embarking on this once-in-a-lifetime
          journey.
        </p>
        <div className="flex flex-col lg:flex-row w-full gap-2 mt-12">
          <div className="w-[50%]">
            {data.essentialsLeft.map((item: any, index: number) =>
              item.type === 'image' ? (
                <div key={index} className="bg-primary h-[540px]">
                  <Image
                    src={item.imageUrl}
                    alt="Hero image"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="py-10" key={index}>
                  <h2>{item.title}</h2>
                  <p>
                   {item.description}
                  </p>
                  <p className="font-bold text-primary pt-4">
                    {item.tagline}
                  </p>
                </div>
              )
            )}
          </div>
          <div className="w-[50%]">
           {data.essentialsRight.map((item: any, index: number) =>
              item.type === 'image' ? (
                <div key={index} className="bg-primary h-[540px]">
                  <Image
                    src={item.imageUrl}
                    alt="Hero image"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="py-10" key={index}>
                  <h2>{item.title}</h2>
                  <p>
                   {item.description}
                  </p>
                  <p className="font-bold text-primary pt-4">
                    {item.tagline}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="h-[84vh]">
          <LetsTalk
            images="/images/dummy/img2.jpg"
            description={data.letsTalk.description}
          />
        </div>
      </section>
      <section className="relative w-full h-[80vh] hidden lg:block mb-[90px]">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${data.parallaxImageUrl})`,
            backgroundAttachment: 'fixed',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center" />
      </section>
      <section className="flex flex-col lg:flex-row px-[16px] lg:px-[32px] gap-2 mb-[90px]">
        {/* LEFT IMAGE SECTION */}
        <div className="w-full lg:w-[70%] min-h-[40vh] lg:min-h-[80vh] bg-black/70">
          <Image
            src={data.purpose.imageUrl}
            alt="img"
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="w-full lg:w-[34.5%] bg-[#111820] p-[24px] flex flex-col justify-between">
          <div>
            <h2>{data.purpose.title}</h2>

            <p className="text-white text-[16px] mt-[32px]">
             {data.purpose.description1}
            </p>

            <p className="text-white text-[16px] mt-[32px]">
               {data.purpose.description2}
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
      <section className="flex flex-col px-[16px] lg:px-[32px] items-center justify-center gap-2 mb-[90px]">
        <h2>{data.essentialsHeader.title}</h2>
        <p className="my-[24px] text-center px-[142px]">
         {data.essentialsHeader.description}
        </p>
        <div className="grid grid-cols-3 gap-2 w-full">
          {data.relatedTreks?.map((item: any, index: number) => (
            <div key={index} className="w-full">
              <div className="w-full border h-[400px]">
                 <Image
            src={item.hero.imageUrl}
            alt="img"
            height={400}
            width={400}
            unoptimized
            className="h-full w-full object-cover"
          />
              </div>
              <div className="p-[24px] bg-primary text-center">
                <h3 className="text-white">{item.title}</h3>
                <p className="my-4">
                {item.description}
                </p>
                <Link href="#" className="text-black font-bold underline">
                  <Button className="bg-black rounded-none text-primary font-bold hover:bg-black/80">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mt-2">
          {data.relatedTreks2.slice(0,2)?.map((item: any, index: number) => (
            <div key={index} className="w-full">
              <div className="w-full border h-[540px]"> <Image
            src={item.hero.imageUrl}
            alt="img"
            height={400}
            width={400}
            unoptimized
            className="h-full w-full object-cover"
          /></div>
              <div className="p-[24px] bg-primary text-center">
                <h3 className="text-white">{item.title}</h3>
                <p className="my-4">
                  {item.description}
                </p>
                <Link href="/" className="text-black font-bold underline">
                  <Button className="bg-black rounded-none text-primary font-bold hover:bg-black/80">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
