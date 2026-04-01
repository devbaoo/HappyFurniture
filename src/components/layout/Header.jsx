import { useMemo, useState } from "react";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { Bookmark, Menu, X } from "lucide-react";
import { ProductNavItem, ProductMobileItem } from "./MegaMenu";
import { useLanguage } from "../../context/LanguageContext";
import { siteCopy } from "../../i18n/siteCopy";

/* ─── Reusable static NavLink item ────────────────────────────── */
const StaticNavItem = ({ to, label, end, isDark }) => (
  <li className="relative group">
    <NavLink
      to={to}
      end={end}
      className={`
        text-[12px] tracking-[0.18em] uppercase pb-1
        transition-colors duration-200
        ${
          isDark
            ? "text-white/80 hover:text-white"
            : "text-stone-600 hover:text-stone-900"
        }
      `}
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={`
              absolute left-0 bottom-0 w-full h-[1px]
              transform origin-left transition-transform duration-300
              ${isDark ? "bg-white" : "bg-stone-900"}
              ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
            `}
          />
        </>
      )}
    </NavLink>
  </li>
);

/* ─── Header ───────────────────────────────────────────────────── */
const Header = () => {
  const { pathname } = useLocation();
  const { lang, setLang } = useLanguage();
  const { favorites, setShowFavorites } = useFavorites();
  const isDark = pathname === "/";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LEFT = useMemo(
    () => [
      { to: "/", label: siteCopy.nav[lang].home, end: true },
      { to: "/certificate", label: siteCopy.nav[lang].certificate },
      { to: "/what-we-do", label: siteCopy.nav[lang].whatWeDo },
    ],
    [lang],
  );
  const NAV_RIGHT = useMemo(
    () => [
      { to: "/news", label: siteCopy.nav[lang].news },
      { to: "/order-delivery", label: siteCopy.nav[lang].orderDelivery },
      { to: "/contact", label: siteCopy.nav[lang].contact },
    ],
    [lang],
  );
  const ALL_STATIC = useMemo(
    () => [...NAV_LEFT, ...NAV_RIGHT],
    [NAV_LEFT, NAV_RIGHT],
  );
  const pageLabels = useMemo(
    () => ({
      "/certificate": siteCopy.nav[lang].certificate,
      "/what-we-do": siteCopy.nav[lang].whatWeDo,
      "/product": lang === "vi" ? "Sản phẩm" : "Product",
      "/news": siteCopy.nav[lang].news,
      "/order-delivery": siteCopy.nav[lang].orderDelivery,
      "/contact": siteCopy.nav[lang].contact,
    }),
    [lang],
  );

  return (
    <header
      className={`absolute top-0 left-0 w-full z-50 ${isDark ? "bg-transparent" : "bg-white"}`}
    >
      {/* ── Top bar: search / logo / flags ─────────────────────── */}
      <div className="mx-auto max-w-[1800px] px-2 md:px-10 w-full">
        <div
          className={`flex items-center md:items-end justify-between py-4 md:py-6 relative ${mobileOpen && isDark ? "bg-[#111111] -mx-2 px-2 pb-[17px] md:mx-0 md:px-0 md:bg-transparent" : ""}`}
        >
          {/* Left Side: Mobile Hamburger & Desktop Search */}
          <div className="w-auto md:w-[300px] flex items-center">
            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 -ml-1 ${isDark ? "text-white" : "text-stone-700"}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={
                mobileOpen
                  ? siteCopy.header.ariaCloseMenu[lang]
                  : siteCopy.header.ariaOpenMenu[lang]
              }
            >
              {mobileOpen ? (
                <X size={28} strokeWidth={1} />
              ) : (
                <Menu size={28} strokeWidth={1} />
              )}
            </button>

            {/* Search — desktop only */}
            <div className="hidden md:block w-full">
              <div
                className={`flex items-center h-[38px] border px-4 gap-2 ${
                  isDark ? "border-white/50" : "border-stone-300"
                }`}
              >
                <svg
                  className={`w-4 h-4 shrink-0 ${isDark ? "text-white/70" : "text-stone-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-5.197-5.197M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder={siteCopy.header.searchPlaceholder[lang]}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      navigate(`/product?name=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchQuery("");
                    }
                  }}
                  className={`bg-transparent text-[12px] w-full outline-none ${
                    isDark
                      ? "placeholder-white/70 text-white"
                      : "placeholder-stone-400 text-stone-700"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center z-10 w-max">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <img
                src="/images/logo-brown.png"
                alt="Happy Furniture Logo"
                className={`h-[36px] md:h-[42px] w-auto object-contain ${isDark ? "brightness-0 invert" : ""}`}
              />
            </Link>
          </div>

          {/* Right: flags + favorite button */}
          <div className="flex flex-col items-end gap-2 w-auto md:w-[300px] justify-end">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Vietnam flag */}
              <button
                type="button"
                aria-label="Tiếng Việt"
                aria-pressed={lang === "vi"}
                onClick={() => setLang("vi")}
                className={`overflow-hidden rounded-sm hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDark ? "focus-visible:ring-white" : "focus-visible:ring-stone-500"} ${lang === "vi" ? "ring-2 ring-offset-1 ring-amber-400/90" : ""}`}
                style={{ width: 28, height: 20 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 20"
                  width="28"
                  height="20"
                >
                  <rect width="28" height="20" fill="#DA251D" />
                  <polygon
                    points="14,4 15.35,8.15 19.71,8.15 16.18,10.71 17.53,14.85 14,12.29 10.47,14.85 11.82,10.71 8.29,8.15 12.65,8.15"
                    fill="#FFFF00"
                  />
                </svg>
              </button>

              {/* US flag */}
              <button
                type="button"
                aria-label="English"
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
                className={`overflow-hidden rounded-sm hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDark ? "focus-visible:ring-white" : "focus-visible:ring-stone-500"} ${lang === "en" ? "ring-2 ring-offset-1 ring-amber-400/90" : ""}`}
                style={{ width: 28, height: 20 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 20"
                  width="28"
                  height="20"
                >
                  <rect width="28" height="20" fill="#B22234" />
                  <rect y="1.54" width="28" height="1.54" fill="#fff" />
                  <rect y="4.62" width="28" height="1.54" fill="#fff" />
                  <rect y="7.69" width="28" height="1.54" fill="#fff" />
                  <rect y="10.77" width="28" height="1.54" fill="#fff" />
                  <rect y="13.85" width="28" height="1.54" fill="#fff" />
                  <rect y="16.92" width="28" height="1.54" fill="#fff" />
                  <rect width="11" height="10.77" fill="#3C3B6E" />
                  {[1.1, 3.3, 5.5, 7.7, 9.9].map((x, i) => (
                    <g key={i}>
                      {[1, 3, 5, 7, 9].map(
                        (y, j) =>
                          (i + j) % 2 === 0 && (
                            <circle
                              key={j}
                              cx={x}
                              cy={y * 0.95}
                              r="0.55"
                              fill="#fff"
                            />
                          ),
                      )}
                    </g>
                  ))}
                </svg>
              </button>
            </div>

            {/* Show my Favorite button */}
            <button
              onClick={() => setShowFavorites(true)}
              className={`hidden md:flex items-center gap-2.5 px-4 h-[38px] transition-all duration-200 whitespace-nowrap ${
                isDark
                  ? "ring-1 ring-white/80 text-white hover:bg-[#3c4a28] hover:ring-[#3c4a28] hover:text-white"
                  : "ring-[0.5px] ring-stone-400 bg-white text-stone-800 hover:ring-[#3c4a28] hover:bg-[#3c4a28] hover:text-white"
              }`}
              aria-label="Open Quote List"
            >
              <Bookmark size={15} strokeWidth={1.7} className={favorites.length > 0 ? "fill-current" : ""} />
              <span className="text-[11px] tracking-[0.14em] uppercase font-medium">
                My Quote List
              </span>
              {favorites.length > 0 && (
                <span
                  className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                    isDark
                      ? "bg-white text-stone-900"
                      : "bg-stone-900 text-white"
                  }`}
                >
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop navigation ─────────────────────────────────── */}
      <nav aria-label={siteCopy.header.navAriaLabel[lang]}>
        <div className="mx-auto max-w-[1800px] px-10 w-full hidden md:block">
          <ul className="flex items-center justify-center gap-12 pb-4 whitespace-nowrap">
            {NAV_LEFT.map(({ to, label, end }) => (
              <StaticNavItem
                key={to}
                to={to}
                label={label}
                end={end}
                isDark={isDark}
              />
            ))}

            {/* ← "Product" with mega-dropdown → */}
            <ProductNavItem
              isDark={isDark}
              productLabel={pageLabels["/product"]}
            />

            {NAV_RIGHT.map(({ to, label }) => (
              <StaticNavItem key={to} to={to} label={label} isDark={isDark} />
            ))}
          </ul>
        </div>

        {/* ── Mobile drawer ────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className={`
              md:hidden fixed inset-x-0 bottom-0 top-[80px] overflow-y-auto z-[90]
              ${isDark ? "bg-[#111111]" : "bg-white"}
            `}
          >
            <ul
              className={`px-6 pt-4 pb-4 border-t ${
                isDark ? "border-white/10" : "border-stone-100"
              }`}
            >
              {ALL_STATIC.slice(0, 3).map(({ to, label, end }) => (
                <li
                  key={to}
                  className={`border-b py-3 ${
                    isDark ? "border-white/10" : "border-stone-100"
                  }`}
                >
                  <NavLink
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[12px] tracking-[0.2em] uppercase ${
                      isDark ? "text-white/80" : "text-stone-700"
                    }`}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              {/* Product with expandable categories */}
              <ProductMobileItem
                isDark={isDark}
                onClose={() => setMobileOpen(false)}
                productLabel={pageLabels["/product"]}
              />

              {ALL_STATIC.slice(3).map(({ to, label }) => (
                <li
                  key={to}
                  className={`border-b py-3 ${
                    isDark ? "border-white/10" : "border-stone-100"
                  }`}
                >
                  <NavLink
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[12px] tracking-[0.2em] uppercase ${
                      isDark ? "text-white/80" : "text-stone-700"
                    }`}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ── Breadcrumb — only on /certificate ──────────────────── */}
      {pathname === "/certificate" && (
        <div className="hidden md:block mx-auto max-w-[1800px] px-10 w-full pb-3">
          <div className="h-px bg-stone-300 mb-2" />
          <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-stone-400">
            <Link to="/" className="hover:text-stone-600 transition-colors">
              {siteCopy.nav[lang].home}
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-600">
              {pageLabels[pathname] ||
                (pathname.startsWith("/product/")
                  ? pageLabels["/product"]
                  : pathname.replace("/", ""))}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
