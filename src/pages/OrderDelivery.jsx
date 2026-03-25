import { useEffect, useState } from "react";
import Container from "../components/ui/Container";

/* ─── static data ──────────────────────────────────────────────── */

/* ─── sub-components ───────────────────────────────────────────── */

/** Reusable section heading — uppercase serif, tracked */
const SectionHeading = ({ children, light = false, className = "" }) => (
    <h2
        className={`font-heading font-light uppercase text-2xl md:text-3xl ${light ? "text-white" : "text-primary"} ${className}`}
        style={{ letterSpacing: "0.10em" }}
    >
        {children}
    </h2>
);

/** Generic gray image placeholder */
const ImgPlaceholder = ({ className = "", tone = "mid" }) => {
    const bg = tone === "dark" ? "bg-[#1a1a1a]" : tone === "light" ? "bg-[#d4d4d4]" : "bg-[#aaaaaa]";
    return <div className={`${bg} ${className}`} />;
};

/* ─── page ─────────────────────────────────────────────────────── */
const OrderDelivery = () => {
    const [headerH, setHeaderH] = useState(0);

    useEffect(() => {
        const measure = () => {
            const el = document.querySelector("header");
            if (el) setHeaderH(el.getBoundingClientRect().height);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return (
        <div className="overflow-x-hidden">

            {/* ══ HERO ══════════════════════════════════════════════════ */}
            <section
                className="relative bg-[#1c1c1c] flex items-end justify-center pb-6"
                style={{ minHeight: "52vh", marginTop: headerH }}
            >
                {/* subtle grain-like overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none" />
                <h1
                    className="relative font-heading font-light uppercase text-white text-xl md:text-2xl lg:text-3xl text-center"
                    style={{ letterSpacing: "0.18em" }}
                >
                    Order and Delivery
                </h1>
            </section>

            {/* ══ DELIVERY ══════════════════════════════════════════════ */}
            <section className="bg-white" style={{ padding: "100px 0px" }}>
                <div className="mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <div>
                            <div className="bg-[#111] text-white p-4 md:p-4 mb-8 w-full" style={{ height: "auto", minHeight: "180px", transform: "translate(0px, 65px)" }}>
                                <SectionHeading light className="mb-2 text-xl md:text-2xl mt-0">
                                    Delivery
                                </SectionHeading>
                                <p className="font-sans text-white/70 text-sm xl:text-[15px] text-justify" style={{ lineHeight: "1.6" }}>
                                    Our goal is to achieve optimal delivery efficiency, which means the shortest delivery time while minimizing delivery error. We are able to ship year round, except for Lunar New Year. To actively arrange orders, Happy always notice customers three months ahead.
                                </p>
                            </div>
                            <ul className="space-y-4" style={{ height: "100.312px", transform: "translate(0px, 2px)" }}>
                                <li className="font-sans flex items-start gap-3 text-sm text-primary" style={{ lineHeight: "1.65", height: "36.4375px", transform: "translate(0px, 36px)" }}>
                                    <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-primary/50"></span>
                                    <span>Samples are usually made within&nbsp;<strong className="text-primary">15 to 30 days</strong></span>
                                </li>
                                <li className="font-sans flex items-start gap-3 text-sm text-primary" style={{ lineHeight: "1.65", height: "32.4375px", transform: "translate(0px, -1px)" }}>
                                    <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-primary/50"></span>
                                    <span>Orders under lead-time takes&nbsp;<strong className="text-primary">60 to 75 days</strong></span>
                                </li>
                                <li className="font-sans flex items-start gap-3 text-sm text-primary" style={{ lineHeight: "1.65", height: "32.438px", transform: "translate(0px, -37px)" }}>
                                    <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-primary/50"></span>
                                    <span>Reorder takes&nbsp;<strong className="text-primary">45 to 60 days</strong></span>
                                </li>
                            </ul>
                        </div>
                        <ImgPlaceholder className="w-full aspect-video" tone="light" />
                    </div>
                </div>
            </section>

            {/* ══ ORDER ═════════════════════════════════════════════════ */}
            <section className="bg-[#f5f5f3] overflow-hidden">
                <div className="flex flex-col md:flex-row" style={{ minHeight: "520px" }}>
                    <div className="relative md:w-1/2 min-h-[320px] md:min-h-0">
                        <div className="bg-[#aaaaaa] absolute inset-0 w-full h-full"></div>
                        <p className="font-sans absolute bottom-4 left-5 text-[13px] text-white/90 tracking-wider" style={{ width: "293.469px", transform: "translate(615px, 0px)", height: "2.5938px" }}>
                            There are approximately 500 designs
                        </p>
                    </div>
                    <div className="md:w-1/2 flex items-center px-10 md:px-16 lg:px-20 py-16">
                        <div className="w-full max-w-md">
                            <h2 className="font-heading font-light uppercase text-2xl md:text-3xl text-primary mb-6" style={{ letterSpacing: "0.1em", height: "38px", transform: "translate(0px, 22px)" }}>
                                Order
                            </h2>
                            <p className="font-sans text-sm text-secondary mb-4"
                                style={{
                                    lineHeight: "1.75", width: "526px", height: "24.5px",
                                    transform: "translate(0px, 21px)"
                                }}>
                                Our current and past product ranges are displayed in our showroom for your reference.
                            </p>
                            <p className="font-sans text-sm text-secondary mb-10"
                                style={{
                                    lineHeight: "1.75", width: "489px", height: "24.5px",
                                    transform: "translate(0px, 21px)"
                                }}>
                                Orders made for any of these designs are subject to MOQ, which is at least 200 for chairs and 50 for other products.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#1a1a1a] w-full aspect-video"
                                    style={{ height: "125px", transform: "translate(0px, -8px)" }}></div>
                                <div className="bg-[#1a1a1a] w-full aspect-video"
                                    style={{ height: "125px", transform: "translate(0px, -8px)" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ OEM ═══════════════════════════════════════════════════ */}
            <section className="bg-white" style={{ padding: "100px 0" }}>
                <Container>
                    {/* centered text block */}
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <SectionHeading className="mb-2">OEM</SectionHeading>
                        <p
                            className="font-sans text-sm text-gray-800 font-medium"
                            style={{ lineHeight: "1.8" }}
                        >
                            Our experienced and highly skilled designers can assist clients from product
                            customisation through to furniture structure. Our team members have been
                            running the modification running 30 times to provide our clients with complete
                            technical drawings within 3–5 days.
                        </p>
                    </div>

                    {/* 3-column image row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <ImgPlaceholder className="w-full aspect-video" tone="dark" />
                        <ImgPlaceholder className="w-full aspect-video" tone="dark" />
                        <ImgPlaceholder className="w-full aspect-video" tone="dark" />
                    </div>
                </Container>
            </section>

            {/* ══ PACKAGING AND DISPATCH ════════════════════════════════ */}
            <section className="bg-[#111]" style={{ padding: "100px 0px" }}>
                <div className="mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full ">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="font-heading font-light uppercase text-2xl md:text-3xl text-white mb-5" style={{ letterSpacing: "0.1em", height: "0px", transform: "translate(0px, -38px)" }}>
                            Packaging and Dispatch
                        </h2>
                        <p className="font-sans text-sm text-white/100" style={{ lineHeight: "1.8", height: "30.7656px", transform: "translate(0px, -18px)" }}>
                            We are committed to offering our clients international standards packaging and dispatch process are affiliated to various international accredited consulting.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ height: "234.547px", transform: "translate(0px, -55px)" }}>
                        <div className="font-sans bg-gray-800 border border-white/15 px-6 py-4 text-center text-[12px] text-white tracking-wider uppercase hover:bg-gray-700 transition-all duration-300 cursor-default" style={{ letterSpacing: "0.08em" }}>
                            A.I.R – Standard Transit Packaging Test
                        </div>
                        <div className="font-sans bg-gray-800 border border-white/15 px-6 py-4 text-center text-[12px] text-white tracking-wider uppercase hover:bg-gray-700 transition-all duration-300 cursor-default" style={{ letterSpacing: "0.08em" }}>
                            Customised Standards for Quality, Safety &amp; Budget
                        </div>
                        <div className="font-sans bg-gray-800 border border-white/15 px-6 py-4 text-center text-[12px] text-white tracking-wider uppercase hover:bg-gray-700 transition-all duration-300 cursor-default" style={{ letterSpacing: "0.08em" }}>
                            TFR.73 – Advanced Stimulated Transit Test
                        </div>
                        <div className="font-sans bg-gray-800 border border-white/15 px-6 py-4 text-center text-[12px] text-white tracking-wider uppercase hover:bg-gray-700 transition-all duration-300 cursor-default" style={{ letterSpacing: "0.08em" }}>
                            Client Specific Technical Packaging Solutions
                        </div>
                        <div className="font-sans bg-gray-800 border border-white/15 px-6 py-4 text-center text-[12px] text-white tracking-wider uppercase hover:bg-gray-700 transition-all duration-300 cursor-default" style={{ letterSpacing: "0.08em" }}>
                            E-commerce Compliant Multi-Order Packaging
                        </div>
                        <div className="font-sans bg-gray-800 border border-white/15 px-6 py-4 text-center text-[12px] text-white tracking-wider uppercase hover:bg-gray-700 transition-all duration-300 cursor-default" style={{ letterSpacing: "0.08em" }}>
                            Detailed Packaging Design &amp; Approval Process
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default OrderDelivery;
