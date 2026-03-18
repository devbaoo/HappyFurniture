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
        <footer className="bg-[#3c4a28] text-white">
            <div className="mx-auto max-w-[1700px] px-6 w-full">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 py-14">

                    {/* LOGO */}
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="text-4xl font-bold">HP</div>
                            <div>
                                <p className="text-lg font-semibold leading-none">
                                    HAPPY<br />FURNITURE
                                </p>
                                <p className="text-[11px] text-white/70">
                                    Make life more convenient
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT */}
                    <div>
                        <h3 className="font-semibold mb-4">PRODUCT</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            {footerLinks.Product.map((link, index) => (
                                <li key={index}>{link}</li>
                            ))}
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="font-semibold mb-4">SUPPORT</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            {footerLinks.Support.map((link, index) => (
                                <li key={index}>{link}</li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="font-semibold mb-4">CONTACT US</h3>

                        <div className="space-y-3 text-sm text-white/80">

                            <p>
                                Đường số 9, Khu công nghiệp Tam Phước,<br />
                                Thành phố Biên Hòa, Tỉnh Đồng Nai, Việt Nam
                            </p>

                            <p>
                                (+84) 2516 280 180 | Việt Nam <br />
                                (+84) 986 229 279 | Tiếng Anh
                            </p>

                            <p>happyfurniturenvn.com</p>

                        </div>
                    </div>

                </div>

                {/* SOCIAL */}
                <div className="mt-6 pb-4">

                    <div className="flex items-center gap-6 mb-6">
                        <span className="text-sm font-semibold">Social</span>
                        <div className="flex-1 h-px bg-white/30"></div>
                    </div>

                    <div className="flex items-center justify-between">

                        {/* ICONS */}
                        <div className="flex gap-4">

                            {/* Facebook */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#3c4a28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="#3c4a28" stroke="none" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3c4a28">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                                </svg>
                            </a>

                        </div>

                        {/* COPYRIGHT */}
                        <p className="text-xs text-white/70 text-right whitespace-nowrap">
                            ©2026 All rights reserved. If you are using a screen reader and are having problems using this website, please call (800) 967-6696.
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
