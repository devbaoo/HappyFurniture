import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import useMegaMenu from "../../hooks/useMegaMenu";

/* ─── Fallback image when category has no imageUrl ────────────── */
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";

/* ─── Single category column (name + children list) ───────────── */
const CategoryColumn = ({ category, isDark, onHoverImage }) => (
  <div
    className="flex flex-col gap-3 min-w-[150px]"
    onMouseEnter={() => onHoverImage(category)}
  >
    {/* Column heading = parent category name → links to /product?category=id */}
    <Link
      to={`/product?category=${category.id}`}
      className={`
        text-[12px] tracking-[0.22em] uppercase font-semibold pb-2
        border-b transition-colors duration-200
        ${isDark
          ? "text-white border-white/10 hover:text-white/70"
          : "text-stone-900 border-stone-200 hover:text-stone-600"
        }
      `}
    >
      {category.name.trim()}
    </Link>

    {/* Sub-categories */}
    {category.children && category.children.length > 0 ? (
      <ul className="flex flex-col gap-2.5">
        {category.children.map((child) => (
          <li key={child.id}>
            <Link
              to={`/product?category=${child.id}`}
              className={`
                group/sub relative text-[13px] tracking-[0.1em] uppercase
                transition-colors duration-200 flex items-center gap-1
                ${isDark
                  ? "text-white/70 hover:text-white"
                  : "text-stone-600 hover:text-stone-900"
                }
              `}
            >
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
      /* No children — show "View all" nudge */
      <span
        className={`text-[12px] tracking-[0.1em] italic ${
          isDark ? "text-white/40" : "text-stone-400"
        }`}
      >
        View collection
      </span>
    )}
  </div>
);

/* ─── Right image panel ────────────────────────────────────────── */
const ImagePanel = ({ category, isDark }) => (
  <div className="flex flex-col gap-3 w-[240px] shrink-0">
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
const DropdownPanel = ({ categories, isDark, topOffset, open, onMouseEnter, onMouseLeave }) => {
  /* Track which category image is shown on the right; default = first with an image */
  const defaultCat = categories.find((c) => c.imageUrl) || categories[0];
  const [previewCat, setPreviewCat] = useState(defaultCat);

  /* Reset preview when panel re-opens */
  useEffect(() => {
    setPreviewCat(categories.find((c) => c.imageUrl) || categories[0]);
  }, [categories]);

  if (!categories.length) return null;

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
        /* Use margin-top for the slide effect — avoids creating a new stacking context
           that would break position:fixed inside a transform parent */
        marginTop: open ? "0px" : "-6px",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto max-w-[1800px] px-16 py-10">
        <div className="flex items-start gap-12">

          {/* ── Category columns ──────────────────────────── */}
          <div
            className="flex-1 grid gap-x-10 gap-y-8"
            style={{
              gridTemplateColumns: `repeat(${Math.min(categories.length, 5)}, minmax(130px, 1fr))`,
            }}
          >
            {categories.map((cat) => (
              <CategoryColumn
                key={cat.id}
                category={cat}
                isDark={isDark}
                onHoverImage={setPreviewCat}
              />
            ))}
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
export const ProductNavItem = ({ isDark = false }) => {
  const { categories, loading } = useMegaMenu();
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const closeTimer = useRef(null);

  const measureHeader = useCallback(() => {
    const header = document.querySelector("header");
    if (header) setPanelTop(header.getBoundingClientRect().bottom);
  }, []);

  useEffect(() => {
    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => window.removeEventListener("resize", measureHeader);
  }, [measureHeader]);

  const openPanel = useCallback(() => {
    clearTimeout(closeTimer.current);
    measureHeader();
    setOpen(true);
  }, [measureHeader]);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
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
          Product
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
        Product
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

      {/* Dropdown — transition lives inside DropdownPanel to avoid
          creating a transform stacking context that breaks fixed positioning */}
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
export const ProductMobileItem = ({ isDark = false, onClose }) => {
  const { categories, loading } = useMegaMenu();
  const [open, setOpen] = useState(false);

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
          Product
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`py-3 px-2 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          aria-label="expand categories"
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
              {/* Parent category */}
              <Link
                to={`/product?category=${cat.id}`}
                onClick={onClose}
                className={`block py-2 text-[11px] tracking-[0.18em] uppercase font-semibold ${
                  isDark ? "text-white/70" : "text-stone-600"
                }`}
              >
                {cat.name.trim()}
              </Link>
              {/* Children */}
              {cat.children && cat.children.length > 0 && (
                <ul className="pl-3 pb-1 flex flex-col gap-1.5">
                  {cat.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        to={`/product?category=${child.id}`}
                        onClick={onClose}
                        className={`text-[10px] tracking-[0.14em] uppercase ${
                          isDark ? "text-white/40 hover:text-white" : "text-stone-400 hover:text-stone-700"
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
