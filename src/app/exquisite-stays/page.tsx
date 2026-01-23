/* eslint-disable @typescript-eslint/no-explicit-any */
import BestSelling from '@/components/landing-component/best-selling';
import LetsTalk from '@/components/shared/let-talk';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';
import Image from 'next/image';
import Link from 'next/link';

async function Page() {
  const query = `
  *[_type == "exquisite"][0]{
    title,
    subtitle,
    herotitle,
    herosubtitle,
    "bImage": bannerImage.asset->url,
    "link": link.current,
    
    "image1": image1.asset->url,
    "image2": image2.asset->url,
    "image3": image3.asset->url,
    "image4": image4.asset->url,

    section1_title,
    section1_description,
    section1_tagline,

    // Updated bgScrollImage to support image/video
    bgScrollImage{
      type,
      image{
        asset->{
          _id,
          url
        }
      },
      video{
        asset->{
          _id,
          url
        }
      },
      title,
      description
    },

    section2Title,
    section2Description,
    section2Tagline,
    "section2Image1": section2Image1.asset->url,
    "section2Image2": section2Image2.asset->url,

    letsTalkTitle,
    letsTalkDescription,
    letsTalkButton,
    "letTalkImage": letsTalk.asset->url,
    section3Title,
    section3Description,
    section3Tagline,

    section_slug[]->{
      title,
      subtitle,
      slug,
      "image": image.asset->url,
      "link": link.current
    },

    section_3[]->{
      title,
      description,
      category,
      "image": image.asset->url,
      slug
    }
  }
`;

  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden mb-[90px]">
        <Image
          src={urlFor(data?.bImage).url()}
          alt="Culture"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />

        {/* <div className="absolute inset-0 bg-gradient-to-r from-white/12 via-white/14 to-white/50"></div> */}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full h-full px-4 md:px-[50px] pb-4 md:pb-[40px]">
            <div className="flex flex-1 items-center justify-center md:justify-start mb-4 md:mb-0">
              <h1 className="text-4xl md:text-[80px] font-bold drop-shadow-lg text-center md:text-left">
                {data.herotitle}
              </h1>
            </div>
            <div className="flex flex-col flex-1 items-center md:items-end justify-center md:justify-end text-center md:text-right">
              <p className="text-xl md:text-[40px] font-sans w-[80%]">
                {data.herosubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Square Images */}
      <section className="px-4 lg:px-[32px] mb-[90px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="aspect-square bg-gray-200">
            <Image
              src={urlFor(data?.image1).url()}
              alt="Exquisite Stays"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square bg-gray-200">
            <Image
              src={urlFor(data?.image2).url()}
              alt="Exquisite Stays"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Horizontal Image Section */}
        <div className="flex flex-col md:flex-row w-full mt-3 md:mt-[12px] gap-4 md:gap-2">
          <div className="flex flex-1 gap-2 flex-col md:flex-row">
            <div className="w-full h-64 md:h-[440px] bg-gray-200">
              <Image
                src={urlFor(data?.image3).url()}
                alt="Exquisite Stays"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-64 md:h-[440px] bg-gray-200">
              <Image
                src={urlFor(data?.image4).url()}
                alt="Exquisite Stays"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex-1 mt-4 md:mt-0">
            <div className="flex flex-col justify-between h-full p-2 md:p-4">
              <div className="w-full md:w-[80%]">
                <h1 className="text-xl md:text-2xl lg:text-3xl">
                  {data.section1_title}
                </h1>
                <p className="text-[14px] md:text-[16px] mt-2">
                  {data.section1_description}
                </p>
              </div>
              <div>
                <p className="text-sm md:text-[18px] font-bold mt-2">
                  {data.section1_tagline}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-0 w-[64%] border-b-4 border-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Luxury Experience Section */}
      <section className="w-full h-auto md:h-[70vh] bg-[#111820] mb-[90px]">
        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 flex items-center justify-center gap-2 mb-6 md:mb-0">
            <div className="transform translate-y-0 md:translate-y-6 w-48 md:w-60 h-64 md:h-[430px]">
              <Image
                src={urlFor(data?.section2Image1).url()}
                alt="Exquisite Stays"
                fill
                className="object-cover"
              />
            </div>
            <div className="transform translate-y-0 md:-translate-y-6 w-48 md:w-60 h-64 md:h-[430px]">
              <Image
                src={urlFor(data?.section2Image2).url()}
                alt="Exquisite Stays"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 md:gap-6 p-4 md:p-[64px] flex-1 text-center md:text-left">
            <div>
              <h1 className="mb-0 leading-[1.2] text-2xl md:text-4xl w-[80%]">
                {data.section2Title}
              </h1>
              <div className="border-b-4 border-white w-[24%]" />
            </div>
            <p className="text-white text-[14px] md:text-[16px]">
              {data.section2Description}
            </p>
            <p className="text-white font-bold font-sans text-base md:text-[18px]">
              {data.section2Tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Let’s Talk Section */}
      <section className="flex flex-col items-center justify-center my-12 px-4 md:px-[16px] mb-[90px]">
        <div className="h-[84vh] w-full">
          <LetsTalk
            description={data.letsTalkDescription}
            images={data.letTalkImage ?? '/images/dummy/img2.jpg'}
          />
        </div>
      </section>
      {/* Parallax Section */}
      <section className="relative w-full h-[80vh] hidden lg:block mb-[90px]">
        {/* Background - Image or Video */}
        {data?.bgScrollImage?.type === 'video' ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={data.bgScrollImage.video?.asset?.url}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${urlFor(data.bgScrollImage.image).url()})`,
              backgroundAttachment: 'fixed',
            }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center" />

        {/* Optional Text */}
        {data?.bgScrollImage?.title || data?.bgScrollImage?.description ? (
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-6 lg:px-32">
            {data.bgScrollImage.title && (
              <h1 className="text-4xl font-bold mb-4 text-white">
                {data.bgScrollImage.title}
              </h1>
            )}
            {data.bgScrollImage.description && (
              <p className="text-lg font-semibold">
                {data.bgScrollImage.description}
              </p>
            )}
          </div>
        ) : null}
      </section>

      {/* Nature Section */}
      <section className="flex flex-col items-center justify-center px-4 lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.section3Title}</h1>
          </div>
          <div className="lg:w-[920px]">
            <p className="text-[14px] md:text-[16px] text-center my-[24px]">
              {data.section3Description}
            </p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold">{data.section3Tagline}</span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>

      {/* Grid Section */}
      <section className="px-4 lg:px-[32px] mb-[90px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {data?.section_slug?.map(
            ({ image, title, subtitle, slug }: any, idx: number) => (
              <Link
                key={idx}
                href={`/${slug.current}`}
                className="relative flex flex-col items-center justify-center w-full aspect-square text-center overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-center bg-cover transition duration-300"
                  style={{ backgroundImage: `url('${image}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/60"></div>
                <h3 className="relative z-10 text-white text-lg md:text-xl font-semibold after:content-[''] after:block after:w-0 after:h-[2px] after:bg-white after:mx-auto after:transition-all after:duration-300 group-hover:after:w-full after:origin-center">
                  {title}
                </h3>
                <p className="relative z-10 text-white text-sm md:text-base">
                  {subtitle}
                </p>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Flagship Section */}
      <section className="flex flex-col justify-center items-center text-center mb-[90px]">
        <h1 className="mb-10">Flagship Signature Journey</h1>
        <BestSelling data={data.section_3} />
      </section>
    </main>
  );
}

export default Page;
