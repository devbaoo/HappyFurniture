import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_HEADER_HEIGHT = 130;

const PageBreadcrumb = ({
  items = [],
  containerClassName = "mx-auto max-w-[1800px] px-10 w-full",
}) => {
  const [headerH, setHeaderH] = useState(FALLBACK_HEADER_HEIGHT);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector("header");
      if (!header) return;
      setHeaderH(Math.ceil(header.getBoundingClientRect().height));
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <div className="md:hidden" style={{ height: headerH }} />
      <div
        className="hidden md:block border-b border-stone-200 bg-white"
        style={{ marginTop: headerH }}
      >
        <div className={containerClassName}>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 py-3 text-[10px] tracking-[0.18em] uppercase text-stone-400"
          >
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                  {item.to && !isLast ? (
                    <Link
                      to={item.to}
                      className="hover:text-stone-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-stone-600" : undefined}>
                      {item.label}
                    </span>
                  )}
                  {!isLast && <span className="text-stone-300">/</span>}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default PageBreadcrumb;
