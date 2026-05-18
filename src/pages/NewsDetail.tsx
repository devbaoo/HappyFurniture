import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { newsService } from "../services/news.service";
import type { ContentBlock, NewsDetail as NewsDetailType, NewsListItem } from "../services/api";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800&h=500";

function ContentBlockRenderer({ block, lang }: { block: ContentBlock; lang: string }) {
  const title = lang === "vi" ? block.titleVi : (block.titleEn || block.titleVi);
  const content = lang === "vi" ? block.contentVi : (block.contentEn || block.contentVi);
  const title2 = lang === "vi" ? block.title2Vi : (block.title2En || block.title2Vi);
  const content2 = lang === "vi" ? block.content2Vi : (block.content2En || block.content2Vi);

  // ── TextColumns: 2 cột văn bản song song ──────────────────────────────────
  if (block.type === "TextColumns") {
    const hasLeft = title || content;
    const hasRight = title2 || content2;
    if (!hasLeft && !hasRight) return null;
    return (
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        {/* Cột trái */}
        <div className="flex-1">
          {title && (
            <h2 className="font-heading font-bold text-lg md:text-xl leading-[1.3] tracking-[0.03em] mb-3 text-[#3c4a28]">
              {title}
            </h2>
          )}
          {content && (
            <div className="prose prose-sm max-w-none text-gray-600 leading-[1.88] text-justify hyphens-auto prose-headings:font-heading prose-headings:text-[#3c4a28] prose-strong:text-gray-800 prose-a:text-[#3c4a28]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        {/* Đường kẻ giữa */}
        <div className="hidden sm:block w-px bg-gray-200 self-stretch" />
        {/* Cột phải */}
        <div className="flex-1">
          {title2 && (
            <h2 className="font-heading font-bold text-lg md:text-xl leading-[1.3] tracking-[0.03em] mb-3 text-[#3c4a28]">
              {title2}
            </h2>
          )}
          {content2 && (
            <div className="prose prose-sm max-w-none text-gray-600 leading-[1.88] text-justify hyphens-auto prose-headings:font-heading prose-headings:text-[#3c4a28] prose-strong:text-gray-800 prose-a:text-[#3c4a28]">
              <ReactMarkdown>{content2}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── ImageColumns: 2 ảnh song song ─────────────────────────────────────────
  if (block.type === "ImageColumns") {
    const alt1 = (lang === "vi" ? block.imageAltVi : block.imageAltEn) || title || "";
    const alt2 = (lang === "vi" ? block.image2AltVi : block.image2AltEn) || title2 || "";
    const caption1 = title;
    const caption2 = title2;
    const hasLeft = block.imageUrl;
    const hasRight = block.image2Url;
    if (!hasLeft && !hasRight) return null;
    return (
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Ảnh trái */}
        <div className="flex-1">
          {block.imageUrl ? (
            <div className="overflow-hidden rounded-sm">
              <img
                src={block.imageUrl}
                alt={alt1}
                className="w-full h-auto max-h-[400px] object-cover"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" /></svg>
            </div>
          )}
          {caption1 && (
            <p className="mt-2 text-xs text-gray-500 text-center italic">{caption1}</p>
          )}
        </div>
        {/* Ảnh phải */}
        <div className="flex-1">
          {block.image2Url ? (
            <div className="overflow-hidden rounded-sm">
              <img
                src={block.image2Url}
                alt={alt2}
                className="w-full h-auto max-h-[400px] object-cover"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" /></svg>
            </div>
          )}
          {caption2 && (
            <p className="mt-2 text-xs text-gray-500 text-center italic">{caption2}</p>
          )}
        </div>
      </div>
    );
  }

  // ── Image với bố cục trái/phải/full ──────────────────────────────────────
  if (block.type === "Image") {
    const position: "full" | "left" | "right" =
      block.imagePosition ?? (block.isFullWidth ? "full" : "full");
    const alt = (lang === "vi" ? block.imageAltVi : block.imageAltEn) || title || "";
    const imgSrc = block.imageUrl ?? "";

    if ((position === "left" || position === "right") && imgSrc) {
      return (
        <div className={`flex flex-col sm:flex-row sm:items-start gap-5 mb-6 ${position === "right" ? "sm:flex-row-reverse" : ""}`}>
          <div className="sm:w-[45%] shrink-0 overflow-hidden rounded-sm">
            <img
              src={imgSrc}
              alt={alt}
              className="w-full h-auto max-h-[360px] object-cover"
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
            />
          </div>
          {(title || content) && (
            <div className="flex flex-col flex-1">
              {title && (
                <h2 className="font-heading font-bold text-lg md:text-xl leading-[1.3] tracking-[0.03em] mb-3 text-[#3c4a28]">
                  {title}
                </h2>
              )}
              {content && (
                <div className="prose prose-sm max-w-none text-gray-600 leading-[1.88] text-justify hyphens-auto prose-headings:font-heading prose-headings:text-[#3c4a28] prose-strong:text-gray-800 prose-a:text-[#3c4a28]">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    if (imgSrc) {
      return (
        <div className="w-full bg-gray-200 overflow-hidden mb-6">
          <img
            src={imgSrc}
            alt={alt}
            className="w-full object-cover h-[300px] sm:h-[400px] md:h-[500px]"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
          />
        </div>
      );
    }

    if (!title && !content) return null;
  }

  // ── Text block (mặc định) ─────────────────────────────────────────────────
  return (
    <div className="mb-6">
      {title && (
        <h2 className="font-heading font-bold text-lg md:text-xl leading-[1.3] tracking-[0.03em] mb-3 text-[#3c4a28]">
          {title}
        </h2>
      )}
      {content && (
        <div className="prose prose-sm max-w-none text-gray-600 leading-[1.88] text-justify hyphens-auto prose-headings:font-heading prose-headings:text-[#3c4a28] prose-strong:text-gray-800 prose-a:text-[#3c4a28]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default function NewsDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const n = siteCopy.newsPage;
  const navHome = siteCopy.nav[lang].home;

  const [newsItem, setNewsItem] = useState<NewsDetailType | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsListItem[]>([]);
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
        const allNewsItems = [...allNews.news, ...allNews.companyActivities];
        const related = allNewsItems.filter((item) => item.slug !== slug).slice(0, 3);
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
  const metaTitle = lang === "vi" ? newsItem.metaTitleVi : (newsItem.metaTitleEn || title);
  const metaDescription = lang === "vi" ? newsItem.metaDescriptionVi : (newsItem.metaDescriptionEn || (lang === "vi" ? newsItem.excerptVi : newsItem.excerptEn));

  const displayImage = newsItem.bannerUrl || newsItem.imageUrl;

  const sortedBlocks = [...(newsItem.contentBlocks || [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="w-full bg-white font-sans">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
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
              className={`font-heading font-bold text-black text-xl md:text-[22px] leading-[1.22] tracking-[0.03em] mb-2 ${
                lang === "vi" ? "normal-case" : "uppercase"
              }`}
            >
              {title}
            </h1>
            <p className="text-xs text-gray-400 mb-5 tracking-wide">
              {new Date(newsItem.createdAt).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Banner / Hero Image */}
            {displayImage && (
              <div className="w-full h-[240px] sm:h-[340px] md:h-[420px] bg-gray-200 overflow-hidden mb-7">
                <img
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                />
              </div>
            )}

            {/* Content Blocks */}
            {sortedBlocks.length > 0 ? (
              <div className="space-y-2">
                {sortedBlocks.map((block) => (
                  <ContentBlockRenderer key={block.id} block={block} lang={lang} />
                ))}
              </div>
            ) : (
              <div className="text-[13px] md:text-sm text-gray-400 leading-[1.88]">
                {lang === "vi" ? "Nội dung đang được cập nhật..." : "Content is being updated..."}
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
                      alt={lang === "vi" ? item.titleVi : item.titleEn || item.titleVi}
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
                  <p className="text-[10px] text-gray-400 mb-1 tracking-wide">
                    {new Date(item.createdAt).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-[1.75] line-clamp-3">
                    {lang === "vi" ? item.excerptVi : item.excerptEn}
                  </p>
                </Link>
                {idx < relatedNews.length - 1 && (
                  <div className="border-b border-gray-200 my-5" />
                )}
              </div>
            ))}

            {relatedNews.length === 0 && (
              <div className="text-gray-400 text-sm">
                {lang === "vi" ? "Không có tin liên quan" : "No related news"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
