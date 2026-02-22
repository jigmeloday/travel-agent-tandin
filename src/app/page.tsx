/* eslint-disable @typescript-eslint/no-explicit-any */
import BestSelling from '@/components/landing-component/best-selling';
import HeroSwapper from '@/components/landing-component/hero-swapper';
import SliderComponent from '@/components/landing-component/slider';
import ImageBox from '@/components/shared/image-box';
import LetsTalk from '@/components/shared/let-talk';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';
import * as Icons from 'lucide-react';
type IconName = keyof typeof Icons;

export default async function Home() {
  const query = `
  *[_type == "homePage"][0]{
    hero[]{ 
      title, 
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
      }
    },
    section_1{ title, description, tag_line },
    section_2-> { title, subtitle, link, image{ asset->{ _id, url } } },
    section_21-> { title, subtitle, link, image1{ asset->{ _id, url } } },
    section_22-> { title, subtitle, link, cover{ asset->{ _id, url } } },
    section_3[]->{ title, description, image{ asset->{ _id, url } }, slug },
    section_4{ 
      title, 
      description, 
      items[]{ title, description, icon }, 
      button_text, 
      button_link 
    },
    section_5[]->{ title, description, image{ asset->{ _id, url } }, category, slug },
    section_6_background_scroll{
      title, 
      description, 
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
      }
    },
    section_slug[]->{ title, subtitle, image{ asset->{ _id, url } }, slug },
    section_7{ title, description },
    section_9{ 
      title, 
      description_1, 
      description_2, 
      btn, 
      image{
        asset->{
          _id,
          url
        }
      } 
    },
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
    section_13{ title, description, btn_text, image{ asset->{ _id, url } } },
  }
`;

  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });

  return (
    <main>
      <section className="h-screen w-full overflow-hidden">
        <HeroSwapper swapper={data?.hero} />
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

      <section className="px-4 lg:px-[32px] mb-[90px]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-2 gap-3 w-full mb-5">
          <Link
            href={'/bespoke-journey'}
            className="relative w-full aspect-square text-center overflow-hidden group cursor-pointer"
          >
            <Image
              src={urlFor(data.section_2?.image).url()}
              alt={data.section_2.title || 'Tour Image'}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 transition-all duration-500 ease-in-out flex flex-col items-center justify-center">
              <h4 className="relative inline-block text-white after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/80 after:transition-all after:duration-300 after:ease-out group-hover:after:left-0 group-hover:after:w-full">
                {data.section_2.title}
              </h4>
              <span className="text-[14px] lg:text-[16px] text-white">
                {data.section_2.subtitle}
              </span>
            </div>
          </Link>
          <Link
            href={'/exquisite-stays'}
            className="relative w-full aspect-square text-center overflow-hidden group cursor-pointer"
          >
            <Image
              src={urlFor(data?.section_21?.image1)?.url()}
              alt={data.section_21.title || 'Tour Image'}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 transition-all duration-500 ease-in-out flex flex-col items-center justify-center">
              <h4 className="relative inline-block text-white after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/80 after:transition-all after:duration-300 after:ease-out group-hover:after:left-0 group-hover:after:w-full">
                {data?.section_21?.title}
              </h4>
              <span className="text-[14px] lg:text-[16px] text-white">
                {data.section_21?.subtitle}
              </span>
            </div>
          </Link>
          <Link
            href={'/culture-wellness'}
            className="relative w-full aspect-square text-center overflow-hidden group cursor-pointer"
          >
            <Image
              src={urlFor(data.section_22?.cover).url()}
              alt={data.section_22.title || 'Tour Image'}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 transition-all duration-500 ease-in-out flex flex-col items-center justify-center">
              <h4 className="relative inline-block text-white after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/80 after:transition-all after:duration-300 after:ease-out group-hover:after:left-0 group-hover:after:w-full">
                {data.section_22.title}
              </h4>
              <span className="text-[14px] lg:text-[16px] text-white">
                {data.section_22.subtitle}
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center text-center mb-[90px]">
        <h1 className="mb-8">Flagship Signature Journey</h1>
        <BestSelling data={data.section_3} />
      </section>

      <section className="flex flex-col justify-center items-center text-center px-4 lg:px-[32px] scrollbar-hide mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <h1>{data.section_4.title}</h1>
        <div className="md:max-w-[840px]">
          <p>{data.section_4.description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 items-start justify-center  my-[40px] gap-4">
          {data.section_4.items.map(
            ({ title, description, icon }: any, index: number) => {
              const IconComponent = Icons[
                icon as IconName
              ] as React.ComponentType<{ className?: string }>;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex items-center justify-center size-[60px] rounded-full bg-primary">
                    {IconComponent && <IconComponent className="text-white" />}
                  </div>
                  <p className="mt-4 text-[16px] text-primary font-bold">
                    0{index + 1}. {title}
                  </p>
                  <div className="md:w-[300px]">
                    <p>{description}</p>
                  </div>
                </div>
              );
            },
          )}
        </div>
        <Link
          href="/contact-us"
          className="px-[24px] py-[12px] bg-primary text-white text-2xl cursor-pointer"
        >
          ENQUIRE NOW
        </Link>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>

      <section className="px-[16px] lg:px-[32px] mb-[90px]">
        <div className="flex flex-col lg:flex-row w-full mt-[40px] mb-2 h-max-[550px]">
          <div className="lg:flex-3">
            <Image
              src={urlFor(data.section_5[0]?.image).url()}
              alt="img"
              height={600}
              width={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 px-[24px] py-[42px] text-white bg-[#111820]">
            <div>
              <span className="font-extrabold text-[18px]">
                {data.section_5[0].category}
              </span>
              <h3>{data.section_5[0].title}</h3>
              <span className="text-[14px] lg:text-[16px]">
                {data.section_5[0].description}
              </span>
            </div>
            <Link
              href={`/packages/${data.section_5[0].slug.current}`}
              className="bg-primary w-fit px-[16px] py-[8px] cursor-pointer"
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col lg:flex-row gap-2 items-stretch">
            <div className="border w-full lg:flex-[1] flex flex-col">
              <div className="h-[70vh]">
                <Image
                  src={urlFor(data.section_5[1]?.image).url()}
                  alt="img"
                  height={600}
                  width={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-[#111820] text-white p-5 flex flex-col flex-1">
                <p className="font-extrabold text-[18px]">
                  {data.section_5[1].category}
                </p>
                <h3>{data.section_5[1].title}</h3>
                <p className="text-[16px]">{data.section_5[1].description}</p>
                <Link
                  href={`/packages/${data.section_5[1].slug.current}`}
                  className="py-2 px-4 bg-primary mt-6 w-fit"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
            <div className="border w-full lg:flex-[2] flex flex-col">
              <div className="h-[70vh]">
                <Image
                  src={urlFor(data.section_5[2]?.image).url()}
                  alt="img"
                  height={600}
                  width={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-[#111820] text-white p-5 flex flex-col flex-1">
                <p className="font-extrabold text-[18px]">
                  {data.section_5[2].category}
                </p>
                <h3>{data.section_5[2].title}</h3>
                <p className="text-[16px]">{data.section_5[2].description}</p>
                <Link
                  href={`/packages/${data.section_5[2].slug.current}`}
                  className="py-2 px-4 bg-primary mt-6 w-fit"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 items-stretch">
            <div className="border w-full lg:flex-[2] flex flex-col">
              <div className="h-[70vh]">
                <Image
                  src={urlFor(data.section_5[3]?.image).url()}
                  alt="img"
                  height={600}
                  width={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-[#111820] text-white p-5 flex flex-col flex-1">
                <p className="font-extrabold text-[18px]">
                  {data.section_5[3]?.category}
                </p>
                <h3 className="text-2xl lg:text-3xl font-extrabold">
                  {data.section_5[3]?.title}
                </h3>
                <p className="text-[16px]">{data.section_5[3]?.description}</p>
                <Link
                  href={`/packages/${data.section_5[3].slug.current}`}
                  className="py-2 px-4 bg-primary mt-6 w-fit"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
            <div className="border w-full lg:flex-[1] flex flex-col">
              <div className="h-[70vh]">
                <Image
                  src={urlFor(data.section_5[4]?.image).url()}
                  alt="img"
                  height={500}
                  width={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-[#111820] text-white p-5 flex flex-col flex-1">
                <p className="font-extrabold text-[18px]">
                  {data.section_5[4].category}
                </p>
                <h3 className="leading-6 my-[12px]">
                  {data.section_5[4].title}
                </h3>
                <p className="text-[16px]">{data.section_5[4].description}</p>
                <Link
                  href={`/packages/${data.section_5[4].slug.current}`}
                  className="py-2 px-4 bg-primary mt-6 w-fit"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-[80vh] hidden lg:block mb-[90px] border">
        {data?.section_6_background_scroll?.type === 'video' ? (
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={data.section_6_background_scroll.video?.asset?.url}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${urlFor(
                data.section_6_background_scroll.image,
              ).url()})`,
              backgroundAttachment: 'fixed',
            }}
          />
        )}

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-white text-4xl font-bold text-center">
            {data?.section_6_background_scroll?.title}
          </h1>
          <p className="px-[112px] text-center font-semibold mt-4">
            {data?.section_6_background_scroll?.description}
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[780px]">
            <h1>{data.section_7.title}</h1>
          </div>
          <div className="lg:w-[900px]">
            <p className="text-[14px] lg:text-[16px] text-center my-[24px]">
              {data.section_7.description}
            </p>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
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

      <section className="flex flex-col lg:flex-row px-[16px] lg:px-[32px] mb-[90px] gap-2">
        <div className="w-full lg:w-[70%] min-h-full bg-black/70">
          <Image
            src={data.section_9.image.asset.url ?? '/images/dummy/img4.jpg'}
            alt="img"
            height={500}
            width={500}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-[34.5%] bg-[#111820] p-[24px] flex flex-col justify-between">
          <div>
            <h2>{data.section_9.title}</h2>
            <p className="text-white text-[16px] mt-[32px]">
              {data.section_9.description_1}
            </p>
            <p className="text-white text-[16px] mt-[32px]">
              {data.section_9.description_2}
            </p>
          </div>
          <div className="mt-[32px] flex">
            <Link
              className="bg-primary py-2 px-3 text-[20px] font-bold text-white"
              href="/travel-purpose"
            >
              {data.section_9.btn}
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

      <section className="mb-[90px] px-[32px]">
        <div className="h-[84vh] ">
          <LetsTalk
            images={data.section_13.image.asset.url}
            description={data.section_13.description}
          />
        </div>
      </section>
    </main>
  );
}
