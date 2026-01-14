/* eslint-disable @typescript-eslint/no-explicit-any */
import BestSelling from '@/components/landing-component/best-selling';
import HeroSwapper from '@/components/landing-component/hero-swapper';
import LetsTalk from '@/components/shared/let-talk';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';
import Image from 'next/image';

async function Page({ params }: any) {
  const query = `*[_type == "flagship" && slug.current == $slug][0]{
  title,
  description,
  category,
  "image": image.asset->url,
  when,
  price,
  howlong,
  hero[]{ title, "image": image.asset->url },
  section1Title,
  section1Description,
  section1Tagline,
  section2Title,
  section2Description,
  section2Btn1,
  section2Btn2,
  boutiqueTitle,
  boutique[]{ title, subtitle },
  card_items[]{title, description, tagline, image},
  section_3[]->{title, description, image, slug},
  section3btn,
  section3link,
  section4Title,
  section4Description,
  section4Tagline,
  letsTalkTitle,
  letsTalkDescription,
  letsTalkButton,
   section_last_package[]->{
      title,
      category,
      description,
      "image": image.asset->url,
    },

    section_second_last_package[]->{
      title,
      category,
      description,
      "image": image.asset->url,
    },
}`;
  const { slug } = await params;
  const data = await client.fetch(query, { slug: slug });

  return (
    <main>
      <section className="relative h-[60vh] md:h-screen w-full overflow-hidden mb-[90px]">
        <Image
          src={urlFor(data?.image).url()}
          alt="Bespoke Journey"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">{data.title}</h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-4 md:px-8 mb-12 md:mb-[90px]">
        <div className="border-[0.5px] border-primary h-20 mb-10" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full md:w-[740px]">
            <h1 className="text-2xl md:text-4xl font-semibold">
              {data.section1Title}
            </h1>
          </div>
          <div className="w-full px-0 md:px-[200px]">
            <p className="text-[14px] md:text-[16px] my-6">
              {data.section1Description}
            </p>
          </div>
          <div className="md:min-w-[250px]">
            <span className="font-bold text-lg md:text-xl">
              {data.section1Tagline}
            </span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-20 my-10" />
        <div className="grid grid-cols-1 md:grid-cols-3  gap-3 justify-items-center px-[200px]">
          <div className="w-full bg-gray-100">
            <div className="bg-primary text-white px-[20px] text-center">
              <h4 className="text-white">WHEN</h4>
            </div>
            <div className="p-[20px] font-bold text-center">{data.when}</div>
          </div>
          <div className="w-full bg-gray-100">
            <div className="bg-primary px-[20px] text-center">
              <h4 className="text-white">PRICE</h4>
            </div>
            <div className="p-[20px] font-bold text-center">
              <p>{data.price}</p>
            </div>
          </div>
          <div className="w-full bg-gray-100">
            <div className="bg-primary px-[20px] text-center">
              <h4 className="text-white">HOW LONG</h4>
            </div>
            <div className="p-[20px] font-bold text-center">
              <p>{data.howlong}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-[90px]"><HeroSwapper swapper={data.hero} /></section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px] gap-4">
        <div className="w-full py-[50px] bg-primary h-[420px] flex flex-col md:flex-row justify-center md:space-x-6">
          <div className="md:w-[70%] px-[12px]">
            <h6 className="text-white">{data.section2Title}</h6>
            <p className="text-[14px]  md:text-[16px] mt-[14px]">
              {data.section2Description}
            </p>
          </div>
          <div className="flex flex-col space-y-4 px-[12px]">
            <Button className="bg-black rounded-none text-white font-bold text-[24px] py-[24px]">
              {data.section2Btn1}
            </Button>
            <Button className="bg-black rounded-none text-white font-bold text-[24px] py-[24px]">
              {data.section2Btn1}
            </Button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px] gap-4">
        {data?.card_items?.map((item: any, index: number) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row w-full justify-center md:space-x-2 ${
              (index + 1) % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="md:h-[500px] aspect-square w-full">
              <Image
                src={urlFor(item?.image).url()}
                alt=""
                className="object-cover h-full w-full"
                height={500}
                width={500}
              />
            </div>
            <div className="flex flex-col justify-center md:px-4 md:h-[500px] aspect-square w-full">
              <h1>{item?.title}</h1>
              <p className="text-[14px] md:text-[16px]">{item?.description}</p>
              <p className="font-bold mt-4 italic text-[18px] text-primary">
                {item?.tagline}
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px] gap-4">
        <h2>{data.boutiqueTitle}</h2>
        <div className="my-[32px] flex flex-col md:flex-row gap-2 w-full">
          {data.boutique.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-primary flex-1 min-h-[520px] flex flex-col items-center justify-center"
            >
              <h1 className="text-white">{item.title}</h1>
              <p className="text-[24px] font-bold">{item.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <Button className="rounded-none bg-black text-[24px] py-8 px-[32px]">
            {data.section3btn}
          </Button>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-4 md:px-8 mb-[90px]">
        <div className="border-[0.5px] border-primary h-20 mb-10" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full md:w-[740px]">
            <h1 className="text-2xl md:text-4xl font-semibold">
              {data.section4Title}
            </h1>
          </div>
          <div className="w-full md:w-[920px]">
            <p className="text-[14px] md:text-[16px] my-6">
              {data.section4Description}
            </p>
          </div>
          <div className="md:min-w-[250px]">
            <span className="font-bold text-lg md:text-xl">
              {data.section4Tagline}
            </span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-20 mt-10" />
      </section>
      <section className="flex flex-col items-center justify-center px-4 md:px-8 mb-[90px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {data.section_second_last_package
            ?.slice(0, 3)
            ?.map((item: any, index: number) => (
              <div className="bg-gray-100" key={index}>
                <div className="bg-primary w-full h-[350px]">
                  <Image
                    src={urlFor(item?.image).url()}
                    alt="Bespoke Journey"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center justify-center p-[20px] text-center">
                  <h4>{item.title}</h4>
                  <p className="mb-[18px] text-[18px]">{item.description}</p>
                  <Button className="rounded-none bg-black text-[24px]">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
          {data.section_last_package
            ?.slice(0, 2)?.map((item: any, index: number) => (
            <div className="bg-gray-100" key={index}>
              <div className="bg-primary w-full h-[520px]">
                <Image
                    src={urlFor(item?.image).url()}
                    alt="Bespoke Journey"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
              </div>
              <div className="flex flex-col items-center justify-center p-[20px] text-center">
                <h4>{item.title}</h4>
                <p className="text-[18px] mb-[18px]">
                  {item.description}
                </p>
                <Button className="rounded-none bg-black text-[24px]">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[calc(32px-16px)] mb-[90px]">
        <BestSelling data={data.section_3}  />
      </section>
      {/* <section className="bg-[#111820] w-full p-[24px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-3">
            <h1>Let’s Talk</h1>
          </div>
          <div className="flex-2">
            <p className="text-white text-[20px]">
              Combine helicopter journeys with sustainable luxury lodges,
              curated local cuisine, and intimate cultural experiences for a
              fully bespoke Bhutanese exploration.
            </p>
          </div>
        </div>
        <div
          className="w-full mt-[32px] h-[540px] flex items-center justify-center relative group cursor-pointer overflow-hidden"
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
      </section> */}
      <div className="lg:h-[84vh] mb-24 px-[32px]">
        <LetsTalk
          images="/images/dummy/img3.jpg"
          description={data.letsTalkDescription}
        />
      </div>
    </main>
  );
}

export default Page;
