import { useEffect, useState } from "react";
import Container from "../components/ui/Container";

/* ─── static data ──────────────────────────────────────────────── */
const deliveryItems = [
    { label: "Samples are usually made within", time: "15 to 30 days" },
    { label: "Orders under lead-time takes", time: "60 to 75 days" },
    { label: "Reorder takes", time: "45 to 60 days" },
];

const packagingFeatures = [
    "A.I.R – Standard Transit Packaging Test",
    "Customised Standards for Quality, Safety & Budget",
    "TFR.73 – Advanced Stimulated Transit Test",
    "Client Specific Technical Packaging Solutions",
    "E-commerce Compliant Multi-Order Packaging",
    "Detailed Packaging Design & Approval Process",
];

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
            className="relative bg-[#1c1c1c] flex items-center justify-center"
            style={{ minHeight: "52vh", marginTop: headerH }}
        >
            {/* subtle grain-like overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none" />
            <h1
                className="relative font-heading font-light uppercase text-white text-3xl md:text-4xl lg:text-5xl text-center"
                style={{ letterSpacing: "0.18em" }}
            >
                Order and Delivery
            </h1>
        </section>

        {/* ══ DELIVERY ══════════════════════════════════════════════ */}
        <section className="bg-white" style={{ padding: "100px 0" }}>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left — dark card + bullet list below */}
                    <div>
                        {/* Card */}
                        <div className="bg-[#111] text-white p-8 md:p-10 mb-8">
                            <SectionHeading light className="mb-5 text-xl md:text-2xl">
                                Delivery
                            </SectionHeading>
                            <p
                                className="font-sans text-white/65 text-sm text-justify"
                                style={{ lineHeight: "1.75" }}
                            >
                                Our goal is to achieve optimal delivery efficiency, which means the shortest
                                delivery time while minimizing delivery error. We are able to ship year round,
                                except for Lunar New Year. To actively arrange orders, Happy always notice
                                customers three months ahead.
                            </p>
                        </div>

                        {/* Bullet list — outside card */}
                        <ul className="space-y-4">
                            {deliveryItems.map((item) => (
                                <li
                                    key={item.label}
                                    className="font-sans flex items-start gap-3 text-sm text-primary"
                                    style={{ lineHeight: "1.65" }}
                                >
                                    <span className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-primary/50" />
                                    <span>
                                        {item.label}&nbsp;
                                        <strong className="text-primary">{item.time}</strong>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — large image placeholder */}
                    <ImgPlaceholder className="w-full aspect-[4/3]" tone="light" />
                </div>
            </Container>
        </section>

        {/* ══ ORDER ═════════════════════════════════════════════════ */}
        <section className="bg-[#f5f5f3] overflow-hidden">
            <div className="flex flex-col md:flex-row" style={{ minHeight: "520px" }}>

                {/* Left — full-bleed image, no padding */}
                <div className="relative md:w-1/2 min-h-[320px] md:min-h-0">
                    <ImgPlaceholder className="absolute inset-0 w-full h-full" tone="mid" />
                    <p className="font-sans absolute bottom-4 left-5 text-[11px] text-white/70 tracking-wider">
                        There are approximately 500 designs
                    </p>
                </div>

                {/* Right — padded text content */}
                <div className="md:w-1/2 flex items-center px-10 md:px-16 lg:px-20 py-16">
                    <div className="w-full max-w-md">
                        <SectionHeading className="mb-6">Order</SectionHeading>
                        <p
                            className="font-sans text-sm text-secondary mb-4"
                            style={{ lineHeight: "1.75" }}
                        >
                            Our current and past product ranges are displayed in our showroom for
                            your reference.
                        </p>
                        <p
                            className="font-sans text-sm text-secondary mb-10"
                            style={{ lineHeight: "1.75" }}
                        >
                            Orders made for any of these designs are subject to MOQ, which is at
                            least 200 for chairs and 50 for other products.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <ImgPlaceholder className="w-full aspect-video" tone="dark" />
                            <ImgPlaceholder className="w-full aspect-video" tone="dark" />
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
                    <SectionHeading className="mb-5">OEM</SectionHeading>
                    <p
                        className="font-sans text-sm text-secondary"
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
        <section className="bg-[#111]" style={{ padding: "100px 0" }}>
            <Container>
                {/* centered heading + subtitle */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <SectionHeading light className="mb-5">
                        Packaging and Dispatch
                    </SectionHeading>
                    <p
                        className="font-sans text-sm text-white/55"
                        style={{ lineHeight: "1.8" }}
                    >
                        We are committed to offering our clients international standards packaging and
                        dispatch process are affiliated to various international accredited consulting.
                    </p>
                </div>

                {/* 2-column tag grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packagingFeatures.map((feature) => (
                        <div
                            key={feature}
                            className="font-sans border border-white/15 px-6 py-4 text-center text-[12px] text-white/65 tracking-wider uppercase hover:border-white/35 hover:text-white/85 transition-all duration-300 cursor-default"
                            style={{ letterSpacing: "0.08em" }}
                        >
                            {feature}
                        </div>
                    ))}
                </div>
            </Container>
        </section>

    </div>
    );
};

export default OrderDelivery;
