/* eslint-disable @typescript-eslint/no-explicit-any */
import { urlFor } from '@/lib/senity.image';
import Image from 'next/image';
import Link from 'next/link';

function ImageBox({
  image,
  label,
  subtitle,
  slug
}: {
  image: string;
  label: string;
  subtitle?: string;
  slug: any
}) {

  return (
    <Link href={`/${slug?.current ?? slug }`} className="relative border aspect-square overflow-hidden group cursor-pointer">

      <Image
        src={urlFor(image).url()}
        alt="image"
        height={500}
        width={500}
        className="object-cover h-full w-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 hover:bg-black/80 transition-all duration-500 ease-in-out flex flex-col items-center justify-center">
        <div className="text-center ">
          <span className="text-white text-[18px] font-bold">{label}</span>
          <div className="border-b-2 border-transparent group-hover:border-white transition-all duration-300" />
          <p className="text-primary font-bold text-[16px]">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default ImageBox;
