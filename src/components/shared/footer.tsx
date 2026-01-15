/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa6';
import { FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;


  const handleRedirect = (url: string) => {
   window.open(url, "_blank", "noopener,noreferrer");
  };


  return (
    <div className="flex flex-col md:flex-row md:space-x-8 w-full bg-black py-[32px] px-[16px] md:px-[112px]">
      <div className="flex flex-col md:flex-col md:flex-1 md:space-x-6">
        <div className="size-[100px]">
          <Image
            src={data.logo.asset.url || "/logo/logo.webp"}
            alt="logo"
            height={500}
            width={500}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <p className="text-white font-bold font-sans">
            {data.newsletterTitle}
          </p>
          <p className="text-primary font-bold mt-4 text-[18px] md:text-[22px] leading-tight">
            {data.newsletterSubtitle1}
          </p>
          <div className="gap-3">
            <div className="flex gap-2 my-3">
              <Input />
              <Input />
            </div>
            <Input />
          </div>
          <p className="text-white">
            {data.newsletterSubtitle2}
          </p>
          <p className="text-white">
            {data.newsletterDescription}
          </p>
          <div className="w-full flex justify-end">
            <Button className="rounded-none text-[18px] font-bold">
              SUBSCRIBE NOW
            </Button>
          </div>
          <div className="flex my-[24px] gap-2">
            {/* <div className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaWhatsapp />
            </div> */}
            {/* <div className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaTelegram />
            </div> */}
            <div onClick={() => handleRedirect('https://www.facebook.com/profile.php?id=61572859044377')} className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaFacebookF />
            </div>
            <div onClick={() => handleRedirect('https://www.instagram.com/bornexplorer0/')} className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaInstagram />
            </div>
            <div onClick={() => handleRedirect('https://www.linkedin.com/company/bornexplorer/?viewAsMember=true')} className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaLinkedinIn />
            </div>
            <div onClick={() => handleRedirect('https://www.youtube.com/@tandin4905')} className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaYoutube />
            </div>
            <div onClick={() => handleRedirect('https://www.pinterest.com/bornexplorer0')} className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaPinterest />
            </div>
            <div onClick={() => handleRedirect('https://www.tiktok.com/@bornexplorer0')} className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaTiktok />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:flex-2 w-full md:justify-end">
        <div className="flex-1 flex flex-col md:items-center my-[20px] md:my-0">
          <div>
            <p className="text-white text-1xl font-[700] font-sans">COMPANY</p>
            <div className="flex flex-col text-white space-y-1">
              {data?.companyLinks.map(({ link, label }: {link: string, label: string}) => (
                <Link className='text-[20px]' key={label} href={link ?? '/'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:items-center flex-1 my-[20px] md:my-0">
          <div>
            <p className="text-white text-1xl font-[700] font-sans">SERVICES</p>
            <div className="flex flex-col text-white space-y-1">
              {data?.servicesLinks.map(({ link, label }: {link: string, label: string}) => (
                <Link className='text-[20px]' key={label} href={link ?? '/'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
