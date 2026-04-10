import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { newsService } from "../services/news.service";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800&h=500";

export default function NewsDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const n = siteCopy.newsPage;
  const navHome = siteCopy.nav[lang].home;

  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const [detail, allNews] = await Promise.all([
          newsService.getBySlug(slug),
          newsService.getActiveNews(),
        ]);
        setNewsItem(detail);
        const allEvents = allNews.events;
        const related = allEvents.filter((item) => item.slug !== slug).slice(0, 3);
        setRelatedNews(related);
      } catch (err) {
        console.error("Failed to load news detail:", err);
        setError("Unable to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full bg-white font-sans">
        <PageBreadcrumb
          items={[
            { label: navHome, to: "/" },
            { label: n.breadcrumbCurrent[lang], to: "/news" },
            { label: "..." },
          ]}
        />
        <div className="mx-auto w-full max-w-[1650px] px-2 py-3 pb-16 md:px-14 md:py-4 lg:px-24">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3c4a28] border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="w-full bg-white font-sans">
        <PageBreadcrumb
          items={[
            { label: navHome, to: "/" },
            { label: n.breadcrumbCurrent[lang], to: "/news" },
            { label: "Error" },
          ]}
        />
        <div className="mx-auto w-full max-w-[1650px] px-2 py-3 pb-16 md:px-14 md:py-4 lg:px-24">
          <p className="text-center text-gray-500 py-12">{error || "News not found"}</p>
        </div>
      </div>
    );
  }

  const title = lang === "vi" ? newsItem.titleVi : (newsItem.titleEn || newsItem.titleVi);
  const content = lang === "vi" ? newsItem.contentVi : (newsItem.contentEn || newsItem.contentVi);

  return (
    <div className="w-full bg-white font-sans">
      <SEOHead
        title={title}
        description={lang === "vi" ? newsItem.excerptVi : newsItem.excerptEn}
        canonical={`/news/${slug}`}
      />
      <PageBreadcrumb
        items={[
          { label: navHome, to: "/" },
          { label: n.breadcrumbCurrent[lang], to: "/news" },
          { label: title },
        ]}
      />

      <div className="mx-auto w-full max-w-[1650px] px-2 py-3 pb-16 md:px-14 md:py-4 lg:px-24">

        {/* 2-col layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* LEFT: article body */}
          <div className="flex-1 min-w-0">
            <h1
              className={`font-heading font-bold text-black text-xl md:text-[22px] leading-[1.22] tracking-[0.03em] mb-5 ${
                lang === "vi" ? "normal-case" : "uppercase"
              }`}
            >
              {title}
            </h1>

            {/* Image */}
            {newsItem.imageUrl && (
              <div className="w-full h-[240px] sm:h-[340px] md:h-[420px] bg-gray-200 overflow-hidden mb-7">
                <img
                  src={newsItem.imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                />
              </div>
            )}

            {/* Content */}
            {content ? (
              <div
                className="text-[13px] md:text-sm text-gray-600 leading-[1.88] text-justify hyphens-auto"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="text-[13px] md:text-sm text-gray-400 leading-[1.88]">
                {lang === "vi" ? "Noi dung dang duoc cap nhat..." : "Content is being updated..."}
              </div>
            )}
          </div>

          {/* RIGHT: related news sidebar */}
          <div className="w-full lg:w-[260px] shrink-0">
            {relatedNews.map((item, idx) => (
              <div key={item.id}>
                <Link to={`/news/${item.slug}`} className="block group">
                  <div className="w-full h-[170px] bg-gray-200 overflow-hidden mb-3">
                    <img
                      src={item.imageUrl || PLACEHOLDER_IMG}
                      alt={lang === "vi" ? item.titleVi : item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                    />
                  </div>
                  <h3
                    className={`font-heading font-bold text-black text-[12px] leading-[1.3] tracking-[0.03em] mb-1.5 group-hover:text-gray-500 transition-colors ${
                      lang === "vi" ? "normal-case" : "uppercase"
                    }`}
                  >
                    {lang === "vi" ? item.titleVi : (item.titleEn || item.titleVi)}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-[1.75] line-clamp-3">
                    {lang === "vi"
                      ? (item.excerptVi || item.contentVi)
                      : (item.excerptEn || item.contentEn)}
                  </p>
                </Link>
                {idx < relatedNews.length - 1 && (
                  <div className="border-b border-gray-200 my-5" />
                )}
              </div>
            ))}

            {relatedNews.length === 0 && (
              <div className="text-gray-400 text-sm">
                {lang === "vi" ? "Khong co tin lien quan" : "No related news"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
