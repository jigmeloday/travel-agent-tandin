/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa6';
import { FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

function Footer() {
  const [data, setData] = useState<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  const handleRedirect = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const result = await res.json();

    if (result.success) {
      alert('Subscribed successfully!');
      reset(); // clear the form
    } else {
      alert(result.error || 'Failed to subscribe');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-8 w-full bg-black py-[32px] px-[16px] md:px-[112px]">
      <div className="flex flex-col md:flex-col md:flex-1 md:space-x-6">
        <div className="size-[100px]">
          <Image
            src={data.logo.asset.url || '/logo/logo.webp'}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gap-3">
              <div className="flex gap-2 my-3">
                <div>
                  <Input
                    placeholder="First Name"
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className='mb-2'>
                <Input
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <p className="text-white">{data.newsletterSubtitle2}</p>
            <p className="text-white">{data.newsletterDescription}</p>
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="rounded-none text-[18px] font-bold"
                disabled={isSubmitting}
              >
                SUBSCRIBE NOW
              </Button>
            </div>
          </form>
          <div className="flex my-[24px] gap-2">
            {/* <div className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaWhatsapp />
            </div> */}
            {/* <div className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer">
              <FaTelegram />
            </div> */}
            <div
              onClick={() =>
                handleRedirect(
                  'https://www.facebook.com/profile.php?id=61572859044377'
                )
              }
              className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaFacebookF />
            </div>
            <div
              onClick={() =>
                handleRedirect('https://www.instagram.com/bornexplorer0/')
              }
              className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaInstagram />
            </div>
            <div
              onClick={() =>
                handleRedirect(
                  'https://www.linkedin.com/company/bornexplorer/?viewAsMember=true'
                )
              }
              className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaLinkedinIn />
            </div>
            <div
              onClick={() =>
                handleRedirect('https://www.youtube.com/@tandin4905')
              }
              className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaYoutube />
            </div>
            <div
              onClick={() =>
                handleRedirect('https://www.pinterest.com/bornexplorer0')
              }
              className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <FaPinterest />
            </div>
            <div
              onClick={() =>
                handleRedirect('https://www.tiktok.com/@bornexplorer0')
              }
              className="size-[32px] md:size-[42px] bg-white rounded-full flex items-center justify-center cursor-pointer"
            >
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
              {data?.companyLinks.map(
                ({ link, label }: { link: string; label: string }) => (
                  <Link className="text-[20px]" key={label} href={link ?? '/'}>
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:items-center flex-1 my-[20px] md:my-0">
          <div>
            <p className="text-white text-1xl font-[700] font-sans">SERVICES</p>
            <div className="flex flex-col text-white space-y-1">
              {data?.servicesLinks.map(
                ({ link, label }: { link: string; label: string }) => (
                  <Link className="text-[20px]" key={label} href={link ?? '/'}>
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
