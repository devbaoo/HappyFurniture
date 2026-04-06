import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { submitContact } from "../services/contact.service";
const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  phoneNumber: "",
  address: "",
};

const Contact = () => {
  const { lang } = useLanguage();
  const t = siteCopy.contact;
  const L = t.labels;
  const P = t.placeholders;
  const E = t.errors;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();


  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = E.nameRequired[lang];
    else if (form.name.length > 100) newErrors.name = E.nameTooLong[lang];

    if (!form.email.trim()) newErrors.email = E.emailRequired[lang];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = E.emailInvalid[lang];

    if (!form.subject.trim()) newErrors.subject = E.subjectRequired[lang];
    else if (form.subject.length > 200)
      newErrors.subject = E.subjectTooLong[lang];

    if (!form.message.trim()) newErrors.message = E.messageRequired[lang];
    else if (form.message.length > 2000)
      newErrors.message = E.messageTooLong[lang];

    if (form.phoneNumber && form.phoneNumber.length > 20)
      newErrors.phoneNumber = E.phoneTooLong[lang];

    if (form.address && form.address.length > 300)
      newErrors.address = E.addressTooLong[lang];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!executeRecaptcha) return;
    const recaptchaToken = await executeRecaptcha("contact");

    setLoading(true);
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        phoneNumber: form.phoneNumber || undefined,
        address: form.address || undefined,
        recaptchaToken,
      });
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || E.general[lang];
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white">
      <SEOHead
        title="Contact Us"
        description="Get in touch with Happy Furniture for product catalogs, specifications, custom orders, or partnership inquiries. Our team responds promptly."
        canonical="/contact"
      />
      <PageBreadcrumb
        items={[
          { label: siteCopy.nav[lang].home, to: "/" },
          { label: siteCopy.nav[lang].contact },
        ]}
      />

      {/* ══ MAIN 2-COL (desktop: form + GET IN TOUCH side by side) ══ */}
      <section className="pb-2 pt-14 lg:py-14">
        <div className="w-full px-2 sm:px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-start gap-8 lg:relative lg:top-[10px] lg:h-[613.25px]">
          {/* Form panel */}
          <div className="bg-[#3c4a28] px-5 sm:px-6 py-6 w-full flex flex-col lg:h-[579.641px] lg:translate-y-[141px]">
            <h2
              className={`font-heading text-white text-[30px] lg:text-[34px] font-normal tracking-[0.08em] mb-6 leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}
            >
              {t.formTitle[lang]}
            </h2>

            {success ? (
              <div className="flex flex-col flex-1 items-start justify-center gap-4">
                <p className="text-white text-sm lg:text-[15px] leading-relaxed">
                  {t.successMessage[lang]}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className={`bg-[#d6cec6] text-[#3c4a28] text-[12px] lg:text-[13px] tracking-[0.16em] px-10 py-2.5 hover:opacity-90 transition font-medium ${lang === "vi" ? "normal-case" : "uppercase"}`}
                >
                  {t.sendAnother[lang]}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col justify-between flex-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
                  <div>
                    <label className="block text-[11px] lg:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.name[lang]}
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={P.name[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="text"
                    />
                    {errors.name && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.phone[lang]}
                    </label>
                    <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder={P.phone[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="tel"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.phoneNumber}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.subject[lang]}
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={P.subject[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="text"
                    />
                    {errors.subject && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.subject}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.address[lang]}
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder={P.address[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="text"
                    />
                    {errors.address && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.address}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.email[lang]}
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={P.email[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="email"
                    />
                    {errors.email && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.content[lang]}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={P.content[lang]}
                      rows={2}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    />
                    {errors.message && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6 items-start sm:items-end">
                  <div />
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    {errors.general && (
                      <p className="text-red-300 text-[11px] text-right">
                        {errors.general}
                      </p>
                    )}
                    <p className="text-[11px] lg:text-[12px] text-white/40">
                      {t.requiredNote[lang]}
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-[#d6cec6] text-[#3c4a28] text-[12px] lg:text-[13px] tracking-[0.16em] px-10 py-2.5 hover:opacity-90 transition font-medium disabled:opacity-60 ${lang === "vi" ? "normal-case" : "uppercase"}`}
                    >
                      {loading ? t.sending[lang] : t.send[lang]}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* GET IN TOUCH — desktop only (bên phải form, giữ nguyên layout gốc) */}
          <div className="hidden lg:block px-10 xl:px-12 pt-10 lg:translate-y-14 max-w-[680px] lg:relative">
            <h2
              className={`font-heading font-normal text-[#3c4a28] mb-5 leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}
              style={{
                fontSize: "clamp(1.5rem, 2.3vw, 1.95rem)",
                letterSpacing: "0.08em",
              }}
            >
              {t.getInTouch[lang]}
            </h2>
            <p className="text-sm lg:text-[14px] font-normal text-gray-900 leading-[1.78] tracking-[0.01em] mb-8 max-w-[44ch] lg:h-[69.375px] lg:-translate-y-[35px]">
              {t.intro[lang]}
            </p>
            <div className="lg:-translate-y-[36px] lg:relative lg:-top-3">
              <h3 className="text-base lg:text-[17px] font-semibold text-[#3c4a28] mb-3 font-sans tracking-[0.12em] uppercase lg:relative lg:top-[18px]">
                {t.contactMs[lang]}
              </h3>
              <div className="space-y-3 text-[12px] lg:text-[13px] font-normal text-gray-900 leading-[1.7] tracking-[0.01em] lg:relative lg:-top-[17px] lg:translate-x-[2px] lg:w-[462.203px] lg:h-[120.172px]">
                <div className="flex items-center gap-2 lg:relative lg:top-[23px]">
                  <svg
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    ></path>
                  </svg>
                  <a
                    href="mailto:uyen.tran@happyfurniturenvn.com"
                    className="hover:text-black transition-colors"
                  >
                    uyen.tran@happyfurniturenvn.com
                  </a>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:top-[8px] lg:left-[2px]">
                  <svg
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    ></path>
                  </svg>
                  <span>(+84) 2516 280 180 (máy lẻ 135)</span>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:-top-[7px]">
                  <svg
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                    ></path>
                  </svg>
                  <span>(+84) 2516 280 181</span>
                </div>
              </div>
            </div>
            <div className="lg:-translate-y-[44px] lg:relative lg:-top-[55px]">
              <div className="border-t border-stone-300 my-5 lg:relative lg:top-[10px]"></div>
              <h3 className="text-base lg:text-[17px] font-semibold text-[#3c4a28] mb-3 font-sans tracking-[0.12em] uppercase lg:relative lg:-top-[10px]">
                {t.contactMr[lang]}
              </h3>
              <div className="space-y-3 text-[12px] lg:text-[13px] font-normal text-gray-900 leading-[1.7] tracking-[0.01em] lg:relative lg:-top-[21px]">
                <div className="flex items-center gap-2 lg:relative lg:-top-[2px] lg:-left-[1px]">
                  <svg
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    ></path>
                  </svg>
                  <a
                    href="mailto:service03@happyfurniturevn.com"
                    className="hover:text-black transition-colors lg:relative lg:top-px"
                  >
                    service03@happyfurniturevn.com
                  </a>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:-top-[20px]">
                  <svg
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    ></path>
                  </svg>
                  <span>(+84) 2516 280 140 (máy lẻ 0-14)</span>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:-top-[29px]">
                  <svg
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 text-gray-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                    ></path>
                  </svg>
                  <span>(+84) 2516 280 131</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GET IN TOUCH — mobile/tablet only (hiện dưới form) ══ */}
      <section className="block lg:hidden px-2 sm:px-8 md:px-14 pt-2 pb-2">
        <h2
          className={`font-heading font-normal text-[#3c4a28] mb-2 text-[26px] sm:text-[30px] leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}
          style={{ letterSpacing: "0.08em" }}
        >
          {t.getInTouch[lang]}
        </h2>
        <p className="text-xs sm:text-sm font-normal text-gray-900 leading-[1.75] tracking-[0.01em] mb-3">
          {t.intro[lang]}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-8">
          <div className="min-w-0 overflow-hidden">
            <h3 className="text-[13px] sm:text-sm font-semibold text-[#3c4a28] mb-2 font-sans tracking-[0.1em] uppercase">
              {t.contactMs[lang]}
            </h3>
            <div className="space-y-1.5 font-normal text-gray-900 leading-[1.7] tracking-[0.01em]">
              <div className="flex items-center gap-1">
                <svg
                  className="w-2.5 h-2.5 shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  ></path>
                </svg>
                <a
                  href="mailto:uyen.tran@happyfurniturenvn.com"
                  className="text-gray-900 hover:text-black transition-colors text-[8px] sm:text-[10px] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 block"
                >
                  uyen.tran@happyfurniturenvn.com
                </a>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-2.5 h-2.5 shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  ></path>
                </svg>
                <span className="text-[8px] sm:text-[10px] whitespace-nowrap">
                  (+84) 2516 280 180 (máy lẻ 135)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-2.5 h-2.5 shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                  ></path>
                </svg>
                <span className="text-[8px] sm:text-[10px] whitespace-nowrap">
                  (+84) 2516 280 181
                </span>
              </div>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden">
            <h3 className="text-[13px] sm:text-sm font-semibold text-[#3c4a28] mb-2 font-sans tracking-[0.1em] uppercase">
              {t.contactMr[lang]}
            </h3>
            <div className="space-y-1.5 font-normal text-gray-900 leading-[1.7] tracking-[0.01em]">
              <div className="flex items-center gap-1">
                <svg
                  className="w-2.5 h-2.5 shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  ></path>
                </svg>
                <a
                  href="mailto:colin.phan@happyfurniturenvn.com"
                  className="text-gray-900 hover:text-black transition-colors text-[8px] sm:text-[10px] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 block"
                >
                  colin.phan@happyfurniturenvn.com
                </a>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-2.5 h-2.5 shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  ></path>
                </svg>
                <span className="text-[8px] sm:text-[10px] whitespace-nowrap">
                  (+84) 2516 280 140 (máy lẻ 0-14)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-2.5 h-2.5 shrink-0 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                  ></path>
                </svg>
                <span className="text-[8px] sm:text-[10px] whitespace-nowrap">
                  (+84) 2516 280 131
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GOOGLE MAP ══ */}
      <section className="mt-2 lg:mt-12">
        <iframe
          title={siteCopy.common.mapTitle[lang]}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.245353164999!2d106.94629277579998!3d10.86890835773121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174e02f311ac7f1%3A0xa3663c46604b2ff!2sHappy%20Furniture!5e0!3m2!1svi!2svn!4v1711977123456!5m2!1svi!2svn"
          width="100%"
          height="260"
          className="sm:!h-[360px]"
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
