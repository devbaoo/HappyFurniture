import { useLocation, Link, NavLink } from "react-router-dom";
import Container from "../ui/Container";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/certificate", label: "Certificate" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/product", label: "Product" },
  { to: "/news", label: "News" },
  { to: "/order-delivery", label: "Order And Delivery" },
  { to: "/contact", label: "Contact" },
];

/* map pathname → label cho breadcrumb */
const pageLabels = {
  "/certificate": "Certificate",
  "/what-we-do": "What We Do",
  "/product": "Product",
  "/news": "News",
  "/order-delivery": "Order And Delivery",
  "/contact": "Contact",
};

const Header = () => {
  const { pathname } = useLocation();
  const isDark = pathname === "/";

  return (
    <header
      className={`absolute top-0 left-0 w-full z-50 ${isDark ? "" : "bg-white"}`}
    >
      <div className="mx-auto max-w-[1800px] px-10 w-full">
        <div className="flex items-center justify-between py-6 relative">
          {/* Search */}
          <div className="w-[300px]">
            <div
              className={`flex items-center border px-4 py-1.5 gap-2 ${isDark ? "border-white/50" : "border-stone-300"}`}
            >
              <svg
                className={`w-4 h-4 ${isDark ? "text-white/70" : "text-stone-400"}`}
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
                placeholder="what can we help you find"
                className={`bg-transparent text-[12px] w-full outline-none ${isDark ? "placeholder-white/70 text-white" : "placeholder-stone-400 text-stone-700"}`}
              />
            </div>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div
              className={`flex items-center gap-2 ${isDark ? "text-white" : "text-stone-800"}`}
            >
              <span className="text-3xl font-light">HP</span>

              <div className="flex flex-col text-left">
                <span className="text-sm tracking-widest">HAPPY</span>
                <span className="text-sm tracking-widest">FURNITURE</span>
                <span
                  className={`text-[9px] ${isDark ? "text-white/70" : "text-stone-400"}`}
                >
                  Make life more convenient
                </span>
              </div>
            </div>
          </div>

          {/* Flags */}
          <div className="flex items-center gap-2">
            {/* Vietnam flag */}
            <button
              aria-label="Tiếng Việt"
              className="overflow-hidden rounded-sm hover:opacity-80 transition-opacity"
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
                  points="14,4 15.76,9.42 21.41,9.42 16.83,12.7 18.58,18.12 14,14.84 9.42,18.12 11.17,12.7 6.59,9.42 12.24,9.42"
                  fill="#FFFF00"
                />
              </svg>
            </button>
            {/* US flag */}
            <button
              aria-label="English"
              className="overflow-hidden rounded-sm hover:opacity-80 transition-opacity"
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
                {/* stars simplified */}
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
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <div className="mx-auto max-w-[1800px] px-10 w-full">
          <ul className="flex items-center justify-center gap-16 pb-4 whitespace-nowrap">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={`text-[12px] tracking-[0.25em] uppercase ${isDark ? "text-white/80 hover:text-white" : "text-stone-600 hover:text-stone-900"}`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Short decorative line + breadcrumb — only on non-home and non-what-we-do pages */}
      {!isDark && pathname !== "/what-we-do" && (
        <div className="mx-auto max-w-[1800px] px-10 w-full pb-3">
          {/* line */}
          <div className="h-px bg-stone-300 mb-2" />

          {/* breadcrumb — left aligned */}
          <div className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-stone-400">
            <Link to="/" className="hover:text-stone-600 transition-colors">
              Home
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-600">
              {pageLabels[pathname] ||
                (pathname.startsWith("/product/")
                  ? "Product"
                  : pathname.replace("/", ""))}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
