const videos = [
  {
    title: "Ramada Hotel x United Gypsum",
    brief:
      "Executive Director Sheheryar Mustafa on choosing United Gypsum's fire-safe, seamless ceiling systems over traditional wood.",
    src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1306459131374747%2F&show_text=false&width=560&t=0",
    ratio: 560 / 314,
  },
  {
    title: "Emaar Karachi",
    brief:
      "Trusted partner on one of Pakistan's most prestigious developments, building the future of the Karachi skyline.",
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2023289808601789%2F&show_text=false&width=267&t=0",
    ratio: 267 / 476,
  },
  {
    title: "Zahid Javed Raja, former Chief Architect of Punjab",
    brief:
      "On the importance of supporting Pakistan's local manufacturers and homegrown craftsmanship.",
    src: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Funitedgypsum%2Fvideos%2F689530743076716%2F&show_text=false&width=560&t=0",
    ratio: 560 / 314,
  },
  {
    title: "Architect Zulfiqar Ali, President IAP",
    brief:
      "Endorsing United Gypsum and the case for prioritizing locally manufactured construction materials.",
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Funitedgypsum%2Fvideos%2F425656706605706%2F&show_text=false&width=267&t=0",
    ratio: 267 / 476,
  },
];

export default function InTheirWords() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <p className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
          In their words
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-grey sm:text-4xl">
          Clients and industry leaders on working with United Gypsum
        </h2>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-8 lg:flex-nowrap lg:justify-start">
          {videos.map((v) => (
            <div
              key={v.title}
              className="flex-shrink-0"
              style={{ width: `calc(20rem * ${v.ratio})` }}
            >
              <div className="relative h-80 overflow-hidden rounded-xl">
                <iframe
                  src={v.src}
                  className="absolute inset-0 h-full w-full border-0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title={v.title}
                />
              </div>
              <p className="mt-4 text-sm font-extrabold leading-snug text-grey">
                {v.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-grey">{v.brief}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
