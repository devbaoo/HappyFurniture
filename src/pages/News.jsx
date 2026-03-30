import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";

const News = () => {
    const { lang } = useLanguage();
    const n = siteCopy.newsPage;
    const navHome = siteCopy.nav[lang].home;

    const exhibitionYears = [2024, 2025, 2026];

    return (
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1650px] py-4 pt-28 font-sans bg-white relative">
            <h1 className={`font-heading text-3xl lg:text-4xl tracking-[0.08em] font-normal mb-4 text-center leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}>
                {n.title[lang]}
            </h1>

            <div className="mb-6 text-sm text-gray-500 tracking-[0.08em] text-left">
                <Link to="/" className="hover:text-black transition-colors uppercase">{navHome}</Link>
                {" / "}
                <span className="text-black uppercase">{n.breadcrumbCurrent[lang]}</span>
            </div>

            <section className="mb-12 pt-2">
                <h2 className={`font-heading text-2xl md:text-3xl text-center tracking-[0.08em] font-normal mb-8 leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}>{n.eventSection[lang]}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 mb-6">
                    {exhibitionYears.map((year, idx) => (
                        <div key={year} className="flex flex-col group cursor-pointer">
                            <div className="w-full h-64 bg-gray-200 overflow-hidden">
                                <img
                                    alt={`${n.altEvent[lang]} ${year}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400"
                                />
                            </div>
                            <div className="bg-gray-50 p-6 flex flex-col flex-1 border border-t-0 border-gray-100">
                                <h3
                                    className={`font-heading font-normal text-black mb-3 text-xl leading-[1.08] tracking-[0.04em] group-hover:text-gray-600 transition-colors ${lang === "vi" ? "normal-case" : "uppercase"}`}
                                >
                                    {n.exhibitionTitle(year)[lang]}
                                </h3>
                                <p
                                    className="text-sm text-gray-500 leading-[1.75] tracking-[0.01em]"
                                >
                                    {n.exhibitionBody[lang]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button type="button" className={`px-8 py-2.5 text-xs font-semibold tracking-[0.14em] border border-gray-300 hover:bg-black hover:text-white transition-colors ${lang === "vi" ? "normal-case" : "uppercase"}`}>
                        {n.viewMore[lang]}
                    </button>
                </div>
            </section>

            <section className="mb-12">
                <h2 className={`font-heading text-2xl md:text-3xl text-center tracking-[0.08em] font-normal mb-6 leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}>{n.companyActivities[lang]}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    <div className="flex flex-col space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={`tb-l-${i}`} className="flex gap-6 group cursor-pointer">
                                <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                    <img alt={n.altActivity[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className={`font-heading font-normal text-black mb-2 text-base sm:text-lg leading-[1.1] tracking-[0.04em] group-hover:text-gray-600 transition-colors ${lang === "vi" ? "normal-case" : "uppercase"}`}>{n.teamBuildingTitle[lang]}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-[1.72] tracking-[0.01em]">{n.teamBuildingBody[lang]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={`ft-r-${i}`} className="flex gap-6 group cursor-pointer">
                                <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                    <img alt={n.altActivity[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className={`font-heading font-normal text-black mb-2 text-base sm:text-lg leading-[1.1] tracking-[0.04em] group-hover:text-gray-600 transition-colors ${lang === "vi" ? "normal-case" : "uppercase"}`}>{n.factoryTourTitle[lang]}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-[1.72] tracking-[0.01em]">{n.factoryTourBody[lang]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="button" className={`px-8 py-3 text-xs font-semibold tracking-[0.14em] border border-gray-300 hover:bg-black hover:text-white transition-colors ${lang === "vi" ? "normal-case" : "uppercase"}`}>{n.viewMore[lang]}</button>
                </div>
            </section>
        </div>
    );
};

export default News;
