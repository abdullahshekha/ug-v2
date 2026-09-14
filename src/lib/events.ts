/**
 * Events and exhibitions United Gypsum has taken part in. Photos for IAPEX
 * 2025 and 2026 were sourced from the official United Gypsum Facebook page
 * (facebook.com/unitedgypsum) with the client's direction, and live in
 * public/images/events/<slug>/. Build Asia Expo 2017's 4 photos were pulled
 * from the old WordPress site's "Our efforts for sustainable drywall
 * construction" page (its Build Asia Expo 2017 banner grid): 2 were already
 * saved locally in that page's _files/ folder, and 2 more (referenced only
 * via inline CSS background-image, so the original page-save snapshot never
 * fetched them) were still live at their original wp-content/uploads URLs.
 */

export interface Event {
  slug: string;
  name: string;
  date: string;
  location: string;
  summary: string;
  highlights: string[];
  imageCount: number;
}

export const events: Event[] = [
  {
    slug: "iapex-2026",
    name: "IAPEX 2026",
    date: "February 2026",
    location: "Karachi",
    summary:
      "United Gypsum exhibited its Smart Gypsum range at IAPEX 2026 in Karachi, showing architects, designers and builders how gypsum boards, tiles and accessories can turn ordinary ceilings and walls into statement designs.",
    highlights: [
      "Three days on the show floor meeting architects, designers and builders",
      "Live displays across the Smart Gypsum Board, Ceiling Panel and accessories range",
      "Strong visitor engagement and enquiries from the design and construction community",
    ],
    imageCount: 5,
  },
  {
    slug: "iapex-2025",
    name: "IAPEX 2025",
    date: "December 2025",
    location: "Lahore",
    summary:
      "United Gypsum took part in IAPEX Lahore 2025 across all three days of the expo, showcasing the Smart Gypsum range to sustained visitor interest at its stall.",
    highlights: [
      "Day 1: launched the Smart Gypsum Range to a strong opening turnout",
      "Day 2: continued visitor interest built on strong early momentum",
      "Day 3: sustained interest in the Smart Gypsum Range through to the close of the expo",
    ],
    imageCount: 15,
  },
  {
    slug: "build-asia-expo-2017",
    name: "Build Asia Expo 2017",
    date: "2017",
    location: "Karachi Expo Centre",
    summary:
      "United Gypsum exhibited its full product range and shared the advantages of gypsum systems with architects, contractors and specifiers from across the country.",
    highlights: [
      "A full-scale branded stand showcasing Smart Gypsum Board and the wider product range",
      "Live demonstrations of board installation for visiting architects and contractors",
      "Branded giveaways and literature for attendees at the Karachi Expo Centre",
    ],
    imageCount: 4,
  },
];

export function eventImages(slug: string, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/events/${slug}/${i + 1}.jpg`,
    alt: `United Gypsum at ${slug.replace(/-/g, " ")}, photo ${i + 1}`,
  }));
}
