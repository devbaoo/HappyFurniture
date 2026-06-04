import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import useScrollAnimation from "../hooks/useScrollAnimation";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { newsService } from "../services/news.service";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400";

const Event = () => {
  const { lang } = useLanguage();
  const n = siteCopy.newsPage;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const visibleElements = useScrollAnimation([events]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await newsService.getEvents(1, 100);
        setEvents(data.items || []);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const breadcrumbItems = [
    { label: siteCopy.nav[lang].home, to: "/" },
    { label: siteCopy.nav[lang].news, to: "/news" },
    { label: siteCopy.nav[lang].newsDropdown.event },
  ];

  if (loading) {
    return (
      <div className="w-full bg-white font-sans">
        <PageBreadcrumb items={breadcrumbItems} />
        <div className="mx-auto w-full max-w-[1650px] px-2 py-3 md:px-14 lg:px-24 md:py-4 relative">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3c4a28] border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white font-sans">
        <PageBreadcrumb items={breadcrumbItems} />
        <div className="mx-auto w-full max-w-[1650px] px-2 py-3 md:px-14 lg:px-24 md:py-4 relative">
          <p className="text-center text-gray-500 py-12">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans">
      <SEOHead
        title={lang === "vi" ? "Sự kiện" : "Event"}
        description={
          lang === "vi"
            ? "Các sự kiện và hoạt động công ty của Happy Furniture."
            : "Events and company activities of Happy Furniture."
        }
        canonical="/event"
      />
      <PageBreadcrumb items={breadcrumbItems} />

      <div className="mx-auto w-full max-w-[1650px] px-2 py-3 md:px-14 lg:px-24 md:py-4 relative">
        <section className="mb-6 md:mb-7 pt-1" data-animate id="event-list">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              visibleElements.has("event-list") ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="font-heading text-2xl md:text-3xl text-center tracking-[0.08em] font-normal mb-6 md:mb-7 leading-[1.08] uppercase">
              {n.companyActivities[lang]}
            </h2>

            {events.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                {lang === "vi" ? "Chưa có sự kiện nào" : "No events yet"}
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5 mb-2 md:mb-2.5">
                {events.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="flex gap-2.5 md:gap-3 group cursor-pointer"
                  >
                    <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                      <img
                        alt={item.titleVi || item.titleEn || n.altActivity[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={item.imageUrl || PLACEHOLDER_IMG}
                        onError={(e) => {
                          e.target.src = PLACEHOLDER_IMG;
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[11px] text-gray-400 mb-1 tracking-wide">
                        {new Date(item.createdAt).toLocaleDateString(
                          lang === "vi" ? "vi-VN" : "en-US",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </p>
                      <h3 className="font-heading font-normal text-black mb-1 text-base sm:text-lg leading-[1.1] tracking-[0.04em] group-hover:text-gray-600 transition-colors uppercase">
                        {lang === "vi" ? item.titleVi : item.titleEn || item.titleVi}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-[1.72] tracking-[0.01em] text-justify hyphens-auto">
                        {lang === "vi"
                          ? item.excerptVi || n.teamBuildingBody[lang]
                          : item.excerptEn || n.teamBuildingBody[lang]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Event;
