import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800&h=500";

const EXHIBITION_YEARS = [2024, 2025, 2026];

export default function NewsDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const n = siteCopy.newsPage;
  const navHome = siteCopy.nav[lang].home;

  const year = parseInt(slug, 10);
  const currentYear = EXHIBITION_YEARS.includes(year) ? year : EXHIBITION_YEARS[0];

  return (
    <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1650px] py-3 pt-24 md:pt-96 pb-16 font-sans bg-white">
      <SEOHead
        title={n.exhibitionTitle(currentYear)[lang]}
        description={n.exhibitionBody[lang]}
        canonical={`/news/${currentYear}`}
      />

      {/* Breadcrumb — mobile only (desktop handled by Header) */}
      <div className="md:hidden mb-6 text-[11px] text-gray-400 tracking-[0.08em] uppercase">
        <Link to="/" className="hover:text-black transition-colors">
          {navHome}
        </Link>
        {" / "}
        <Link to="/news" className="hover:text-black transition-colors">
          {n.breadcrumbCurrent[lang]}
        </Link>
        {" / "}
        <span className="text-black">{n.breadcrumbEvent[lang]}</span>
      </div>

      {/* 2-col layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

        {/* ── LEFT: article body ── */}
        <div className="flex-1 min-w-0">
          <h1
            className={`font-heading font-bold text-black text-xl md:text-[22px] leading-[1.22] tracking-[0.03em] mb-5 ${
              lang === "vi" ? "normal-case" : "uppercase"
            }`}
          >
            {n.exhibitionTitle(currentYear)[lang]}
          </h1>

          {/* Paragraphs before image */}
          <p className="text-[13px] md:text-sm text-gray-600 leading-[1.88] mb-4 text-justify hyphens-auto">
            {n.exhibitionBody[lang]}
          </p>
          <p className="text-[13px] md:text-sm text-gray-600 leading-[1.88] mb-4 text-justify hyphens-auto">
            {n.exhibitionBody[lang]}
          </p>
          <p className="text-[13px] md:text-sm text-gray-600 leading-[1.88] mb-7 text-justify hyphens-auto">
            {n.exhibitionBody[lang]}
          </p>

          {/* Large image */}
          <div className="w-full h-[240px] sm:h-[340px] md:h-[420px] bg-gray-200 overflow-hidden mb-7">
            <img
              src={PLACEHOLDER_IMG}
              alt={n.exhibitionTitle(currentYear)[lang]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Paragraphs after image */}
          <p className="text-[13px] md:text-sm text-gray-600 leading-[1.88] mb-4 text-justify hyphens-auto">
            {n.exhibitionBody[lang]}
          </p>
          <p className="text-[13px] md:text-sm text-gray-600 leading-[1.88] mb-4 text-justify hyphens-auto">
            {n.exhibitionBody[lang]}
          </p>
          <p className="text-[13px] md:text-sm text-gray-600 leading-[1.88] text-justify hyphens-auto">
            {n.exhibitionBody[lang]}
          </p>
        </div>

        {/* ── RIGHT: related news sidebar ── */}
        <div className="w-full lg:w-[260px] shrink-0">
          {EXHIBITION_YEARS.map((y, idx) => (
            <div key={y}>
              <Link to={`/news/${y}`} className="block group">
                {/* Thumbnail */}
                <div className="w-full h-[170px] bg-gray-200 overflow-hidden mb-3">
                  <img
                    src={PLACEHOLDER_IMG}
                    alt={n.exhibitionTitle(y)[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3
                  className={`font-heading font-bold text-black text-[12px] leading-[1.3] tracking-[0.03em] mb-1.5 group-hover:text-gray-500 transition-colors ${
                    lang === "vi" ? "normal-case" : "uppercase"
                  }`}
                >
                  {n.exhibitionTitle(y)[lang]}
                </h3>

                {/* Excerpt */}
                <p className="text-[11px] text-gray-500 leading-[1.75] line-clamp-3">
                  {n.exhibitionBody[lang]}
                </p>
              </Link>

              {/* Divider between items (not after last) */}
              {idx < EXHIBITION_YEARS.length - 1 && (
                <div className="border-b border-gray-200 my-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
