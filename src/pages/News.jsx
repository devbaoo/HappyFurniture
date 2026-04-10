import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import useScrollAnimation from "../hooks/useScrollAnimation";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { newsService } from "../services/news.service";

const PLACEHOLDER_IMG_EVENT =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400";
const PLACEHOLDER_IMG_ACTIVITY =
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=200&h=150";

const News = () => {
  const { lang } = useLanguage();
  const n = siteCopy.newsPage;
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const visibleElements = useScrollAnimation([newsData]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getActiveNews();
        setNewsData(data);
      } catch (err) {
        console.error("Failed to load news:", err);
        setError("Unable to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white font-sans">
        <PageBreadcrumb
          items={[
            { label: siteCopy.nav[lang].home, to: "/" },
            { label: siteCopy.nav[lang].news },
          ]}
        />
        <div className="mx-auto w-full max-w-[1650px] px-2 py-3 md:px-14 lg:px-24 md:py-4 relative">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3c4a28] border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="w-full bg-white font-sans">
        <PageBreadcrumb
          items={[
            { label: siteCopy.nav[lang].home, to: "/" },
            { label: siteCopy.nav[lang].news },
          ]}
        />
        <div className="mx-auto w-full max-w-[1650px] px-2 py-3 md:px-14 lg:px-24 md:py-4 relative">
          <p className="text-center text-gray-500 py-12">
            {error || "Unable to load news"}
          </p>
        </div>
      </div>
    );
  }

  const { events, activities } = newsData;

  return (
    <div className="w-full bg-white font-sans">
      <SEOHead
        title="News"
        description="Latest news, updates, and exhibition highlights from Happy Furniture."
        canonical="/news"
      />
      <PageBreadcrumb
        items={[
          { label: siteCopy.nav[lang].home, to: "/" },
          { label: siteCopy.nav[lang].news },
        ]}
      />

      <div className="mx-auto w-full max-w-[1650px] px-2 py-3 md:px-14 lg:px-24 md:py-4 relative">
        {/* EVENTS SECTION */}
        <section className="mb-6 md:mb-7 pt-1" data-animate id="news-events">
          <div
            className={`transform transition-all duration-1000 ease-out ${visibleElements.has("news-events") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <h2 className="font-heading text-2xl md:text-3xl text-center tracking-[0.08em] font-normal mb-6 md:mb-7 leading-[1.08] uppercase">
              {n.eventSection[lang]}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 mb-2 md:mb-2.5">
              {events.length === 0 ? (
                <p className="col-span-full text-center text-gray-400 py-8">
                  {lang === "vi" ? "Chua co su kien nao" : "No events yet"}
                </p>
              ) : (
                events.map((event) => (
                  <Link
                    key={event.id}
                    to={`/news/${event.slug}`}
                    className="flex flex-col group cursor-pointer"
                  >
                    <div className="w-full h-64 bg-gray-200 overflow-hidden">
                      <img
                        alt={event.titleVi || event.titleEn || n.altEvent[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={event.imageUrl || PLACEHOLDER_IMG_EVENT}
                        onError={(e) => {
                          e.target.src = PLACEHOLDER_IMG_EVENT;
                        }}
                      />
                    </div>
                    <div className="bg-gray-50 px-5 py-4 md:px-5 md:py-4 flex flex-col flex-1 border border-t-0 border-gray-100">
                      <h3 className="font-heading font-normal text-black mb-2 text-xl leading-[1.08] tracking-[0.04em] group-hover:text-gray-600 transition-colors uppercase">
                        {lang === "vi"
                          ? event.titleVi
                          : event.titleEn || event.titleVi}
                      </h3>
                      <p className="text-sm text-gray-500 leading-[1.75] tracking-[0.01em] text-justify hyphens-auto line-clamp-3">
                        {lang === "vi"
                          ? event.excerptVi ||
                            event.contentVi ||
                            n.exhibitionBody[lang]
                          : event.excerptEn ||
                            event.contentEn ||
                            n.exhibitionBody[lang]}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-4 md:mt-5 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-2.5 text-xs font-semibold tracking-[0.14em] bg-white text-stone-800 ring-[0.5px] ring-stone-400 hover:ring-[#3c4a28] hover:bg-[#3c4a28] hover:text-white transition-all duration-200 uppercase"
              >
                {n.viewMore[lang]}
              </button>
            </div>
          </div>
        </section>

        {/* ACTIVITIES SECTION */}
        <section className="mb-6 md:mb-7" data-animate id="news-activities">
          <div
            className={`transform transition-all duration-1000 ease-out ${visibleElements.has("news-activities") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <h2 className="font-heading text-2xl md:text-3xl text-center tracking-[0.08em] font-normal mb-5 md:mb-6 leading-[1.08] text-[#3c4a28] uppercase">
              {n.companyActivities[lang]}
            </h2>

            {activities.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                {lang === "vi" ? "Chưa có hoạt động nào" : "No activities yet"}
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5 mb-2 md:mb-2.5">
                {activities.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="flex gap-2.5 md:gap-3 group cursor-pointer"
                  >
                    <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                      <img
                        alt={item.titleVi || item.titleEn || n.altActivity[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={item.imageUrl || PLACEHOLDER_IMG_ACTIVITY}
                        onError={(e) => {
                          e.target.src = PLACEHOLDER_IMG_ACTIVITY;
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-heading font-normal text-black mb-1 text-base sm:text-lg leading-[1.1] tracking-[0.04em] group-hover:text-gray-600 transition-colors uppercase">
                        {lang === "vi" ? item.titleVi : item.titleEn || item.titleVi}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-[1.72] tracking-[0.01em] text-justify hyphens-auto">
                        {lang === "vi"
                          ? item.excerptVi || item.contentVi || n.teamBuildingBody[lang]
                          : item.excerptEn || item.contentEn || n.teamBuildingBody[lang]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-7 md:mt-8 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-2.5 text-xs font-semibold tracking-[0.14em] bg-white text-stone-800 ring-[0.5px] ring-stone-400 hover:ring-[#3c4a28] hover:bg-[#3c4a28] hover:text-white transition-all duration-200 uppercase"
              >
                {n.viewMore[lang]}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default News;
