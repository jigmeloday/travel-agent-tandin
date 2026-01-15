/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Testimonial from './components/testimonial';
import Link from 'next/link';
import LetsTalk from '@/components/shared/let-talk';
import { client } from '@/lib/senity';
import VideoPlayer from './components/video-player';

async function Page() {
  const query = `
*[_type == "aboutPage"][0]{
  // HERO SECTION
  heroTitle,
  "heroImage": heroImage.asset->url,

  // INTRO SECTION
  introTitle,
  introParagraphs,

  // TESTIMONIALS
  testimonialsTitle,
  testimonials[]{
    quote,
    author,
    date,
    "authorImage": authorImage.asset->url
  },

  // FOUNDER SECTION
  founder{
    founderName,
    introParagraphs,
    "founderImage": founderImage.asset->url
  },

  // TEAM SECTION
  teamHeader,
  teamDescription,
  teamMembers[]{
    name,
    role,
    bio,
    "photo": photo.asset->url
  },

  // HOW IT WORKS / STEPS
  steps[]{
    title,
    description,
    "icon": icon.asset->url
  },

  // VIDEO SECTION
  videoTitle,
  videoUrl,

  // CALL TO ACTION SECTION
  ctaTitle,
  contactTitle,
  contactSubtitle,
  tagline,

  // LETS TALK
  letsTalkDescription
}
`;
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  
  return (
    <main>
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mb-[90px]">
        <Image
          src={data.heroImage}
          alt="Bespoke Journey"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-center px-4">{data.heroTitle}</h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <h1>{data.introTitle}</h1>
          </div>
          <div className="lg:w-[920px]">
            {data.introParagraphs.map((item: any, index: number) => (
              <p
                key={index}
                className="text-[14px] lg:text-[16px] text-center my-[24px]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>
      <section className="flex flex-col items-center justify-center bg-[#d3cecd] px-[16px] lg:px-[32px] w-full py-[100px] mb-[90px]">
        <h2 className="text-black/70 font-light">{data.testimonialsTitle}</h2>
        <div className="md:w-[40%] h-fit">
          <Testimonial data={data.testimonials} />
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-center justify-center px-[16px] lg:px-[32px] mb-[90px] gap-4">
        <div className="flex-1 flex justify-start md:w-[50%] h-full px-[10px]">
          <Image
            src={data.founder.founderImage}
            height={500}
            width={500}
            alt="profile"
            className="h-[70vh] w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start md:w-[50%] px-[10px]">
          <p className="text-[32px] md:text-[42px] text-black/70 font-sans">
            {data.founder.founderName}
          </p>
          <p className="text-primary text-[24px] font-bold mt-[16px]">
            Founder & Chairman
          </p>
          {data.introParagraphs.map((item: any, index: number) => (
            <p key={index} className="text-[14px] md:text-[16px] mt-[32px]">
              {item}
            </p>
          ))}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="w-full lg:w-[740px]">
            <p className="text-[32px] md:text-[52px] text-black/70 font-sans">
              {data.teamHeader}
            </p>
          </div>
          <div className="lg:w-[920px] mt-[42px]">
            <p className="text-[18px] md:text-[24px]">{data.teamDescription}</p>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="grid grid-col-1 md:grid-cols-3 gap-2">
          {data.teamMembers.map((item: any, index: number) => (
            <div key={index} className="flex flex-col items-center w-full">
              <Image
                src={item.photo}
                alt="img"
                height={400}
                width={500}
                className="w-full h-[430px] object-cover"
              />
              <div className="flex flex-col text-center items-center my-[32px] space-y-[16px]">
                <p className="text-[42px] font-sans">{item.name}</p>
                <p className="text-[28px] font-bold text-primary">
                  {item.role}
                </p>
                <p className="text-center text-[16px]">{item.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white mb-[90px]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-semibold text-gray-700 mb-16">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {data.steps.map((step: any, index: number) => (
              <div key={index} className={`flex items-start gap-6`}>
                <div>
                  <h3 className="text-gray-700">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed text-[18px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="h-screen bg-[#111820] p-[16px] md:p-[50px] flex flex-col items-center justify-center mb-[90px]">
        <h2 className="text-center text-white font-sans text-2xl mb-8">
          {data.videoTitle}
        </h2>

        <div className="w-full h-full overflow-hidden shadow-lg border border-gray-700">
         <VideoPlayer url={data.videoUrl} />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center px-[16px] lg:px-[32px] mb-[90px]">
        <div className="border-[0.5px] border-primary h-[80px] mb-[40px]" />
        <div className="flex flex-col items-center text-center">
          <div className="lg:w-[920px]">
            <p className="text-[42px] leading-[70px] font-sans text-black/60">
              {data.contactTitle} <br /> 
              {data.contactSubtitle}
            </p>
            <div className="mt-2">
              <Link
                href="/"
                className="relative text-primary font-bold text-[18px] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
              >
                 {data.tagline}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-[0.5px] border-primary h-[80px] mt-[40px]" />
      </section>
      <section className="flex flex-col items-center justify-center mb-[90px] px-[16px] lg:px-[32px] h-[84vh]">
        <LetsTalk images="/images/dummy/img1.jpg" description={data.letsTalkDescription} />
      </section>
    </main>
  );
}

export default Page;
