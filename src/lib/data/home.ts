import { Headphones, Mail, Plane, Search } from 'lucide-react';
import { FLAGSHIP } from './shared/flag-ship.data';
import { SWAPPER_DATA } from './shared/swapper.data';
import { TOUR_TYPE } from './shared/tour-type.data';

export const HOME_DATA = {
  hero_swapper: SWAPPER_DATA,
  section_1: {
    title: 'Where Nature Meets Nirvana',
    description:
      'Every journey is crafted entirely around you, blending seamless planning with rare, meaningful encounters. Each experience unfolds with thoughtful detail—from the first welcome to the quiet moments in nature—creating memories that linger long after you return home and leaving a gentle, positive imprint on the places you visit.',
    tag_line: 'EVERY JOURNEY TELLS A STORY – FIND THE ONE THAT’S YOURS',
  },
  section_2: TOUR_TYPE,
  section_3: FLAGSHIP,
  section_4: {
    title: 'From Dream to Departure',
    desctiption:
      'Every remarkable journey begins with a single step. Our simple, seamless process ensures your Bhutan experience is perfectly tailored, effortless, and unforgettable—from first inquiry to the moment you depart.',
    items: [
      {
        id: 1,
        icon: Search,
        title: 'Make an Enquiry',
        description:
          'Submit your travel request online or by phone—let us know your dreams, preferences, and travel dates.',
      },
      {
        id: 2,
        icon: Headphones,
        title: 'Speak to an Expert',
        description:
          'Connect with your dedicated Travel Specialist to discuss your vision, fine-tune details, and craft your personalized itinerary.',
      },
      {
        id: 3,
        icon: Mail,
        title: 'Receive a Quote',
        description:
          'We design your bespoke holiday and provide a detailed quote, ensuring every experience meets your expectations.',
      },
      {
        id: 4,
        icon: Plane,
        title: 'Book Your Trip',
        description:
          'Once everything is perfectly tailored to your wishes, we confirm your booking and prepare you for an unforgettable journey.',
      },
    ],
    button_text: 'ENQUIRE NOW',
    button_link: 'contact-us',
  },
  section_5: 'Packages goes here ',
  section_6_background_scroll: {
    image: '/images/dummy/img10.jpg',
    title: 'A Journey Beyond Expectations',
    description: 'Discover Bhutan in ways few travelers ever experience. Our carefully curated journeys reveal hidden valleys, sacred monasteries, and intimate cultural encounters that create lasting memories and meaningful connections to this extraordinary kingdom.',
  },
  section_7: {
    title: 'We don’t just promise—we deliver every detail',
    description:
      'Every adventure is led by experts who know the land intimately, granting access to rare moments and authentic encounters. Here, each step creates lasting memories, and every journey deepens your connection to this extraordinary kingdom.',
  },
  section_8: [
    {
      id: 1,
      image: '/images/dummy/img6.jpg',
      title: 'BHUTAN IN THE CLOUD',
      subtitle: 'Above the ordinary',
    },
    {
      id: 2,
      image: '/images/dummy/img5.jpg',
      title: 'BHUTAN THROUGH THE LENS',
      subtitle: 'Capture the extraordinary',
    },
    {
      id: 3,
      image: '/images/dummy/img3.jpg',
      title: 'CULINARY TAPESTRY',
      subtitle: 'Savor the sublime',
    },
    {
      id: 4,
      image: '/images/dummy/img11.jpg',
      title: 'RIVER RAFTING',
      subtitle: 'Heritage in full color',
    },
    {
      id: 5,
      image: '/images/dummy/img2.jpg',
      title: 'EDUCATION TOUR',
      subtitle: 'Enrich your journey',
    },
    {
      id: 6,
      image: '/images/dummy/img7.jpg',
      title: 'FUTURE TRAVEL',
      subtitle: 'Bhutan, reimagined',
    },
  ],
  section_9: {
    image: '/images/dummy/img10.jpg',
    title: 'TRAVEL WITH PURPOSE',
    description_1:
      'At Born Explorer, we believe every journey should enrich both traveler and destination. By embracing sustainable practices, respecting local cultures, and supporting communities, we ensure your Bhutan experience leaves a positive footprint.',
    description_2:
      'Travel consciously, discover authentically, and create memories that honor the land, its people, and its timeless traditions.',
    btn: 'View details',
  },
  section_10: [
    {
      img: '/images/dummy/img10.jpg',
      id: 1,
      title: 'UNIQUE TO YOU',
      subtitle: 'WHY BORN EXPLORER',
      description:
        "We listen to your travel goals and craft unique trips that are bespoke to you. We’re with you every step of your life's travel journey, from honeymoons to family trips and beyond.",
      cta: 'SPEAK TO AN EXPERT',
    },
    {
      id: 2,
      img: '/images/dummy/img9.jpg',
      title: 'ADVENTURE AWAITS',
      subtitle: 'WHY CHOOSE US',
      description:
        'Tailored adventures that connect you with the world. Experience moments you’ll never forget.',
      cta: 'START YOUR JOURNEY',
    },
  ],
  section_11: [
    {
      id: 1,
      image: '/images/dummy/img6.jpg',
      label: 'MONASTIC SERENITY',
      subtitle: 'Above the ordinary',
    },
    {
      id: 2,
      image: '/images/dummy/img5.jpg',
      label: 'FESTIVALS IN FULL COLOR',
      subtitle: 'Capture the extraordinary',
    },
    {
      id: 3,
      image: '/images/dummy/img3.jpg',
      label: 'HIDDEN WILDERNESS',
      subtitle: 'Savor the sublime',
    },
  ],
  section_12: [
    {
      id:1,
      title: 'Bhutan Birding',
      image: '/images/dummy/img3.jpg'
    },
    {
      id: 2,
      title: 'Curated Adventure',
      image: 'curated-bhutan-birding'
    }
  ],
  section_13: {
    title: 'lets Talk',
    description: 'For decades, our team has been crafting journeys that go beyond the ordinary. Share your dream destination and your passions with us, and we’ll design a one-of-a-kind adventure that’s truly yours—a journey you’ll remember for a lifetime.',
    btn_text: 'Speak to experts'
  }
};
