export type BlogCategory = "Gypsum Products" | "General Blog";

export interface Blog {
  slug: string;
  title: string;
  category: BlogCategory;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  featuredImage: string;
  excerpt: string;
}

/**
 * Seed data from the saved blog listing (page 1 of 4). Full post bodies and
 * listing pages 2-4 are a later pass; get the remaining source files from the
 * client. `LatestBlogs` on the homepage renders the newest three.
 */
export const blogs: Blog[] = (
  [
    {
      slug: "buy-smart-bead-corner-bead-tape-in-pakistan",
      title: "Buy Smart Bead Corner Bead Tape in Pakistan",
      category: "Gypsum Products",
      date: "2024-11-13",
      featuredImage: "/images/Buy-Smart-Bead-Corner-Bead-Tape-in-Pakistan.jpg",
      excerpt:
        "Where to source paper-faced metal corner bead that keeps drywall edges crack-free through everyday wear.",
    },
    {
      slug: "top-10-gypsum-ceiling-designs-in-pakistan",
      title: "Top 10 Gypsum Ceiling Designs in Pakistan",
      category: "Gypsum Products",
      date: "2024-10-14",
      featuredImage: "/images/Top-10-Gypsum-Ceiling-Designs-in-Pakistan-.jpg",
      excerpt:
        "Ten ceiling treatments, from coffered layouts to floating islands, and the systems that build them.",
    },
    {
      slug: "transform-cinemas-and-halls-with-smart-grid-38-ceilings-in-karachi",
      title: "Transform Cinemas and Halls With Smart Grid 38 Ceilings in Karachi",
      category: "Gypsum Products",
      date: "2024-09-27",
      featuredImage: "/images/UG-Blog-Image-scaled.jpg",
      excerpt:
        "Why the interlocked Smart Grid 38 T-bar suits auditoriums, cinema halls and other large spans.",
    },
    {
      slug: "how-smart-gypsum-board-revolutionizes-interior-design-in-karachi",
      title: "How Smart Gypsum Board Revolutionizes Interior Design in Karachi",
      category: "General Blog",
      date: "2024-08-26",
      featuredImage: "/images/How-Smart-Gypsum-Board-scaled.jpg",
      excerpt:
        "Lightweight partitions, curved walls and quick dry-lining, and what gypsum board changes on site.",
    },
    {
      slug: "enhance-your-drywall-finishing-with-premium-bead-tape-in-karachi",
      title: "Enhance Your Drywall Finishing with Premium Bead Tape in Karachi",
      category: "General Blog",
      date: "2024-08-20",
      featuredImage: "/images/Blog-Cover-Image-scaled.jpg",
      excerpt:
        "Being a thriving metropolis with rich cultural diversity, Karachi is a testament to human ingenuity and aspiration.",
    },
    {
      slug: "ceiling-grid-systems-for-industrial-facilities-in-pakistan",
      title: "Ceiling Grid Systems for Industrial Facilities in Pakistan",
      category: "General Blog",
      date: "2024-08-13",
      featuredImage: "/images/Cover-Image-a-scaled.jpg",
      excerpt:
        "Pakistan's industrial landscape, once a dynamic canvas of productive efficiency, now faces an obscure challenge.",
    },
    {
      slug: "best-joints-covering-tape-for-drywall-panels-in-pakistan",
      title: "Best Joints Covering Tape for Drywall Panels in Pakistan",
      category: "General Blog",
      date: "2024-08-08",
      featuredImage: "/images/Cover-1-scaled.jpg",
      excerpt:
        "In a typical Pakistani interior, freshly painted walls stand as symbols of perfection: smooth and seamless.",
    },
    {
      slug: "ceiling-grid-systems-for-warehouses-in-pakistan",
      title: "Ceiling Grid Systems for Warehouses in Pakistan",
      category: "General Blog",
      date: "2024-08-07",
      featuredImage: "/images/UG-Blog-Cover-Image-scaled.jpg",
      excerpt:
        "Warehouses are the lifeblood of Pakistan's economy: high-functioning spaces that hold the supply chain together.",
    },
    {
      slug: "best-wall-crack-filler-in-pakistan",
      title: "Best Wall Crack Filler in Pakistan",
      category: "General Blog",
      date: "2024-07-25",
      featuredImage: "/images/blog-wall-crack-filler.jpeg",
      excerpt:
        "Choosing a ready-mixed joint filler that dries hard, sands smooth and takes paint without shrinking back.",
    },
    {
      slug: "ceiling-grid-systems-for-offices-in-pakistan",
      title: "Ceiling Grid Systems for Offices in Pakistan",
      category: "General Blog",
      date: "2024-07-25",
      featuredImage: "/images/blog-ceiling-grid-offices.jpeg",
      excerpt:
        "Lay-in grid ceilings give offices serviceable access to lighting, HVAC and cabling above the tiles.",
    },
  ] as Blog[]
).sort((a, b) => (a.date < b.date ? 1 : -1));

export const latestBlogs = blogs.slice(0, 3);
