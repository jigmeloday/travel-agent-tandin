/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, MailOpen, MapPin, Phone } from 'lucide-react';

export const CONTACT_US=[
  {
    title: 'Head Office',
    description: 'Every great journey begins with a simple hello.',
    icon: MapPin
  },
  {
    title: 'Email Address',
    description: 'Every great journey begins with a simple hello.',
    icon: MailOpen
  },
  {
    title: 'Phone Call',
    description: 'Every great journey begins with a simple hello.',
    icon: Phone
  }
]


export const IconMap: Record<string, any> = {
  mail: MailOpen,
  phone: Phone,
  location: MapPin,
};