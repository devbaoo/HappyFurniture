import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Warehouse, Users, PackageOpen, Factory, Armchair } from "lucide-react";
import Container from "../components/ui/Container";

// ── Image imports ──────────────────────────────────────────────────────────
import heroImg from "/images/about-us/InsideFactoryBackGround.jpg";
import manufacturingImg from "/images/about-us/FurnitureManufacturing.jpg";
import finishingImg from "/images/about-us/Finishing.jpg";
import timber1Img from "/images/about-us/Timber.jpg";
import timber2Img from "/images/about-us/Timber2.jpg";
import timber3Img from "/images/about-us/Timber3.jpg";


// ── Data ───────────────────────────────────────────────────────────────────
const iconProps = { size: 22, strokeWidth: 1.4 };

const stats = [
  {
    icon: <Warehouse {...iconProps} />,
    label: "TOTAL FLOOR AREA",
    detail:
      "Our factory area surrounds a production and storage area of 45,000 square meters.",
  },
  {
    icon: <Users {...iconProps} />,
    label: "TOTAL WORKFORCE",
    detail: "600 employees",
  },
  {
    icon: <PackageOpen {...iconProps} />,
    label: "CAPACITY",
    detail:
      "On average, our capacity is about 80 to 100 containers per month (depend on product line).",
  },
  {
    icon: <Factory {...iconProps} />,
    label: "FACILITIES",
    detail:
      "We have an on-site canteen for our workers, employees and clients. QC. Also, our factory always has a consistent power source.",
  },
  {
    icon: <Armchair {...iconProps} />,
    label: "FORM OF FURNITURE",
    detail:
      "We are known for knock-down, fully assembled and especially no-tool knock down items.",
  },
];

const productRange = [
  "Occasional Furniture",
  "Bedroom",
  "Dining",
  "Entertainment Units",
  "Home Office",
  "Youth/Kids Furniture",
  "Vanity",
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function WhatWeDo() {
  const [headerH, setHeaderH] = useState(152);

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
    <main className="bg-white text-primary">
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative h-[70vh] min-h-[480px] overflow-hidden"
        style={{ marginTop: headerH }}
      >
        <img
          src={heroImg}
          alt="Factory floor"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.5]"
        />
        <div className="absolute inset-0 flex items-end justify-center pb-16">
          <h1 className="font-heading text-white text-4xl md:text-5xl uppercase tracking-[0.25em] font-light">
            What We Do
          </h1>
        </div>
      </section>

      {/* ══ FURNITURE MANUFACTURING ═══════════════════════════════════════ */}
      <section className="wwd-mfg-section">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="wwd-mfg-inner">
            {/* ── LEFT: green block + photo ── */}
            <div className="wwd-mfg-left">
              <div
                className="wwd-green-block"
              />
              <div
                className="wwd-photo-wrap"
                style={{
                  height: "466.094px", transform: "translate(0px, 34px)",
                }}
              >
                <img
                  src={manufacturingImg}
                  alt="Workers in furniture factory"
                  className="wwd-mfg-photo" style={{ height: "540.094px", width: "556.438px", transform: "translate(20px, 16px)" }}
                />
              </div>
            </div>

            {/* ── RIGHT: editorial text content ── */}
            <div className="wwd-mfg-right">
              <div className="wwd-mfg-right-inner">
                <h2 className="wwd-mfg-heading">Furniture Manufacturing</h2>

                <p className="wwd-mfg-intro">
                  Tapered legs - a signature of mid-century design - complement
                  our chair's striking silhouette. The impeccably upholstered
                  seat and back is supported by a wood frame.
                </p>

                <ul className="wwd-stat-list">
                  {stats.map(({ icon, label, detail }) => (
                    <li key={label} className="wwd-stat-item">
                      <span className="wwd-stat-icon">{icon}</span>
                      <div>
                        <p className="wwd-stat-label">{label}</p>
                        <p className="wwd-stat-detail">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. DARK PROMO — Full-width dark bg + 4-col images beneath
         ══════════════════════════════════════════════ */}
      <section className="bg-[#d8d1c9] py-24">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <h2
            className="text-center font-heading uppercase text-[#4b4a3f] mb-16"
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
              letterSpacing: "0.08em",
              lineHeight: "1.4",
            }}
          >
            WE ARE KNOWN AS ONE OF THE TOP <br />
            KD MANUFACTURERS IN VIETNAM.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: "/images/home/Quality.jpg", text: "Cam kết chất lượng" },
              {
                src: "/images/home/InternationalStandard.jpg",
                text: "Tiêu chuẩn quốc tế",
              },
              {
                src: "/images/home/SustainableProduction.jpg",
                text: "Sản xuất bền vững",
              },
              {
                src: "/images/home/ExportRegulations.jpg",
                text: "Tuân thủ quy định xuất khẩu",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm group"
              >
                <img
                  src={item.src}
                  alt={item.text}
                  className="w-full h-[290px] object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-0 right-0 text-center text-white text-sm font-light tracking-wide">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINISHING / MATERIALS / PRODUCT RANGE ════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
            {/* Left — design sketch image */}
            <div className="w-full lg:w-[40%] flex-shrink-0">
              <img
                src={finishingImg}
                alt="Design sketches"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Right — specs */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              <div>
                <h3 className="wwd-spec-heading">Finishing</h3>
                <ul className="wwd-spec-list">
                  <li>NC, PU, Water-based (Greenguard certified)</li>
                  <li>UV, UV Edge Paint</li>
                  <li>Painted/Pigmented, Rustic</li>
                </ul>
              </div>

              <div>
                <h3 className="wwd-spec-heading">Product Range</h3>
                <ul className="wwd-spec-list">
                  {productRange.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="wwd-spec-heading">Materials</h3>
                <ul className="wwd-spec-list">
                  <li>Solid: Pine, Poplar, Oak, Rubberwood, Acacia, Hemlock</li>
                  <li>Veneers: Any type</li>
                </ul>
              </div>

              <div>
                <h3 className="wwd-spec-heading">Specializing In</h3>
                <ul className="wwd-spec-list">
                  <li>Solid Wood Furniture</li>
                  <li>Veneered Particle Board Furniture</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ TIMBER MERCHANDISING ═════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#d6cec6" }} className="py-12">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2
                className="font-serif uppercase mb-3 text-[#273927] whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.3rem)",
                  letterSpacing: "0.08em",
                  lineHeight: "1.15",
                }}
              >
                TIMBER MERCHANDISING
              </h2>

              <div className="mb-5 flex flex-col gap-2 text-sm font-light text-stone-600">
                <p className="leading-relaxed">
                  We enjoy advantages of having large warehousing facilities,
                  with storage capacity of up to 10,000 cubic meter of raw
                  material and more than 60 containers.
                </p>
                <p className="leading-relaxed">
                  We have established long-term relationship with our licensed
                  suppliers in New Zealand, Chile, Brazil, Germany, and Uruguay.
                  All sourced timber is 100% FSC certified and passing relevant
                  controlled wood regulatory requirements.
                </p>
              </div>

              {/* QUALITY */}
              <div className="mb-5">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-500 font-medium mb-3">
                  QUALITY
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {["Industrial Grade", "Millrun", "COL"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white text-stone-600 text-[11px] font-medium uppercase tracking-wider px-4 py-1.5 rounded-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["FCOL", "ACOL"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white text-stone-600 text-[11px] font-medium uppercase tracking-wider px-4 py-1.5 rounded-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-6">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-500 font-medium mb-2">
                  SIZE
                </p>
                <p className="text-sm text-stone-600 font-light">
                  Varied thickness (11mm to 50mm)
                </p>
              </div>

              {/* BUTTON */}
              <div>
                <Link
                  to="/product"
                  className="inline-block bg-[#273927] text-white text-[12px] tracking-[0.2em] font-medium uppercase px-8 py-3.5 rounded-sm hover:bg-[#1f2d1f] transition duration-300"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE LAYOUT - 60% */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="w-full h-[360px] lg:h-[420px] overflow-hidden rounded-sm">
                <img
                  src={timber1Img}
                  alt="Bedroom furniture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-sm h-[200px] lg:h-[280px]">
                  <img
                    src={timber2Img}
                    alt="Dining tables"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-sm h-[200px] lg:h-[280px]">
                  <img
                    src={timber3Img}
                    alt="Dining specific"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
