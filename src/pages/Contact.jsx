import { useState } from "react";

/* ── icon helpers ── */

/* ── underline input (for dark panel) ── */

const Contact = () => {
    const [captcha, setCaptcha] = useState("");

    return (
        <div className="w-full bg-white">

            {/* header offset */}
            <div className="pt-[130px]" />

            {/* ══ MAIN 2-COL ══ */}
            <section className="py-14">
                <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-start gap-8">
                    <div className="bg-[#3c4a28] px-6 py-6 w-full flex flex-col" style={{ transform: "translate(0px, 85px)" }}>
                        <h2 className="text-white text-xl font-light tracking-[0.14em] uppercase mb-6">YOUR DETAIL</h2>
                        <form className="flex flex-col justify-between flex-1">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-6">
                                <div>
                                    <label className="block text-[10px] text-white/70 mb-1 tracking-wide">Name (*)</label>
                                    <input placeholder="Your Name" className="w-full bg-transparent border-b border-white/30 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-white/70 mb-1 tracking-wide">Address</label>
                                    <input placeholder="Your Address" className="w-full bg-transparent border-b border-white/30 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-white/70 mb-1 tracking-wide">Phone number</label>
                                    <input placeholder="Your Phone number" className="w-full bg-transparent border-b border-white/30 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors" type="tel" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-white/70 mb-1 tracking-wide">Email (*)</label>
                                    <input placeholder="Your Email" className="w-full bg-transparent border-b border-white/30 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors" type="email" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-white/70 mb-1 tracking-wide">Subject (*)</label>
                                    <input placeholder="Your Subject" className="w-full bg-transparent border-b border-white/30 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors" type="text" />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-white/70 mb-1 tracking-wide">Content (*)</label>
                                    <input placeholder="Your Content" className="w-full bg-transparent border-b border-white/30 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors" type="text" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 items-end">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-white px-3 py-1 text-[#3c4a28] font-mono text-base tracking-[0.3em] font-bold select-none" data-measuring="true">SAVQO</div>
                                        <button type="button" aria-label="Refresh captcha" className="text-white/60 hover:text-white text-lg leading-none">↻</button>
                                    </div>
                                    <input placeholder="Enter the text you see above" className="w-full bg-transparent border-b border-white/30 pb-1 text-white text-xs placeholder:text-white/40 focus:outline-none" type="text" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <p className="text-[10px] text-white/40">(*) Required information</p>
                                    <button type="submit" className="bg-[#d6cec6] text-[#3c4a28] text-[11px] tracking-[0.25em] uppercase px-10 py-2.5 hover:opacity-90 transition">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="px-12 pt-10" data-selected="true" data-label-id="0" style={{ height: "560.766px", transform: "translate(-5px, 62px)", width: "672.391px" }}>
                        <h2 className="font-heading uppercase font-light text-[#3a3530] mb-5" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", letterSpacing: "0.1em" }}>GET IN TOUCH</h2>
                        <p className="text-sm text-stone-500 leading-relaxed mb-8 max-w-sm" style={{ height: "0.375px", transform: "translate(0px, -32px)", width: "434px" }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                        <div>
                            <h3 className="text-sm font-semibold text-[#3a3530] mb-3">Uyen Tran (Ms.)</h3>
                            <div className="space-y-2 text-[12px] text-stone-500" style={{ height: "54.5625px", transform: "translate(0px, -9px)" }}>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
                                    <a href="mailto:uyen.tran@happyfurniturenvn.com" className="hover:text-stone-700 transition-colors">uyen.tran@happyfurniturenvn.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>
                                    <span>(+84) 2516 280 180 (máy lẻ 135)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"></path></svg>
                                    <span>(+84) 2516 280 181</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="border-t border-stone-200 my-5"></div>
                            <h3 className="text-sm font-semibold text-[#3a3530] mb-3" style={{ height: "0px", transform: "translate(0px, -30px)" }}>Colin Phan (Ông)</h3>
                            <div className="space-y-2 text-[12px] text-stone-500" style={{ height: "53.562px", transform: "translate(0px, -25px)" }}>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path></svg>
                                    <a href="mailto:colin.phan@happyfurniturenvn.com" className="hover:text-stone-700 transition-colors">colin.phan@happyfurniturenvn.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>
                                    <span>(+84) 2516 280 140 (máy lẻ 0-14)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"></path></svg>
                                    <span>(+84) 2516 280 131</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ GOOGLE MAP ══ */}
            <section className="mt-12">
                <iframe
                    title="Happy Furniture Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.134!2d106.8918!3d10.9423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d86d2fa97311%3A0xb11780c0c2e43c34!2zQ8O0bmcgVHkgVE5ISCBHbyBIYW5oIFBodWMgKEhhcHB5IEZ1cm5pdHVyZSk!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
                    width="100%"
                    height="360"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>

        </div>
    );
};

export default Contact;
