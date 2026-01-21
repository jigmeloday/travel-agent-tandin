/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { IconMap } from './constant/contact-us.constant';
import ContactForm from './components/form';
import { client } from '@/lib/senity';
import { urlFor } from '@/lib/senity.image';

async function Page() {
  const query = `*[_type == "contactPage"][0]{
    heroTitle,
    "heroImage": heroImage.asset->url,
    sectionTitle,
    sectionDescription,
    "sectionImage": sectionImage.asset->url,
    contactCards[]{
      title,
      description,
      icon
    }
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return (
    <main>
      <section className="h-[calc(100vh-20vh)] w-full overflow-hidden relative mb-[90px]">
        <Image
          src={urlFor(data.heroImage).url()}
          alt="Bespoke Journey"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4">
          <h1 className="text-white text-center text-3xl md:text-5xl">
            {data.heroTitle}
          </h1>
        </div>
      </section>
      <section className="flex flex-col md:flex-row px-[16px] md:px-[32px] mb-[90px] justify-center w-full">
        <div className="bg-[#111820] md:w-[42%] p-[24px]">
          <h2>{data.sectionTitle}</h2>
          <p className="text-white text-[14px] lg:text-[16px]">
            {data.sectionDescription}
          </p>
          <div>
            <ContactForm />
          </div>
        </div>
        <div className="flex-1">
          <Image
            src={urlFor(data.sectionImage).url()}
            alt=""
            height={400}
            width={500}
            className="w-full h-full"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row justify-center gap-[54px] mb-[90px]">
        {data.contactCards.map(({ title, description, icon }: any) => {
          const Icon = IconMap[icon];
          return (
            <div
              className="flex flex-col items-center md:w-[220px]"
              key={title}
            >
              <div className="size-[80px] rounded-full flex items-center justify-center bg-primary text-white">
                <Icon size={32} />
              </div>
              <p className="text-[32px] my-[32px] font-sans text-black/70">
                {title}
              </p>
              <p className="text-[18px] text-center font-sans">{description}</p>
            </div>
          );
        })}
      </section>
      <section className="h-[80vh] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.076141287622!2d89.65878119999999!3d27.435737699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e19386a524692f%3A0x14778b2ec83e8cb8!2sBorn%20Explorer!5e0!3m2!1sen!2sbt!4v1768461525105!5m2!1sen!2sbt"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}

export default Page;
