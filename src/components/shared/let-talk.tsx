import Link from 'next/link';

export default function LetsTalk({ images, description }: { images: string, description: string }) {

  return (
    <div
      className="w-full h-full relative flex items-center justify-end px-[32px] py-[16px]"
      style={{
        backgroundImage: `url(${images})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Slide content */}
      <div className="flex flex-col items-center justify-center relative border-t-4 border-red-700 bg-white text-black md:max-w-[70%] lg:max-w-[32%] p-4 shadow-lg h-[80%]">
        <h3 className="my-4">Let&apos;s Talk</h3>
        <p className="text-gray-700 mb-6 text-[14px] lg:text-[16px] text-center">
          
          {description}
        </p>
        <Link href="/contact-us" className="uppercase text-sm font-bold border-b-2 border-red-700 inline-block text-[16px] pb-2">
          SPEAK TO AN EXPERT
        </Link>
      </div>
    </div>
  );
}
