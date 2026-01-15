/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false); // <-- Sheet open state
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/header')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 100);

      if (currentScrollY > lastScrollY && currentScrollY > 750) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // function to close Sheet on link click
  const handleLinkClick = () => setOpen(false);
  if (!data) return null;

  return (
    <div
      className={`fixed w-full px-[16px] py-[24px] flex justify-between items-center 
        transition-all duration-300 z-50 bg-transparent 
        ${scrolled ? 'shadow-2xl bg-white' : 'bg-transparent'}
        ${hidden ? '-translate-y-full' : 'translate-y-0'}
      `}
    >
      <Link
        href="/"
        className="flex lg:justify-center items-center w-full text-white h-full cursor-pointer"
      >
        {!scrolled ? (
          <Image
            src="/logo/logo2.png"
            alt="logo"
            height={1000}
            width={1000}
            className="size-[50px] object-contain"
          />
        ) : (
          <Image
            src="/logo/logo1.png"
            alt="logo"
            height={1000}
            width={1000}
            className="size-[50px] object-contain"
          />
        )}
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="cursor-pointer">
          <Menu
            size={40}
            className={scrolled ? 'text-primary ' : 'text-white'}
          />
        </SheetTrigger>
        <SheetContent side="top" className="h-screen">
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <ScrollArea className="h-full overflow-scroll">
            <div className="flex-1 overflow-y-auto  flex flex-col items-center justify-center h-full w-full">
              <div className="flex flex-col items-center max-w-[640px] h-full">
                <Link
                  onClick={handleLinkClick}
                  href="/"
                  className="flex flex-col items-center justify-center mb-8"
                >
                  <Image
                    src="/logo/logo1.png"
                    alt="logo"
                    height={1000}
                    width={1000}
                    className="size-[80px] object-contain "
                  />
                  <span className="playfair-sans">Born Explorer</span>
                </Link>
                <div className="flex flex-col items-center">
                  {data.mainLinks.map(
                    ({ label, link }: { label: string; link: string }) => (
                      <Link
                        key={label}
                        href={link ?? '/'}
                        className="text-[26px] font-medium hover:text-primary transition playfair-sans mb-[5px] py-2"
                        onClick={handleLinkClick}
                      >
                        {label}
                      </Link>
                    )
                  )}
                  <p className="text-[26px] playfair-sans mb-[5px] py-2">
                    Our platforms
                  </p>
                  <div className="text-[16px] font-[500] flex flex-col items-center justify-center playfair-sans">
                    {data.platforms.map(
                      ({ link, label }: { link: string; label: string }) => (
                        <Link
                          key={label}
                          href={link ?? '/'}
                          className="hover:text-primary transition"
                          onClick={handleLinkClick}
                        >
                          {label}
                        </Link>
                      )
                    )}
                  </div>
                  <p className="text-[26px] playfair-sans my-[5px] py-2">
                    Trip types
                  </p>
                  <div className="text-[16px] gap-3 font-[500] grid md:grid-cols-3 text-center items-center justify-items-center playfair-sans my-[5px]">
                    {data.packageLink.map(
                      ({ title, slug }: { title: string; slug: string }) => (
                        <Link
                          key={title}
                          href={`/packages/${slug}`}
                          className="hover:text-primary transition px-4 md:leading-[20px] md:border-r-[2.5px] flex items-center"
                          onClick={handleLinkClick}
                        >
                          {title}
                        </Link>
                      )
                    )}
                  </div>
                  {data.otherLink?.map(({ label, link }: { link: string, label: string }) => (
                    <Link
                      key={label}
                      href={link ?? '/'}
                      className="text-[26px] font-medium hover:text-primary transition playfair-sans mt-[18px] py-2"
                      onClick={handleLinkClick}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Header;
