import { Link } from "react-router-dom";
import useMegaMenu from "../../hooks/useMegaMenu";
import { useLanguage } from "../../context/LanguageContext";
import { siteCopy } from "../../i18n/siteCopy";
import { localizeField } from "../../utils/i18n";

const Footer = () => {
    const { lang } = useLanguage();
    const { categories } = useMegaMenu();
    const supportLinks = [
        { to: "/certificate", label: siteCopy.nav[lang].certificate },
        { to: "/what-we-do", label: siteCopy.nav[lang].whatWeDo },
        { to: "/news", label: siteCopy.nav[lang].news },
        { to: "/order-delivery", label: siteCopy.nav[lang].orderDelivery },
        { to: "/contact", label: siteCopy.nav[lang].contact },
    ];

    return (
        <footer className="bg-[#3c4a28] text-white pt-2">
            <div className="mx-auto max-w-[1600px] px-4 md:px-14 lg:px-24 [@media(min-width:768px)_and_(max-width:1280px)]:px-10 w-full">


                {/* TOP GRID */}
                <div className="mx-auto grid max-w-[1450px] grid-cols-2 md:grid-cols-2 lg:grid-cols-[1.08fr_0.82fr_0.82fr_1.18fr] [@media(min-width:768px)_and_(max-width:1280px)]:grid-cols-[0.8fr_0.78fr_1.42fr] gap-x-10 gap-y-8 md:gap-x-6 md:gap-y-10 lg:gap-x-6 lg:gap-y-10 [@media(min-width:768px)_and_(max-width:1280px)]:gap-x-4 py-8 md:py-3 lg:py-3 justify-items-start md:justify-items-start">

                    {/* LOGO */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1 [@media(min-width:768px)_and_(max-width:1280px)]:col-span-3 w-full flex flex-col items-start md:items-start">
                        <div className="mb-4 flex items-center gap-4 md:mb-3">
                            <img
                                src="/images/logo-brown.png"
                                alt="Happy Furniture Logo"
                                className="h-[58px] w-auto object-contain brightness-0 invert md:h-[40px]"
                            />
                        </div>
                    </div>

                    {/* PRODUCT */}
                    <div className="flex flex-col items-start md:items-start">
                        <h3 className="font-sans font-semibold mb-3 text-sm tracking-[0.12em] uppercase">
                            {lang === "vi" ? "\u0053\u1ea3n ph\u1ea9m" : "Product"}
                        </h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        to={`/product?category=${category.id}`}
                                        className="hover:text-white transition-colors"
                                    >
                                        {localizeField(category, "name", lang)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div className="flex flex-col items-start md:items-start">
                        <h3 className="font-sans font-semibold mb-3 text-sm tracking-[0.12em] uppercase">
                            Support
                        </h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            {supportLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1 [@media(min-width:768px)_and_(max-width:1280px)]:col-span-1 w-full flex flex-col items-start md:items-start">
                        <h3 className="font-sans font-semibold mb-3 text-sm tracking-[0.12em] uppercase">CONTACT US</h3>

                        <div className="w-full space-y-4 text-sm font-normal leading-[1.75] tracking-[0.01em] text-white/80">

                            <div className="grid w-full grid-cols-[16px_minmax(0,1fr)] gap-x-4">
                                <svg className="w-2 h-2 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <p>
                                    {lang === "vi" ? (
                                        <>
                                            {"\u0110\u01b0\u1eddng s\u1ed1 9, Khu c\u00f4ng nghi\u1ec7p Tam Ph\u01b0\u1edbc,"}<br />
                                            {"Ph\u01b0\u1eddng Tam Ph\u01b0\u1edbc, T\u1ec9nh \u0110\u1ed3ng Nai, Vi\u1ec7t Nam"}
                                        </>
                                    ) : (
                                        <>
                                            9th Street, Tam Phuoc Industrial Park,<br />
                                            Tam Phuoc Ward, Dong Nai Province, Vietnam
                                        </>
                                    )}
                                </p>
                            </div>

                            <div className="grid w-full grid-cols-[16px_minmax(0,1fr)] gap-x-4">
                                <svg className="w-2 h-2 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(110px,1fr)] [@media(min-width:768px)_and_(max-width:1280px)]:grid-cols-[minmax(148px,1.25fr)_auto_minmax(88px,1fr)] gap-x-4 [@media(min-width:768px)_and_(max-width:1280px)]:gap-x-2 gap-y-1">
                                    <span className="whitespace-nowrap">(+84) 2516 280 180</span>
                                    <span className="text-white/20">|</span>
                                    <span>{lang === "vi" ? "Việt Nam" : "Vietnamese"}</span>

                                    <span className="whitespace-nowrap">(+84) 986 229 279</span>
                                    <span className="text-white/20">|</span>
                                    <span>{lang === "vi" ? "Tiếng Anh" : "English"}</span>
                                </div>
                            </div>

                            <div className="grid w-full grid-cols-[16px_minmax(0,1fr)] items-center gap-x-4">
                                <svg className="w-2 h-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p>happyfurniturenvn.com</p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* SOCIAL */}
                <div className="mx-auto mt-1 max-w-[1450px] border-t border-white/10 pb-6 md:mt-2 md:border-t-0 md:pb-4">

                    <div className="flex items-center gap-4 md:gap-6 mb-4 pt-5 md:pt-0">
                        <span className="text-sm font-semibold tracking-[0.12em] uppercase">Social</span>
                        <div className="flex-1 h-px bg-white/30"></div>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:flex md:flex-row md:flex-wrap md:items-center md:gap-8 xl:flex-nowrap [@media(min-width:768px)_and_(max-width:1280px)]:flex-col [@media(min-width:768px)_and_(max-width:1280px)]:items-start [@media(min-width:768px)_and_(max-width:1280px)]:gap-4">

                        {/* ICONS */}
                        <div className="flex gap-3 md:gap-4">

                            {/* Facebook */}
                            <a href="https://www.facebook.com/Happyfurniturevietnamofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="https://www.instagram.com/happyfurniturevietnamofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3c4a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="#3c4a28" stroke="none" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/happy-furniturevn/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20.44 12.58c0-3.46-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.38c.04.58 0 11.5 0 11.5h3.37v-6.42c0-.34.02-.69.12-.94.27-.69.88-1.4 1.9-1.4 1.34 0 1.88 1.02 1.88 2.52V20H20v-6.83c0-.37.01-.74.01-.59Z" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a href="https://www.tiktok.com/@happyfurniturevietnam0" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M16.88 3h-2.53v10.21a2.64 2.64 0 1 1-2.64-2.64c.23 0 .45.03.66.08V8.08a5.18 5.18 0 0 0-.66-.04A5.18 5.18 0 1 0 16.88 13V7.7A6.08 6.08 0 0 0 20.44 8.9V6.38A3.57 3.57 0 0 1 16.88 3Z" />
                                </svg>
                            </a>

                        </div>

                        {/* COPYRIGHT */}
                        <p className="w-full max-w-[420px] text-left text-[11px] leading-[1.5] tracking-[0.01em] text-white/50 md:ml-auto md:max-w-none md:flex-1 md:whitespace-nowrap md:text-right md:text-[13px] md:leading-[1.75] xl:w-auto [@media(min-width:768px)_and_(max-width:1280px)]:ml-0 [@media(min-width:768px)_and_(max-width:1280px)]:w-full [@media(min-width:768px)_and_(max-width:1280px)]:max-w-none [@media(min-width:768px)_and_(max-width:1280px)]:flex-none [@media(min-width:768px)_and_(max-width:1280px)]:whitespace-normal [@media(min-width:768px)_and_(max-width:1280px)]:text-left">
                            {"\u00a92026"} All rights reserved. If you are using a screen reader and are having problems using this website, please call (800) 967-6696 for assistance.
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
