/* eslint-disable @typescript-eslint/no-explicit-any */
import LetsTalk from '@/components/shared/let-talk';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';
import Image from 'next/image';
import Link from 'next/link';

async function Page() {
  const query = `
  *[_type == "bespoke"][0]{
    title,
    subtitle,
    "link": link.current,
    "image": image.asset->url,

    section_package[]->{
      title,
      category,
      description,
      "image": image.asset->url,
    },

    section_othere_package[]->{
      title,
      category,
      description,
      "image": image.asset->url,      
    },

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

    "bgScrollImage": bgScrollImage.asset->url,

    travelPurposeTitle,
    travelPurposeParagraph1,
    travelPurposeParagraph2,
    travelPurposeButton,

    section1Title,
    section1Description,
    section1Tagline,

    letsTalkTitle,
    letsTalkDescription,
    letsTalkButton
  }
`;

  const data = await client.fetch(query);

  return (
    <main>
      {/* Hero */}
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

      {/* Packages */}
      <section className="flex flex-col gap-[50px] px-[16px] lg:px-[32px] mb-[90px]">
        {data.section_package.map(({ title, description, image }: any, index: number) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-[32px] ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 h-[240px] sm:h-[320px] lg:h-[480px]">
             <Image
          src={urlFor(image).url()}
          alt="Bespoke Journey"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
              <h1>{title}</h1>
              <div className="w-full lg:w-[80%] mx-auto lg:mx-0">
                <p className="text-base lg:text-[16px] text-gray-700 mb-6">
                  {description}
                </p>
              </div>
              <button className="mx-auto lg:mx-0 w-[180px] cursor-pointer bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition">
                View Detail
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Grid Cards */}
      <section className="px-[16px] lg:px-[32px] mb-[90px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full mb-5">
          {data.section_othere_package
            ?.slice(0, 3)
            ?.map(({ image, title, description }: any, index: number) => (
              <div
                key={index}
                className="bg-[#f7f7f7] flex flex-col items-center text-center shadow-sm"
              >
                {/* Image */}
                <div className="w-full h-[280px] sm:h-[350px] relative">
                  <Image
                    src={urlFor(image).url()}
                    alt="Bespoke Journey"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="p-6 flex flex-col items-center">
                  <h3>{title}</h3>
                  <p className="text-[14px] lg:text-[16px] mb-4">
                    {description}
                  </p>
                  <Link
                    href={'/'}
                    className="w-[160px] bg-black text-white font-semibold py-3 text-center hover:bg-gray-800 transition"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Parallax */}
      <section className="relative w-full h-[50vh] lg:h-[80vh] hidden md:block mb-[90px]">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${urlFor(data.bgScrollImage).url()})`,
            backgroundAttachment: 'fixed',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center" />
      </section>

      {/* Split Section */}
      <section className="w-full flex flex-col lg:flex-row px-[16px] lg:px-[32px] mb-[90px] gap-6">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Image */}
          <div className="flex-1 h-[260px] sm:h-[320px] lg:h-[580px] bg-[#2a2423]">
            <Image
              src="/images/dummy/img11.jpg"
              alt="Travel with purpose"
              width={620}
              height={820}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex-1 bg-[#111820] text-white p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
            <h2>{data.travelPurposeTitle}</h2>
            <div className="w-[60px] h-[2px] bg-white mb-6" />
            <p className="text-base mb-4">{data.travelPurposeParagraph1}</p>
            <p className="text-base mb-6">{data.travelPurposeParagraph2}</p>
            <button className="bg-[#7b1c32] text-white px-6 py-3 font-semibold hover:bg-[#611627] transition w-fit">
              {data.travelPurposeButton}
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.section1Title}</h1>
          </div>
          <div className="lg:w-[920px]">
            <p className="text-center my-[24px]">{data.section1Description}</p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold">{data.section1Tagline}</span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>

      <section className="flex flex-col items-center justify-center px-4 md:px-8 mb-[90px] md:mb-20 gap-2">
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto md:max-w-[99%] gap-2">
          {data.section_second_last_package
            ?.slice(0, 3)
            ?.map((item: any, index: number) => (
              <div className="bg-gray-100" key={index}>
                <div className="bg-primary h-[400px]">
                  <Image
                    src={urlFor(item?.image).url()}
                    alt="Bespoke Journey"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center justify-center p-[20px] text-center">
                  <h4>{item?.title}</h4>
                  <p className="mb-[18px] text-[18px]">{item?.description}</p>
                  <Button className="rounded-none bg-black text-[24px]">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto md:max-w-[99%] gap-2 mb-4">
          {data.section_last_package
            ?.slice(0, 2)
            ?.map((item: any, index: number) => (
              <div className="bg-gray-100" key={index}>
                <div className="bg-primary h-[400px]">
                  <Image
                    src={urlFor(item?.image).url()}
                    alt="Bespoke Journey"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center justify-center p-[20px] text-center">
                  <h4>{item?.title}</h4>
                  <p className="mb-[18px] text-[18px]">{item?.description}</p>
                  <Button className="rounded-none bg-black text-[24px]">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* Final CTA */}
      <section className="flex flex-col items-center justify-center mb-[90px] px-[16px] lg:px-[32px]">
        <div className="h-[84vh]">
          <LetsTalk
            images="/images/dummy/img2.jpg"
            description={data.letsTalkDescription}
          />
        </div>
      </section>
    </main>
  );
}

export default Page;
