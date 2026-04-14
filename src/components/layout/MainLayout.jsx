import { Printer, Trash2, X } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../../context/FavoritesContext";

/* ─── Print helper ──────────────────────────────────────────────── */
const printQuoteList = (favorites) => {
  const rows = favorites.map((p, idx) => {
    const primaryImg = p.images?.find((i) => i.isPrimary) ?? p.images?.[0];
    const imgHtml = primaryImg
      ? `<img src="${primaryImg.imageUrl}" alt="${p.name}" style="width:90px;height:90px;object-fit:cover;display:block;" />`
      : `<div style="width:90px;height:90px;background:#e0e0e0;"></div>`;
    const priceHtml = p.price
      ? `<p style="font-size:15px;font-weight:600;margin:6px 0 0;color:#232323;">${
          typeof p.price === "number"
            ? `${Number(p.price).toLocaleString()}$`
            : p.price
        }</p>`
      : "";
    const borderRight = idx % 2 === 0 ? "border-right:1px solid #f0f0f0;" : "";
    const variantHtml = p.variantName
      ? `<p style="font-size:12px;color:#3c4a28;margin:2px 0 0;letter-spacing:0.02em;">${p.variantName}</p>`
      : "";
    const refPrefix = p.variantSlug ? `${p.slug || String(p.id)}-` : "";
    return `
      <div style="display:flex;align-items:center;gap:16px;padding:14px 20px;border-bottom:1px solid #f0f0f0;${borderRight}break-inside:avoid;page-break-inside:avoid;">
        <div style="width:90px;height:90px;flex-shrink:0;overflow:hidden;background:#f5f5f5;border:1px solid #ece7e1;">
          ${imgHtml}
        </div>
        <div style="flex:1;min-width:0;">
          <p style="font-family:Georgia,serif;font-size:18px;font-weight:400;color:#252525;margin:0 0 2px;line-height:1.15;">${p.name}</p>
          ${variantHtml}
          <p style="font-size:11px;color:#7b7b7b;margin:4px 0 0;letter-spacing:0.1em;text-transform:uppercase;">Ref. ${refPrefix}${String(p.id).toUpperCase()}</p>
          ${priceHtml}
        </div>
      </div>`;
  });

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>My Quote List — Happy Furniture</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; color: #222; background: #fff; }
    .header { padding: 20px 24px 16px; border-bottom: 2px solid #3c4a28; display: flex; align-items: center; gap: 12px; }
    .header h1 { font-family: Georgia, serif; font-size: 28px; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; }
    .header p  { font-size: 11px; letter-spacing: 0.14em; color: #777; text-transform: uppercase; margin-top: 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; }
    .footer-note { padding: 12px 24px; font-size: 10px; color: #aaa; letter-spacing: 0.1em; text-transform: uppercase; border-top: 1px solid #f0f0f0; margin-top: 4px; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>My Quote List</h1>
      <p>${favorites.length} ${favorites.length === 1 ? "item" : "items"} — Happy Furniture</p>
    </div>
  </div>
  <div class="grid">
    ${rows.join("")}
  </div>
  <div class="footer-note">Happy Furniture &mdash; happyfurniture.com.vn &mdash; Printed ${new Date().toLocaleDateString()}</div>
</body>
</html>`;

  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  // slight delay so images can load before print dialog
  setTimeout(() => {
    win.print();
    win.close();
  }, 600);
};

/* ─── Favorite Modal ───────────────────────────────────────────── */
const FavoriteModal = () => {
  const { favorites, removeFavorite, showFavorites, setShowFavorites } = useFavorites();

  if (!showFavorites) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && setShowFavorites(false)}
    >
      <div
        className="bg-white w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl"
        id="fav-print-area"
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-6 px-6 py-5 md:px-8 md:py-6 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-4 md:gap-5">
            {/* Bookmark icon */}
            <svg className="w-7 h-7 text-[#3c4a28] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <div>
              <h2 className="font-heading text-[30px] md:text-[34px] font-normal tracking-[0.08em] uppercase text-[#222] leading-[0.98]">
                My Quote List
              </h2>
              <p className="text-xs md:text-[13px] tracking-[0.14em] text-[#777] mt-2 uppercase font-sans">
                {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {favorites.length > 0 && (
              <button
                onClick={() => printQuoteList(favorites)}
                className="hidden sm:flex items-center gap-2 border border-[#2f3e2f] text-[#2f3e2f] text-xs tracking-[0.16em] uppercase px-4 py-2.5 hover:bg-[#2f3e2f] hover:text-white transition-all duration-200 font-sans"
              >
                <Printer size={13} />
                Print list
              </button>
            )}
            <button
              onClick={() => setShowFavorites(false)}
              className="flex items-center justify-center w-10 h-10 text-[#8d8d8d] hover:text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
              aria-label="Close"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="overflow-y-auto flex-1">

          {/* Empty state */}
          {favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <svg className="w-12 h-12 text-[#ddd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <p className="font-heading text-2xl font-light text-[#8f8f8f] tracking-[0.14em] uppercase">No items in Quote List yet</p>
              <p className="text-sm text-[#a8a8a8] tracking-wide font-sans">Click the save icon on any product to add it here</p>
            </div>
          )}

          {/* Grid */}
          {favorites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              {favorites.map((p, idx) => {
                const primaryImg = p.images?.find((i) => i.isPrimary) ?? p.images?.[0];
                return (
                  <div
                    key={p.id}
                    className={`group flex items-center gap-4 px-6 py-5 md:gap-5 md:px-8 md:py-6 hover:bg-[#fcfcfc] transition-all duration-200 ${
                      idx % 2 === 0 ? "md:border-r border-[#f0f0f0]" : ""
                    } border-b border-[#f0f0f0]`}
                  >
                    {/* Thumbnail */}
                    <div className="w-[92px] h-[92px] md:w-[100px] md:h-[100px] shrink-0 overflow-hidden bg-[#f5f5f5] ring-1 ring-[#ece7e1]">
                      {primaryImg ? (
                        <img
                          src={primaryImg.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#e0e0e0]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 self-start pt-1">
                      <p className="font-heading text-[21px] md:text-[22px] font-normal text-[#252525] line-clamp-2 leading-[1.08] tracking-[0.02em]">
                        {p.name}
                      </p>
                      {p.variantName && (
                        <p className="font-sans text-[13px] md:text-[14px] text-[#3c4a28] mt-1 tracking-[0.02em]">
                          {p.variantName}
                        </p>
                      )}
                      <p className="font-sans text-xs md:text-[13px] text-[#7b7b7b] mt-2 tracking-[0.12em] uppercase">
                        Ref. {p.variantSlug ? `${p.slug || String(p.id)}-` : ""}{String(p.id).toUpperCase()}
                      </p>
                      {p.price && (
                        <p className="font-sans text-[17px] md:text-[18px] text-[#232323] mt-3 font-semibold tracking-[0.01em]">
                          {typeof p.price === "number"
                            ? `${Number(p.price).toLocaleString()}$`
                            : p.price}
                        </p>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFavorite(p.id)}
                      className="shrink-0 self-start mt-1 flex items-center justify-center w-9 h-9 text-[#b5b5b5] hover:text-red-500 hover:bg-red-50 transition-all duration-200"

                      aria-label="Remove from Quote List"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {favorites.length > 0 && (
          <div className="border-t border-[#f0f0f0] px-6 py-4 md:px-8 md:py-5 flex items-center justify-between">
            <p className="font-sans text-xs text-[#8a8a8a] tracking-[0.12em] uppercase">
              {favorites.length} saved item{favorites.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setShowFavorites(false)}
              className="font-sans text-xs tracking-[0.12em] uppercase text-[#7d7d7d] hover:text-[#1a1a1a] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// MainLayout — wraps all pages with Header and Footer
const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FavoriteModal />
    </div>
  );
};

export default MainLayout;
