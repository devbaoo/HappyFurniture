import React from "react";
import { Link } from "react-router-dom";

const News = () => {
    return (
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1650px] py-4 pt-28 font-sans bg-white relative">
            {/* 1. PAGE TITLE */}
            <h1 className="text-3xl lg:text-4xl uppercase tracking-widest font-light mb-4 text-center">
                News &amp; Events
            </h1>

            {/* 2. BREADCRUMB */}
            <div className="mb-6 text-sm text-gray-500 tracking-wide text-left">
                <Link to="/" className="hover:text-black transition-colors">HOME</Link> / <span className="text-black">NEWS</span>
            </div>

            {/* 3. EVENT SECTION */}
            <section className="mb-12" style={{ height: "450.375px", transform: "translate(0px, -62px)" }}>
                <h2 className="text-2xl md:text-3xl font-serif text-center uppercase tracking-widest mb-6" style={{ height: "25px", transform: "translate(0px, 19px)" }}>Event</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 mb-6" style={{ height: "334.375px" }}>
                    {/* Item 1 */}
                    <div className="flex flex-col group cursor-pointer">
                        <div className="w-full h-64 bg-gray-200 overflow-hidden">
                            <img
                                alt="Event 1"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400"
                                style={{ width: "474px" }}
                            />
                        </div>
                        <div className="bg-gray-50 p-6 flex flex-col flex-1 border border-t-0 border-gray-100">
                            <h3
                                className="font-bold uppercase text-black mb-3 text-lg leading-tight group-hover:text-gray-600 transition-colors"
                                style={{ height: "24px", transform: "translate(0px, -28px)" }}
                            >
                                FURNITURE EXHIBITION 2024
                            </h3>
                            <p
                                className="text-sm text-gray-500 leading-relaxed"
                                style={{ height: "66.375px", transform: "translate(0px, -47px)" }}
                            >
                                Join us for our annual furniture exhibition showcasing the latest trends in modern and classic designs. Discover new collections and exclusive offers.
                            </p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col group cursor-pointer">
                        <div className="w-full h-64 bg-gray-200 overflow-hidden">
                            <img
                                alt="Event 2"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400"
                            />
                        </div>
                        <div className="bg-gray-50 p-6 flex flex-col flex-1 border border-t-0 border-gray-100">
                            <h3
                                className="font-bold uppercase text-black mb-3 text-lg leading-tight group-hover:text-gray-600 transition-colors"
                                style={{ height: "27px", transform: "translate(0px, -30px)" }}
                            >
                                FURNITURE EXHIBITION 2025
                            </h3>
                            <p
                                className="text-sm text-gray-500 leading-relaxed"
                                style={{ height: "73.375px", transform: "translate(0px, -54px)" }}
                            >
                                Join us for our annual furniture exhibition showcasing the latest trends in modern and classic designs. Discover new collections and exclusive offers.
                            </p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col group cursor-pointer">
                        <div className="w-full h-64 bg-gray-200 overflow-hidden">
                            <img
                                alt="Event 3"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400"
                            />
                        </div>
                        <div className="bg-gray-50 p-6 flex flex-col flex-1 border border-t-0 border-gray-100">
                            <h3
                                className="font-bold uppercase text-black mb-3 text-lg leading-tight group-hover:text-gray-600 transition-colors"
                                style={{ height: "28px", transform: "translate(0px, -28px)" }}
                            >
                                FURNITURE EXHIBITION 2026
                            </h3>
                            <p
                                className="text-sm text-gray-500 leading-relaxed"
                                style={{ height: "69.375px", transform: "translate(0px, -54px)" }}
                            >
                                Join us for our annual furniture exhibition showcasing the latest trends in modern and classic designs. Discover new collections and exclusive offers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="px-8 py-2.5 uppercase text-xs font-semibold tracking-widest border border-gray-300 hover:bg-black hover:text-white transition-colors">
                        View More
                    </button>
                </div>
            </section>

            {/* 4. COMPANY ACTIVITIES */}
            <section className="mb-12" style={{ height: "666.094px", transform: "translate(0px, -52.123px)" }}>
                <h2 className="text-2xl md:text-3xl font-serif text-center uppercase tracking-widest mb-6">Company Activities</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    <div className="flex flex-col space-y-6">
                        <div className="flex gap-6 group cursor-pointer">
                            <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                <img alt="Activity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold uppercase text-black mb-2 text-sm sm:text-base leading-snug group-hover:text-gray-600 transition-colors">TEAM BUILDING RETREAT</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">A look into our recent team building activities aimed at fostering collaboration and innovation within our design teams.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 group cursor-pointer">
                            <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                <img alt="Activity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold uppercase text-black mb-2 text-sm sm:text-base leading-snug group-hover:text-gray-600 transition-colors">TEAM BUILDING RETREAT</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">A look into our recent team building activities aimed at fostering collaboration and innovation within our design teams.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 group cursor-pointer">
                            <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                <img alt="Activity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold uppercase text-black mb-2 text-sm sm:text-base leading-snug group-hover:text-gray-600 transition-colors">TEAM BUILDING RETREAT</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">A look into our recent team building activities aimed at fostering collaboration and innovation within our design teams.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="flex gap-6 group cursor-pointer">
                            <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                <img alt="Activity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold uppercase text-black mb-2 text-sm sm:text-base leading-snug group-hover:text-gray-600 transition-colors">FACTORY TOUR</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">Explore the craftsmanship behind our furniture with a virtual tour of our state-of-the-art manufacturing facility.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 group cursor-pointer">
                            <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                <img alt="Activity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold uppercase text-black mb-2 text-sm sm:text-base leading-snug group-hover:text-gray-600 transition-colors">FACTORY TOUR</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">Explore the craftsmanship behind our furniture with a virtual tour of our state-of-the-art manufacturing facility.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 group cursor-pointer">
                            <div className="w-48 h-32 sm:w-64 sm:h-40 bg-gray-200 shrink-0 overflow-hidden">
                                <img alt="Activity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&amp;fit=crop&amp;q=80&amp;w=200&amp;h=150" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold uppercase text-black mb-2 text-sm sm:text-base leading-snug group-hover:text-gray-600 transition-colors">FACTORY TOUR</h3>
                                <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">Explore the craftsmanship behind our furniture with a virtual tour of our state-of-the-art manufacturing facility.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="px-8 py-3 uppercase text-xs font-semibold tracking-widest border border-gray-300 hover:bg-black hover:text-white transition-colors">View More</button>
                </div>
            </section>
        </div>
    );
};

export default News;