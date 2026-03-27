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
        className="relative w-full overflow-hidden h-[clamp(220px,45vw,580px)] md:h-[70vh] md:min-h-[480px]"
        style={{ marginTop: headerH }}
      >
        <img
          src={heroImg}
          alt="Factory floor"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.5]"
        />
        {/* subtle dark gradient at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-[5%]">
          <h1 className="hidden md:block font-heading text-white text-4xl md:text-5xl uppercase tracking-[0.25em] font-light">
            What We Do
          </h1>
        </div>
      </section>

      {/* ══ FURNITURE MANUFACTURING ═══════════════════════════════════════ */}
      <section className="wwd-mfg-section">
        <div className="w-full px-4 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
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
      <section className="bg-[#d8d1c9] py-5 md:py-24">
        <div className="w-full px-3 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <h2
            className="text-center font-heading uppercase text-[#4b4a3f] max-w-[468px] md:max-w-none mx-auto mb-3 md:mb-20 text-[23px] md:text-[clamp(1.5rem,2.4vw,2.1rem)] tracking-[0.025em] md:tracking-[0.08em] leading-[1.3] md:leading-[1.4] md:-translate-y-[33.3334px]"
          >
            <span className="md:hidden">
              <span className="whitespace-nowrap">WE ARE KNOWN AS ONE</span> <br />
              OF THE TOP KD MANUFACTURERS <br />
              IN VIETNAM.
            </span>
            <span className="hidden md:inline">
              WE ARE KNOWN AS ONE OF THE TOP <br />
              KD MANUFACTURERS IN VIETNAM.
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
                  className="w-full h-[175px] md:h-[290px] object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
                <p className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center text-white text-[12px] md:text-[18px] font-medium tracking-wide drop-shadow-md">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINISHING / MATERIALS / PRODUCT RANGE ════════════════════════ */}
      <section className="wwd-specs-section">
        <div className="mx-auto max-w-[1800px] px-4 md:px-14 lg:px-24 w-full">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
            {/* Ảnh ẩn trên mobile, hiện từ lg trở lên */}
            <div className="hidden lg:block w-full lg:w-[40%] flex-shrink-0">
              <img
                alt="Design sketches"
                className="w-full h-[500px] object-cover"
                src={finishingImg}
              />
            </div>
            <div className="flex-1 w-full">
              <div className="wwd-specs-columns">
                <div className="wwd-specs-left">
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">Finishing</h3>
                    <ul className="wwd-spec-list">
                      <li>NC, PU, Water-based (Greenguard certified), UV, UV Edge Paint</li>
                      <li>Painted/Pigmented, Rustic</li>
                    </ul>
                  </div>
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">Materials</h3>
                    <ul className="wwd-spec-list">
                      <li>Solid: Pine, Poplar, Oak, Rubberwood, Acacia, Hemlock</li>
                      <li>Veneers: Any type</li>
                    </ul>
                  </div>
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">Specializing In</h3>
                    <ul className="wwd-spec-list">
                      <li>Solid Wood Furniture</li>
                      <li>Veneered Particle Board Furniture</li>
                    </ul>
                  </div>
                </div>
                <div className="wwd-specs-right">
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">Product Range</h3>
                    <ul className="wwd-spec-list">
                      {productRange.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMBER MERCHANDISING ═════════════════════════════════════════ */}
      <section className="bg-[#eae4db] lg:bg-[#d6cec6] pt-6 pb-2 lg:py-24 w-full">
        <div className="w-full px-5 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-12 lg:gap-16 items-center w-full">
            {/* LEFT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center w-full">
              <h2
                className="font-serif lg:font-sans uppercase whitespace-normal lg:whitespace-nowrap mb-2 md:mb-5 text-[#2a2c26] md:text-[#273927] lg:font-semibold"
                style={{
                  fontSize: "clamp(1.6rem, 6vw, 2.05rem)",
                  letterSpacing: "0.02em",
                  lineHeight: "1.08",
                }}
              >
                TIMBER MERCHANDISING
              </h2>

              <div className="mb-3 md:mb-6 flex flex-col gap-2 md:gap-3 text-[12px] md:text-[15px] font-normal md:font-light text-[#303030] md:text-stone-700 text-left">
                <p className="leading-[1.38] md:leading-relaxed text-left md:text-left pr-1 md:pr-0">
                  We enjoy advantages of having large warehousing facilities,
                  with storage capacity of up to 10,000 cubic meter of raw
                  material and more than 60 containers.
                </p>
                <p className="leading-[1.38] md:leading-relaxed text-left md:text-left pr-1 md:pr-0">
                  We have established long-term relationship with our licensed
                  suppliers in New Zealand, Chile, Brazil, Germany, and Uruguay.
                  All sourced timber is 100% FSC certified and passing relevant
                  controlled wood regulatory requirements.
                </p>
              </div>

              {/* QUALITY */}
              <div className="mb-2 md:mb-6">
                <p className="text-[13px] md:text-xs tracking-normal md:tracking-[0.2em] font-bold md:font-medium capitalize md:uppercase text-[#1c1c1c] md:text-stone-500 mb-1.5 md:mb-3">
                  Quality
                </p>

                <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-3 w-full">
                  {["Industrial Grade", "Millrun", "COL", "FCOL", "ACOL"].map((tag) => (
                    <span
                      key={tag}
                      className="w-full md:w-auto bg-white text-stone-800 md:text-stone-600 text-[11px] md:text-[11px] font-normal md:font-medium normal-case md:uppercase tracking-normal md:tracking-wider py-1.5 md:py-1.5 px-2.5 md:px-6 md:min-w-[85px] text-center rounded-sm shadow-sm flex items-center justify-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-2.5 md:mb-8">
                <p className="text-[13px] md:text-xs tracking-normal md:tracking-[0.2em] font-bold md:font-medium capitalize md:uppercase text-[#1c1c1c] md:text-stone-500 mb-1 md:mb-2">
                  Size
                </p>
                <p className="text-[13px] md:text-[15px] text-[#303030] md:text-stone-700 font-normal md:font-light">
                  Varied thickness (11mm to 50mm)
                </p>
              </div>

              {/* BUTTON */}
              <div className="w-full md:w-auto">
                <Link
                  to="/product"
                  className="inline-flex justify-center items-center whitespace-nowrap w-[160px] md:w-[200px] bg-[#314028] md:bg-[#273927] text-white text-[12px] md:text-[12px] tracking-[0.05em] md:tracking-[0.2em] font-medium uppercase px-4 md:px-8 py-2.5 rounded-sm hover:bg-[#1f2d1f] transition duration-300"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE LAYOUT - 60% */}
            <div className="lg:col-span-3 flex flex-col gap-1.5 md:gap-1 mt-1 md:mt-0 w-full mb-0 pb-0">
              <div className="w-full h-[190px] sm:h-[360px] lg:h-[420px] overflow-hidden rounded-sm">
                <img
                  src={timber1Img}
                  alt="Bedroom furniture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-1 w-full">
                <div className="overflow-hidden rounded-sm h-[130px] sm:h-[200px] lg:h-[280px]">
                  <img
                    src={timber2Img}
                    alt="Dining tables"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-sm h-[130px] sm:h-[200px] lg:h-[280px]">
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
