import { Link } from "react-router-dom";
import Container from "../ui/Container";

const footerLinks = {
    Product: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
    ],
    Support: [
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
        "Lorem ipsum",
    ],
};

const Footer = () => {
    return (
        <footer className="bg-[#3c4a28] text-white pt-2">
            <div className="mx-auto max-w-[1600px] px-4 md:px-14 lg:px-24 w-full">


                {/* TOP GRID */}
                <div className="mx-auto grid max-w-[1450px] grid-cols-2 md:grid-cols-[1.08fr_0.82fr_0.82fr_1.18fr] gap-x-10 gap-y-8 md:gap-x-6 md:gap-y-10 py-8 md:py-3 justify-items-start md:justify-items-start">

                    {/* LOGO */}
                    <div className="col-span-2 md:col-span-1 w-full flex flex-col items-start md:items-start">
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
                        <h3 className="font-sans font-semibold mb-3 text-sm tracking-[0.12em] uppercase">PRODUCT</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            {footerLinks.Product.map((link, index) => (
                                <li key={index}>{link}</li>
                            ))}
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div className="flex flex-col items-start md:items-start">
                        <h3 className="font-sans font-semibold mb-3 text-sm tracking-[0.12em] uppercase">SUPPORT</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            {footerLinks.Support.map((link, index) => (
                                <li key={index}>{link}</li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="col-span-2 md:col-span-1 w-full flex flex-col items-start md:items-start">
                        <h3 className="font-sans font-semibold mb-3 text-sm tracking-[0.12em] uppercase">CONTACT US</h3>

                        <div className="w-full space-y-4 text-sm font-normal leading-[1.75] tracking-[0.01em] text-white/80">

                            <div className="grid w-full grid-cols-[16px_minmax(0,1fr)] gap-x-4">
                                <svg className="w-2 h-2 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <p>
                                    Đường số 9, Khu công nghiệp Tam Phước,<br />
                                    Thành phố Biên Hòa, Tỉnh Đồng Nai, Việt Nam
                                </p>
                            </div>

                            <div className="grid w-full grid-cols-[16px_minmax(0,1fr)] gap-x-4">
                                <svg className="w-2 h-2 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(110px,1fr)] gap-x-4 gap-y-1">
                                    <span>(+84) 2516 280 180</span>
                                    <span className="text-white/20">|</span>
                                    <span>Việt Nam</span>

                                    <span>(+84) 986 229 279</span>
                                    <span className="text-white/20">|</span>
                                    <span>Tiếng Anh</span>
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

                    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2 md:flex md:flex-row md:flex-wrap md:items-center md:gap-8">

                        {/* ICONS */}
                        <div className="flex gap-3 md:gap-4">

                            {/* Facebook */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3c4a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="#3c4a28" stroke="none" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                                </svg>
                            </a>

                        </div>

                        {/* COPYRIGHT */}
                        <p className="min-w-0 max-w-[210px] text-left text-[11px] leading-[1.5] tracking-[0.01em] text-white/50 md:ml-auto md:max-w-none md:flex-1 md:whitespace-nowrap md:text-right md:text-[13px] md:leading-[1.75]">
                            ©2026 All rights reserved. If you are using a screen reader and are having problems using this website, please call (800) 967-6696 for assistance.
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
