import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { submitContact } from "../services/contact.service";
import { companyInfoService } from "../services/companyInfo.service";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
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

  const [companyInfos, setCompanyInfos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    companyInfoService
      .getActive()
      .then(setCompanyInfos)
      .catch(() => {});
  }, []);

  const getContact = (searchKey) => {
    const keyword = searchKey.toLowerCase();
    return companyInfos.find(
      (c) =>
        (c.nameVi || "").toLowerCase().includes(keyword) ||
        (c.nameEn || "").toLowerCase().includes(keyword),
    );
  };

  const contactMs = getContact("uyen tran") || getContact("uyen");
  const contactMr = getContact("thang nguyen") || getContact("thang");

  const mobileContactNameClass =
    lang === "vi"
      ? "text-[14px] sm:text-[15px] font-semibold text-[#3c4a28] mb-2 font-sans tracking-normal leading-[1.45] normal-case"
      : "text-[13px] sm:text-sm font-semibold text-[#3c4a28] mb-2 font-sans tracking-[0.1em]";

  const contactMsName =
    lang === "vi"
      ? contactMs
        ? contactMs.nameVi
        : "UYÊN TRẦN"
      : contactMs
        ? contactMs.nameEn || contactMs.nameVi
        : "UYEN TRAN (MS.)";
  const contactMrName =
    lang === "vi"
      ? contactMr
        ? contactMr.nameVi
        : "THẮNG NGUYỄN"
      : contactMr
        ? contactMr.nameEn || contactMr.nameVi
        : "THANG NGUYEN (MR.)";

  const getPhone = (contact) => {
    if (!contact) return "";
    return lang === "vi"
      ? contact.phoneVi
      : contact.phoneEn || contact.phoneVi || "";
  };

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

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setErrors((prev) => ({ ...prev, recaptcha: E.recaptchaRequired[lang] }));
      return;
    }

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
      recaptchaRef.current?.reset();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || E.general[lang];
      setErrors((prev) => ({ ...prev, general: msg }));
      recaptchaRef.current?.reset();
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
      <section className="pt-0 pb-2 lg:pt-0 lg:pb-14">
        <div className="w-full px-2 sm:px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)] xl:grid-cols-[1.15fr_0.85fr] items-start gap-8 lg:gap-6 xl:gap-8 lg:relative lg:h-auto xl:h-[613.25px]">
          {/* Form panel */}
          <div className="bg-[#3c4a28] px-5 sm:px-6 lg:px-8 xl:px-6 py-6 lg:py-7 xl:py-6 w-full flex flex-col lg:h-auto xl:h-[579.641px] lg:translate-y-8 xl:translate-y-[56px]">
            <h2 className="font-heading text-white text-[30px] lg:text-[30px] xl:text-[34px] font-normal tracking-[0.08em] mb-6 lg:mb-5 xl:mb-6 leading-[1.08] uppercase">
              {t.formTitle[lang]}
            </h2>

            {success ? (
              <div className="flex flex-col flex-1 items-start justify-center gap-4">
                <p className="text-white text-sm lg:text-[15px] leading-relaxed">
                  {t.successMessage[lang]}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-[#d6cec6] text-[#3c4a28] text-[12px] lg:text-[13px] tracking-[0.16em] px-10 py-2.5 hover:opacity-90 transition font-medium uppercase"
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
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 lg:gap-x-5 gap-y-5 lg:gap-y-4 xl:gap-y-5 mb-6 lg:mb-5 xl:mb-6">
                  <div>
                    <label className="block text-[11px] lg:text-[11px] xl:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.name[lang]}
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={P.name[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[14px] xl:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="text"
                    />
                    {errors.name && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[11px] xl:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.phone[lang]}
                    </label>
                    <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder={P.phone[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[14px] xl:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="tel"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.phoneNumber}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[11px] xl:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.subject[lang]}
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={P.subject[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[14px] xl:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="text"
                    />
                    {errors.subject && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.subject}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[11px] xl:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.address[lang]}
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder={P.address[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[14px] xl:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="text"
                    />
                    {errors.address && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.address}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[11px] xl:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.email[lang]}
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={P.email[lang]}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:text-[14px] xl:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                      type="email"
                    />
                    {errors.email && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] lg:text-[11px] xl:text-[12px] text-white/70 mb-1 tracking-[0.12em] uppercase">
                      {L.content[lang]}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={P.content[lang]}
                      rows={2}
                      className="w-full bg-transparent border-b border-white/30 py-1 text-sm lg:h-[37px] lg:text-[14px] xl:h-[37px] xl:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    />
                    {errors.message && (
                      <span className="text-red-300 text-[11px] mt-0.5 block">
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col lg:flex-col xl:grid xl:grid-cols-2 gap-4 lg:gap-4 xl:gap-6 items-start xl:items-end">
                  <div className="w-full overflow-hidden">
                    <div className="scale-[0.8] xl:scale-[0.85] origin-top-left w-[304px]">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        theme="dark"
                      />
                    </div>
                    {errors.recaptcha && (
                      <span className="text-red-300 text-[11px] mt-1 block">
                        {errors.recaptcha}
                      </span>
                    )}
                  </div>
                  <div className="flex w-full flex-col items-start xl:items-end gap-2">
                    {errors.general && (
                      <p className="text-red-300 text-[11px] xl:text-right">
                        {errors.general}
                      </p>
                    )}
                    <p className="text-[11px] lg:text-[11px] xl:text-[12px] text-white/40">
                      {t.requiredNote[lang]}
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#d6cec6] text-[#3c4a28] text-[12px] lg:text-[12px] xl:text-[13px] tracking-[0.16em] px-8 xl:px-10 py-2.5 hover:opacity-90 transition font-medium disabled:opacity-60 uppercase"
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
              className="font-heading font-normal text-[#3c4a28] mb-5 leading-[1.08] uppercase"
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
              <h3 className="text-base lg:text-[17px] font-semibold text-[#3c4a28] mb-3 font-sans tracking-[0.12em] lg:relative lg:top-[18px]">
                {contactMsName}
              </h3>
              <div className="space-y-3 text-[12px] lg:text-[13px] font-normal text-gray-900 leading-[1.7] tracking-[0.01em] lg:relative lg:-top-[17px] lg:translate-x-[2px] lg:w-[462.203px] lg:h-[120.172px]">
                <div className="flex items-center gap-2 lg:relative lg:top-[23px]">
                  <img
                    src="/images/icon/mail.svg"
                    alt="email"
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0"
                  />
                  <a
                    href={
                      contactMs?.email
                        ? `mailto:${contactMs.email}`
                        : "mailto:uyen.tran@happyfurniturenvn.com"
                    }
                    className="hover:text-black transition-colors"
                  >
                    {contactMs?.email || "uyen.tran@happyfurniturenvn.com"}
                  </a>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:top-[8px] lg:left-[2px]">
                  <img
                    src="/images/icon/phone.svg"
                    alt="phone"
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 lg:relative lg:-left-[2px]"
                  />
                  <span className="lg:relative lg:-left-[1px]">
                    {getPhone(contactMs) ||
                      (lang === "vi"
                        ? "(+84) 2516 280 180 (máy lẻ 135)"
                        : "(+84) 2516 280 180 (ext. 135)")}
                  </span>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:-top-[7px]">
                  <img
                    src="/images/icon/fax.svg"
                    alt="fax"
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0"
                  />
                  <span>(+84) 2516 280 181</span>
                </div>
              </div>
            </div>
            <div className="lg:h-[168.172px] lg:-translate-y-[58px] lg:relative lg:-top-[55px]">
              <div className="border-t border-stone-300 my-5 lg:relative lg:top-[10px]"></div>
              <h3 className="text-base lg:text-[17px] font-semibold text-[#3c4a28] mb-3 font-sans tracking-[0.12em] lg:h-0 lg:relative lg:-top-[10px]">
                {contactMrName}
              </h3>
              <div className="space-y-3 text-[12px] lg:text-[13px] font-normal text-gray-900 leading-[1.7] tracking-[0.01em] lg:relative lg:-top-[10px] lg:translate-x-[2px] lg:w-[462.203px] lg:h-[120.172px]">
                <div className="flex items-center gap-2 lg:relative lg:top-[14px]">
                  <img
                    src="/images/icon/mail.svg"
                    alt="email"
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0"
                  />
                  <a
                    href={
                      contactMr?.email
                        ? `mailto:${contactMr.email}`
                        : "mailto:service03@happyfurniturevn.com"
                    }
                    className="hover:text-black transition-colors"
                  >
                    {contactMr?.email || "service03@happyfurniturevn.com"}
                  </a>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:top-0 lg:left-[2px]">
                  <img
                    src="/images/icon/phone.svg"
                    alt="phone"
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0 lg:relative lg:-left-[2px]"
                  />
                  <span className="lg:relative lg:-left-[1px]">
                    {getPhone(contactMr) ||
                      (lang === "vi"
                        ? "(+84) 2516 280 140 (máy lẻ 0-14)"
                        : "(+84) 2516 280 140 (ext. 0–14)")}
                  </span>
                </div>
                <div className="flex items-center gap-2 lg:relative lg:-top-[15px]">
                  <img
                    src="/images/icon/fax.svg"
                    alt="fax"
                    className="w-3.5 h-3.5 lg:w-[14px] lg:h-[14px] shrink-0"
                  />
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
          className="font-heading font-normal text-[#3c4a28] mb-2 text-[26px] sm:text-[30px] leading-[1.08] uppercase"
          style={{ letterSpacing: "0.08em" }}
        >
          {t.getInTouch[lang]}
        </h2>
        <p className="text-xs sm:text-sm font-normal text-gray-900 leading-[1.75] tracking-[0.01em] mb-3">
          {t.intro[lang]}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-8 items-start">
          <div className="min-w-0 overflow-hidden flex h-full flex-col">
            <h3
              className={`${mobileContactNameClass} min-h-[2.6rem] sm:min-h-[2.8rem]`}
            >
              {contactMsName}
            </h3>
            <div className="grid gap-2 font-normal text-gray-900 leading-[1.7] tracking-[0.01em]">
              <div className="mb-1 grid grid-cols-[10px_minmax(0,1fr)] items-start gap-x-2">
                <img
                  src="/images/icon/mail.svg"
                  alt="email"
                  className="w-2.5 h-2.5 shrink-0 mt-[2px]"
                />
                <a
                  href="mailto:uyen.tran@happyfurniturenvn.com"
                  className="text-gray-900 hover:text-black transition-colors text-[8px] sm:text-[10px] leading-[1.45] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 block"
                >
                  uyen.tran@happyfurniturenvn.com
                </a>
              </div>
              <div className="mt-2 grid grid-cols-[10px_minmax(0,1fr)] items-start gap-x-2">
                <img
                  src="/images/icon/phone.svg"
                  alt="phone"
                  className="w-2.5 h-2.5 shrink-0 mt-[2px]"
                  style={{ position: "relative", top: "-23px" }}
                />
                <span className="text-[8px] sm:text-[10px] leading-[1.45] whitespace-nowrap" style={{ position: "relative", top: "-23px" }}>
                  {lang === "vi"
                    ? "(+84) 2516 280 180 (máy lẻ 135)"
                    : "(+84) 2516 280 180 (ext. 135)"}
                </span>
              </div>
              <div className="grid grid-cols-[10px_minmax(0,1fr)] items-start gap-x-2">
                <img
                  src="/images/icon/fax.svg"
                  alt="fax"
                  className="w-2.5 h-2.5 shrink-0 mt-[2px]"
                  style={{ position: "relative", top: "-24px" }}
                />
                <span className="text-[8px] sm:text-[10px] leading-[1.45] whitespace-nowrap" style={{ position: "relative", top: "-24px", color: "rgb(21, 29, 46)" }}>
                  (+84) 2516 280 181
                </span>
              </div>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden flex h-full flex-col">
            <h3
              className={`${mobileContactNameClass} min-h-[2.6rem] sm:min-h-[2.8rem]`}
            >
              {contactMrName}
            </h3>
            <div className="grid gap-2 font-normal text-gray-900 leading-[1.7] tracking-[0.01em]">
              <div className="grid grid-cols-[10px_minmax(0,1fr)] items-start gap-x-2">
                <img
                  src="/images/icon/mail.svg"
                  alt="email"
                  className="w-2.5 h-2.5 shrink-0 mt-[2px]"
                />
                <a
                  href="mailto:service03@happyfurniturevn.com"
                  className="text-gray-900 hover:text-black transition-colors text-[8px] sm:text-[10px] leading-[1.45] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 block"
                >
                  service03@happyfurniturevn.com
                </a>
              </div>
              <div className="grid grid-cols-[10px_minmax(0,1fr)] items-start gap-x-2">
                <img
                  src="/images/icon/phone.svg"
                  alt="phone"
                  className="w-2.5 h-2.5 shrink-0 mt-[2px]"
                />
                <span className="text-[8px] sm:text-[10px] leading-[1.45] whitespace-nowrap">
                  {lang === "vi"
                    ? "(+84) 2516 280 140 (máy lẻ 0-14)"
                    : "(+84) 2516 280 140 (ext. 0–14)"}
                </span>
              </div>
              <div className="grid grid-cols-[10px_minmax(0,1fr)] items-start gap-x-2">
                <img
                  src="/images/icon/fax.svg"
                  alt="fax"
                  className="w-2.5 h-2.5 shrink-0 mt-[2px]"
                />
                <span className="text-[8px] sm:text-[10px] leading-[1.45] whitespace-nowrap">
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
