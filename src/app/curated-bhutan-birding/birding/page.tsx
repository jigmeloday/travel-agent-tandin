/* eslint-disable @typescript-eslint/no-explicit-any */
import LetsTalk from '@/components/shared/let-talk';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import ImageSlider from './components/slider';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';

export default async function Page() {
  const query = `
  *[_type == "birdingTourPage"][0]{
    heroImage,
    title,
    introDescription,
    tagline,

    sliderImages[]{
    asset->{url}
  },

    essentialsHeader,
    essentialsLeft[]{ type, title, description, tagline,  "imageUrl": image.asset->url },
    essentialsRight[]{ type, title, description, tagline,  "imageUrl": image.asset->url },
    letsTalkDescription,

    parallaxImage,

    purposeTitle,
    purposeDescription1,
    purposeDescription2,
    purposeImage,

    relatedTreksSection,
    relatedTreks[]->{
      _id,
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
      _id,
      title,
      description,
      slug,
       hero{
    "imageUrl": image.asset->url,
    title,
    subtitle
  }
    }
  }
`;

  const data = await client.fetch(query);
  console.log(data.sliderImages);
  return (
    <main>
      <section className="relative h-[60vh] md:h-screen w-full overflow-hidden mb-[90px]">
        <Image
          src={urlFor(data?.heroImage)?.url()}
          alt="Bespoke Journey"
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">
            Curated Adventure <br />
            Multi-day Trekking & Exploration
          </h1>
        </div> */}
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.title}</h1>
          </div>
          <div className="lg:w-[920px]">
            <p className="text-center my-[24px]">{data.introDescription}</p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold">{data.tagline}</span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] my-[40px]" />
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <ImageSlider images={data.sliderImages} />
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <h1 className="text-center">{data.essentialsHeader.title}</h1>
        <p className="lg:px-[240px] text-center font-medium">
          {data.essentialsHeader.description}
        </p>
        <div className="flex flex-col lg:flex-row w-full gap-2 mt-12">
          <div className="lg:w-[50%]">
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
                  <p>{item.description}</p>
                  <p className="font-bold text-primary pt-4">{item.tagline}</p>
                </div>
              )
            )}
          </div>
          <div className="lg:w-[50%]">
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
                  <p>{item.description}</p>
                  <p className="font-bold text-primary pt-4">{item.tagline}</p>
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
            description={data.letsTalkDescription}
          />
        </div>
      </section>
      <section className="relative w-full h-[80vh] hidden lg:block mb-[90px]">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/slide.jpg')",
            backgroundAttachment: 'fixed',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center" />
      </section>
      <section className="flex flex-col lg:flex-row px-[16px] lg:px-[32px] gap-2 mb-[90px]">
        {/* LEFT IMAGE SECTION */}
        <div className="w-full lg:w-[70%] min-h-[40vh] lg:min-h-[80vh] bg-black/70">
          <Image
            src="/images/dummy/img4.jpg"
            alt="img"
            height={1000}
            width={1000}
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="w-full lg:w-[34.5%] bg-[#111820] p-[24px] flex flex-col justify-between">
          <div>
            <h2>{data.purposeTitle}</h2>

            <p className="text-white text-[16px] mt-[32px]">
              {data.purposeDescription1}
            </p>

            <p className="text-white text-[16px] mt-[32px]">
              {data.purposeDescription2}
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
        <h2>{data.relatedTreksSection.title}</h2>
        <p className="my-[24px] text-center lg:px-[142px]">
          {data.relatedTreksSection.description}
        </p>
        <div className="grid lg:grid-cols-3 gap-2 w-full">
          {data.relatedTreks.map((item: any, index: number) => (
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
                <p className="my-4">{item.description}</p>
                <Link
                  href={`/curated-bhutan-birding/trekking/${item.slug.current}`}
                >
                  <Button className="bg-black rounded-none text-primary font-bold hover:bg-black/60">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-2 w-full mt-2">
          {data.relatedTreks2.map((item: any, index: number) => (
            <div key={index} className="w-full">
              <div className="w-full border h-[540px]">
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
                <p className="my-4">{item.description}</p>
                <Link
                  href={`/curated-bhutan-birding/birding/${item.slug.current}`}
                >
                  <Button className="bg-black rounded-none text-primary font-bold hover:bg-black/60">
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
