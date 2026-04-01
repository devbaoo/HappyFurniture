import { Printer, Trash2, X } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../../context/FavoritesContext";

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
      <style dangerouslySetInnerHTML={{ __html: `@media print{body{visibility:hidden!important}#fav-print-area,#fav-print-area *{visibility:visible!important}#fav-print-area{position:fixed!important;top:0!important;left:0!important;width:100%!important;max-height:none!important;overflow:visible!important;box-shadow:none!important}}` }} />

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

          <div className="flex items-center gap-2 md:gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-2 border border-[#2f3e2f] text-[#2f3e2f] text-xs tracking-[0.16em] uppercase px-4 py-2.5 hover:bg-[#2f3e2f] hover:text-white transition-all duration-200 font-sans"
            >
              <Printer size={13} />
              Print list
            </button>
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
                      <p className="font-sans text-xs md:text-[13px] text-[#7b7b7b] mt-2 tracking-[0.12em] uppercase">
                        Ref. {String(p.id).toUpperCase()}
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
                      className="shrink-0 self-start mt-1 print:hidden flex items-center justify-center w-9 h-9 text-[#b5b5b5] hover:text-red-500 hover:bg-red-50 transition-all duration-200"
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
          <div className="border-t border-[#f0f0f0] px-6 py-4 md:px-8 md:py-5 flex items-center justify-between print:hidden">
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FavoriteModal />
    </div>
  );
};

export default MainLayout;
