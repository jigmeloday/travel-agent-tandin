/* eslint-disable @typescript-eslint/no-explicit-any */
import SliderComponent from '@/components/landing-component/slider';
import ImageBox from '@/components/shared/image-box';
import LetsTalk from '@/components/shared/let-talk';
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
  "bImage": bannerImage.asset->url,
  section_1{ title, description, tag_line },
  section_slug[]->{ title, subtitle, image{ asset->{ _id, url } }, slug },
  section_10_slider[]{ title, subtitle, description, cta, img{ asset->{ _id, url } } },
  blogTitle,
    blogSubtitle,
    blog[]->{
      title,
      slug,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    section_12[]{ title, image{ asset->{ _id, url } }, links },

  // section_package[]->{
  //   title,
  //   category,
  //   shortDescription,
  //   description,
  //   "image": image.asset->url,
  //   slug
  // },

  // section_othere_package[]->{
  //   title,
  //   category,
  //   shortDescription,
  //   slug,
  //   "image": image.asset->url,      
  // },

  // section_last_package[]->{
  //   title,
  //   category,
  //   shortDescription,
  //   slug,
  //   "image": image.asset->url,
  // },

  // section_second_last_package[]->{
  //   title,
  //   category,
  //   shortDescription,
  //   slug,
  //   "image": image.asset->url,
  // },

  // 🌟 Updated: bgScrollMedia can be image or video
  bgScrollMedia {
    type,
    title,
    "imageUrl": select(type == "image" => image.asset->url),
    "videoUrl": select(type == "video" => video.asset->url)
  },

  travelPurposeTitle,
  travelPurposeParagraph1,
  travelPurposeParagraph2,
  travelPurposeButton,

  // section1Title,
  // section1Description,
  // section1Tagline,

  letsTalkTitle,
  letsTalkDescription,
  "letTalkImage": letsTalk.asset->url, // get URL directly

  letsTalkButton
}
`;

  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-screen w-full overflow-hidden mb-[90px]">
        <Image
          src={urlFor(data?.bImage).url()}
          alt="Bespoke Journey"
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">{data.title}</h1>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] my-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.section_1.title}</h1>
          </div>
          <div className="lg:w-[920px]">
            <p className="text-center my-[24px]">
              {data.section_1.description}
            </p>
          </div>
          <div className="lg:min-w-[250px]">
            <span className="font-bold">{data.section_1.tag_line}</span>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>


      {/* Packages */}
      {/* <section className="flex flex-col gap-[50px] px-[16px] lg:px-[32px] mb-[90px]">
        {data.section_package.map(
          ({ title, description, image, slug }: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-[32px] ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full lg:w-1/2 h-[240px] sm:h-[320px] lg:h-[480px]">
                <Image
                  src={urlFor(image).url()}
                  alt="Bespoke Journey"
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                <h1 className='mb-4'>{title}</h1>
                <div className="w-full] mx-auto lg:mx-0">
                  <p className="text-base lg:text-[16px] text-gray-700 mb-6">
                    {description}
                  </p>
                </div>
                <Link href={`/packages/${slug.current}`}>
                  <button className="mx-auto lg:mx-0 w-[180px] cursor-pointer bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition">
                    View Detail
                  </button>
                </Link>
              </div>
            </div>
          ),
        )}
      </section> */}

      {/* Grid Cards */}
      {/* <section className="px-[16px] lg:px-[32px] mb-[90px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full mb-5">
          {data.section_othere_package
            ?.slice(0, 3)
            ?.map(({ image, title, shortDescription, slug }: any, index: number) => (
              <div
                key={index}
                className="bg-[#f7f7f7] flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-full h-[280px] sm:h-[350px] relative">
                  <Image
                    src={urlFor(image).url()}
                    alt="Bespoke Journey"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col items-center">
                  <h3>{title}</h3>
                  <p className="text-[14px] lg:text-[16px] mb-4">
                    {shortDescription}
                  </p>
                  <Link
                    href={`/packages/${slug.current}`}
                    className="w-[160px] bg-black text-white font-semibold py-3 text-center hover:bg-gray-800 transition"
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section> */}
      {/* Parallax */}
      <section className="relative w-full h-[50vh] lg:h-[80vh] hidden md:block mb-[90px] overflow-hidden">
        {/* IMAGE */}
        {data.bgScrollMedia?.type === 'image' && (
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${data.bgScrollMedia.imageUrl ?? '/images/dummy/img1.jpg'})`,
              backgroundAttachment: 'fixed', // parallax scroll effect
            }}
          />
        )}

        {/* VIDEO */}
        {data.bgScrollMedia?.type === 'video' && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              height: '100%',
              width: '100%',
              top: 0,
              left: 0,
              backgroundAttachment: 'fixed', // SAME as your image
            }}
          >
            <video
              src={data.bgScrollMedia.videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                pointerEvents: 'none',
              }}
            />
          </div>
        )}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <h2 className="text-white text-center px-4">{data.bgScrollMedia?.title}</h2>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 px-[16px] lg:px-[32px] gap-2 mb-[90px]">
        {data.section_slug?.map(
          ({ image, title, subtitle, slug }: any, index: number) => (
            <ImageBox
              key={index}
              slug={slug}
              image={image}
              label={title || ''}
              subtitle={subtitle}
            />
          ),
        )}
      </section>

      {/* Split Section */}
      
      <section className="flex flex-col lg:flex-row px-[16px] lg:px-[32px] mb-[90px] gap-2">
        <div className="w-full lg:w-[70%] min-h-full bg-black/70">
          <Image
            src={data.letTalkImage ?? '/images/dummy/img4.jpg'}
            alt="img"
            height={500}
            width={500}
            className="h-[650px] w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-[34.5%] bg-[#111820] p-[24px] flex flex-col justify-between">
          <div>
            <h2>{data.stravelPurposeTitle}</h2>
            <p className="text-white text-[16px] mt-[32px]">
              {data.travelPurposeParagraph1}
            </p>
            <p className="text-white text-[16px] mt-[32px]">
              {data.travelPurposeParagraph2}
            </p>
          </div>
          <div className="mt-[32px] flex">
            <Link
              className="bg-primary py-2 px-3 text-[20px] font-bold text-white"
              href="/travel-purpose"
            >
              {data.travelPurposeButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="my-[42px] px-[16px] lg:px-[32px]">
        <SliderComponent data={data.section_10_slider} />
      </section>
      <section className="flex flex-col items-center justify-center my-[90px] lg:px-[32px] px-[16px]">
        <h1 className="text-3xl font-bold">{data.blogTitle}</h1>
        <p className="font-bold mt-2">{data.blogSubtitle}</p>

        <div className="flex w-full scrollbar-hide scrollbar-hide::-webkit-scrollbar  gap-3 mt-[40px] overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent">
          {data.blog.map(({ image, title, slug }: any, index: number) => (
            <Link
              href={`/blog/${slug.current}`}
              key={index}
              className="
        relative 
        min-w-[280px] sm:min-w-[320px] 
        lg:basis-1/3 lg:min-w-0       
        aspect-square flex items-center justify-center 
        overflow-hidden group cursor-pointer snap-start shrink-0
      "
              style={{
                backgroundImage: `url(${image.asset.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative text-center text-white">
                <h4 className="text-xl font-bold text-white relative inline-block after:content-[''] after:block after:h-[2px] after:w-0 after:bg-primary after:mx-auto after:transition-all after:duration-500 delay-75 group-hover:after:w-full">
                  {`${title.slice(0, 30)}...`}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 px-[16px] lg:px-[32px] mb-[90px] gap-2 h-[80vh]">
        {data.section_12.map((item: any, index: number) => (
          <Link
            key={index}
            href={item.links}
            className="border relative flex items-center justify-center"
          >
            <Image
              src={urlFor(item.image).url()}
              alt="image"
              width={400}
              height={400}
              className="h-full w-full object-cover absolute"
            />
            <h2 className="z-40 text-white">{item.title}</h2>
          </Link>
        ))}
      </section>
      {/* <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
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
      </section> */}

      {/* <section className="flex flex-col items-center justify-center px-4 md:px-8 mb-[90px] md:mb-20 gap-2">
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
                  <p className="mb-[18px] text-[18px]">{item?.shortDescription}</p>
                  <Link href={`/packages/${item.slug.current}`}>
                    <Button className="rounded-none bg-black text-[24px]">
                      View Details
                    </Button>
                  </Link>
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
                  <p className="mb-[18px] text-[18px]">{item?.shortDescription}</p>
                  <Link href={`/packages/${item.slug.current}`}>
                    <Button className="rounded-none bg-black text-[24px]">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section> */}
      {/* Final CTA */}
      <section className="flex flex-col items-center justify-center mb-[90px] px-[16px] lg:px-[32px]">
        <div className="h-[84vh] w-full">
          <LetsTalk
            images={data.letTalkImage ?? '/images/dummy/img2.jpg'}
            description={data.letsTalkDescription}
          />
        </div>
      </section>
    </main>
  );
}

export default Page;
