import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import useMegaMenu from "../../hooks/useMegaMenu";
import { useLanguage } from "../../context/LanguageContext";
import { siteCopy } from "../../i18n/siteCopy";

/* ─── Fallback image when category has no imageUrl ────────────── */
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

/* ─── Right image panel ────────────────────────────────────────── */
const ImagePanel = ({ category, isDark }) => (
  <div className="flex flex-col gap-3 w-[260px] shrink-0">
    <div className="overflow-hidden w-full" style={{ aspectRatio: "4/3" }}>
      <img
        src={category.imageUrl || FALLBACK_IMG}
        alt={category.name.trim()}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
    </div>
    <Link
      to={`/product?category=${category.id}`}
      className={`
        flex items-center gap-1 text-[12px] tracking-[0.15em] uppercase
        transition-colors duration-200
        ${isDark ? "text-white/80 hover:text-white" : "text-stone-700 hover:text-stone-900"}
      `}
    >
      <span>{category.name.trim()} Collection</span>
      <ChevronRight size={10} strokeWidth={1.5} className="mt-px shrink-0" />
    </Link>
  </div>
);

/* ─── The full dropdown panel (fixed, full-width) ─────────────── */
const DropdownPanel = ({
  categories,
  isDark,
  topOffset,
  open,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { lang } = useLanguage();

  /* Track only the hovered category id and fall back to the first category. */
  const [hoveredCatId, setHoveredCatId] = useState(null);

  if (!categories.length) return null;

  const activeCat =
    categories.find((cat) => cat.id === hoveredCatId) || categories[0];

  /* Determine the category to show the image for */
  const previewCat =
    activeCat || categories.find((c) => c.imageUrl) || categories[0];

  return (
    <div
      className={`
        fixed left-0 right-0
        border-t
        ${isDark ? "border-white/10 bg-[#0c0c0c]" : "border-stone-200 bg-white"}
        shadow-2xl
        transition-all duration-300 ease-out
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      style={{
        top: topOffset,
        zIndex: 100,
        marginTop: open ? "0px" : "-6px",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        setHoveredCatId(null);
        onMouseLeave();
      }}
    >
      <div className="mx-auto max-w-[1800px] px-16 py-10">
        <div className="flex items-stretch gap-0 min-h-[320px]">

          {/* ── Left sidebar: parent category list ────────── */}
          <div
            className={`
              w-[240px] shrink-0 flex flex-col
              border-r
              ${isDark ? "border-white/10" : "border-stone-100"}
            `}
          >
            {categories.map((cat) => {
              const isActive = activeCat?.id === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={`/product?category=${cat.id}`}
                  onMouseEnter={() => setHoveredCatId(cat.id)}
                  className={`
                    group/parent flex items-center justify-between
                    py-3 pr-6 text-[12px] tracking-[0.2em] uppercase
                    transition-all duration-200
                    ${isActive
                      ? isDark
                        ? "text-white bg-white/5 pl-4"
                        : "text-stone-900 bg-stone-50 pl-4"
                      : isDark
                        ? "text-white/60 hover:text-white hover:bg-white/5 pl-3 hover:pl-4"
                        : "text-stone-500 hover:text-stone-900 hover:bg-stone-50 pl-3 hover:pl-4"
                    }
                  `}
                >
                  <span className="font-medium">{cat.name.trim()}</span>
                  <ChevronRight
                    size={12}
                    strokeWidth={1.5}
                    className={`
                      shrink-0 transition-all duration-200
                      ${isActive
                        ? isDark ? "text-white opacity-100 translate-x-0" : "text-stone-700 opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1 group-hover/parent:opacity-60 group-hover/parent:translate-x-0"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Middle: children of the hovered parent ────── */}
          <div className="flex-1 px-10 relative overflow-hidden">
            {activeCat ? (
              <div
                key={activeCat.id}
                className="animate-fadeInMenu"
              >
                {/* Section title */}
                <div className="mb-6">
                  <h3
                    className={`
                      text-[13px] tracking-[0.25em] uppercase font-semibold
                      ${isDark ? "text-white" : "text-stone-900"}
                    `}
                  >
                    {activeCat.name.trim()}
                  </h3>
                  <div
                    className={`
                      mt-2 h-px w-12
                      ${isDark ? "bg-white/20" : "bg-stone-300"}
                    `}
                  />
                </div>

                {/* Children grid */}
                {activeCat.children && activeCat.children.length > 0 ? (
                  <ul
                    className="grid gap-x-10 gap-y-3"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(
                        Math.ceil(activeCat.children.length / 5),
                        3
                      )}, minmax(160px, 1fr))`,
                    }}
                  >
                    {activeCat.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={`/product?category=${child.id}`}
                          className={`
                            group/sub relative text-[12px] tracking-[0.1em] uppercase
                            transition-colors duration-200 flex items-center gap-2
                            py-1
                            ${isDark
                              ? "text-white/60 hover:text-white"
                              : "text-stone-500 hover:text-stone-900"
                            }
                          `}
                        >
                          <span
                            className={`
                              w-1 h-1 rounded-full shrink-0 transition-all duration-200
                              ${isDark
                                ? "bg-white/20 group-hover/sub:bg-white"
                                : "bg-stone-300 group-hover/sub:bg-stone-700"
                              }
                            `}
                          />
                          <span className="relative">
                            {child.name.trim()}
                            <span
                              className={`
                                absolute left-0 -bottom-px h-px w-0
                                transition-all duration-300 group-hover/sub:w-full
                                ${isDark ? "bg-white/60" : "bg-stone-700"}
                              `}
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  /* No children — show "View all" */
                  <Link
                    to={`/product?category=${activeCat.id}`}
                    className={`
                      inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase
                      transition-colors duration-200
                      ${isDark ? "text-white/50 hover:text-white" : "text-stone-400 hover:text-stone-700"}
                    `}
                  >
                    <span>{siteCopy.common.viewCollection[lang]}</span>
                    <ChevronRight size={10} strokeWidth={1.5} />
                  </Link>
                )}

                {/* "View all" link at bottom */}
                {activeCat.children && activeCat.children.length > 0 && (
                  <div className="mt-8">
                    <Link
                      to={`/product?category=${activeCat.id}`}
                      className={`
                        inline-flex items-center gap-1.5
                        text-[11px] tracking-[0.18em] uppercase font-medium
                        transition-colors duration-200
                        ${isDark
                          ? "text-white/40 hover:text-white"
                          : "text-stone-400 hover:text-stone-700"
                        }
                      `}
                    >
                      <span>
                        {lang === "vi"
                          ? `Xem tất cả ${activeCat.name.trim()}`
                          : `View all ${activeCat.name.trim()}`}
                      </span>
                      <ChevronRight size={10} strokeWidth={1.5} />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback — should not happen since we always have a default */
              <div />
            )}
          </div>

          {/* ── Vertical divider ──────────────────────────── */}
          <div
            className={`w-px self-stretch shrink-0 ${
              isDark ? "bg-white/10" : "bg-stone-100"
            }`}
          />

          {/* ── Image preview ─────────────────────────────── */}
          <ImagePanel category={previewCat} isDark={isDark} />
        </div>
      </div>
    </div>
  );
};

/* ─── "Product" nav item with mega dropdown ───────────────────── */
export const ProductNavItem = ({ isDark = false, productLabel = "Product", onNavigate }) => {
  const { categories, loading } = useMegaMenu();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const getHeaderBottom = useCallback(() => {
    const header = document.querySelector("header");
    return header ? header.getBoundingClientRect().bottom : 0;
  }, []);

  const [panelTop, setPanelTop] = useState(() => getHeaderBottom());

  const measureHeader = useCallback(() => {
    setPanelTop(getHeaderBottom());
  }, [getHeaderBottom]);

  useEffect(() => {
    window.addEventListener("resize", measureHeader);
    return () => {
      window.removeEventListener("resize", measureHeader);
      clearTimeout(closeTimer.current);
    };
  }, [measureHeader]);

  useEffect(() => {
    if (!open) return undefined;

    const closePanel = () => {
      clearTimeout(closeTimer.current);
      setOpen(false);
    };

    window.addEventListener("scroll", closePanel, { passive: true });
    window.addEventListener("wheel", closePanel, { passive: true });
    window.addEventListener("touchmove", closePanel, { passive: true });

    return () => {
      window.removeEventListener("scroll", closePanel);
      window.removeEventListener("wheel", closePanel);
      window.removeEventListener("touchmove", closePanel);
    };
  }, [open]);

  const openPanel = useCallback(() => {
    clearTimeout(closeTimer.current);
    measureHeader();
    setOpen(true);
  }, [measureHeader]);

  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  if (loading) {
    return (
      <li>
        <span
          className={`text-[12px] tracking-[0.25em] uppercase opacity-40 ${
            isDark ? "text-white" : "text-stone-600"
          }`}
        >
          {productLabel}
        </span>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={openPanel}
      onMouseLeave={scheduleClose}
    >
      {/* Nav label */}
      <Link
        to="/product"
        onClick={() => {
          setOpen(false);
          onNavigate?.();
        }}
        className={`
          relative text-[12px] tracking-[0.25em] uppercase pb-1
          transition-colors duration-200
          ${isDark
            ? open ? "text-white" : "text-white/80 hover:text-white"
            : open ? "text-stone-900" : "text-stone-600 hover:text-stone-900"
          }
        `}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {productLabel}
        {/* Active underline */}
        <span
          className={`
            absolute left-0 bottom-0 h-px w-full transform origin-left
            transition-transform duration-300
            ${isDark ? "bg-white" : "bg-stone-900"}
            ${open ? "scale-x-100" : "scale-x-0"}
          `}
        />
      </Link>

      {/* Dropdown */}
      <DropdownPanel
        categories={categories}
        isDark={isDark}
        topOffset={panelTop}
        open={open}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      />
    </li>
  );
};

/* ─── Mobile accordion for "Product" ─────────────────────────── */
export const ProductMobileItem = ({
  isDark = false,
  onClose,
  productLabel = "Product",
}) => {
  const { lang } = useLanguage();
  const { categories, loading } = useMegaMenu();
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  if (loading) return null;

  return (
    <li className={`border-b ${isDark ? "border-white/10" : "border-stone-100"}`}>
      <div className="flex items-center justify-between">
        <Link
          to="/product"
          onClick={onClose}
          className={`py-3 text-[12px] tracking-[0.2em] uppercase flex-1 ${
            isDark ? "text-white/80" : "text-stone-700"
          }`}
        >
          {productLabel}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`py-3 px-2 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          aria-label={siteCopy.common.expandCategoriesAria[lang]}
        >
          <ChevronRight
            size={14}
            strokeWidth={1.5}
            className={isDark ? "text-white/50" : "text-stone-400"}
          />
        </button>
      </div>

      {open && (
        <ul className="pl-4 pb-3 flex flex-col gap-0">
          {categories.map((cat) => (
            <li key={cat.id}>
              {/* Parent category — tap to expand children */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/product?category=${cat.id}`}
                  onClick={onClose}
                  className={`block py-2 text-[11px] tracking-[0.18em] uppercase font-semibold flex-1 ${
                    isDark ? "text-white/70" : "text-stone-600"
                  }`}
                >
                  {cat.name.trim()}
                </Link>
                {cat.children && cat.children.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId((prev) =>
                        prev === cat.id ? null : cat.id
                      )
                    }
                    className={`p-1 transition-transform duration-200 ${
                      expandedId === cat.id ? "rotate-90" : ""
                    }`}
                    aria-label={`Expand ${cat.name.trim()}`}
                  >
                    <ChevronRight
                      size={12}
                      strokeWidth={1.5}
                      className={isDark ? "text-white/40" : "text-stone-400"}
                    />
                  </button>
                )}
              </div>

              {/* Children — visible only when parent is expanded */}
              {expandedId === cat.id &&
                cat.children &&
                cat.children.length > 0 && (
                  <ul className="pl-3 pb-1 flex flex-col gap-1.5">
                    {cat.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={`/product?category=${child.id}`}
                          onClick={onClose}
                          className={`text-[10px] tracking-[0.14em] uppercase ${
                            isDark
                              ? "text-white/40 hover:text-white"
                              : "text-stone-400 hover:text-stone-700"
                          } transition-colors duration-200`}
                        >
                          {child.name.trim()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default { ProductNavItem, ProductMobileItem };
