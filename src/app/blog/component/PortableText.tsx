/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { urlFor } from '@/lib/senity.image'; // your Sanity image builder

export const ComponentsBlock = {
  block: {
    normal: ({ children }: any) => <p className="mb-6">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mb-2">{children}</h3>,
  },
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-6 relative w-full h-[450px] grid grid-cols-2">
          <Image
            src={urlFor(value).url()} // converts Sanity image to URL
            alt={value.alt || 'Blog Image'}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};
