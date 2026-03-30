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
            {/* Heart icon */}
            <svg className="w-7 h-7 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <div>
              <h2 className="font-heading text-[30px] md:text-[34px] font-light tracking-[0.12em] uppercase text-[#222] leading-none">
                My Favourites
              </h2>
              <p className="text-xs md:text-[13px] tracking-[0.18em] text-[#777] mt-2 uppercase font-sans">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <p className="font-heading text-2xl font-light text-[#8f8f8f] tracking-[0.14em] uppercase">No favourites yet</p>
              <p className="text-sm text-[#a8a8a8] tracking-wide font-sans">Click the heart on any product to save it here</p>
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
                      <p className="font-heading text-[21px] md:text-[22px] font-medium text-[#252525] line-clamp-2 leading-[1.05] tracking-[0.03em]">
                        {p.name}
                      </p>
                      <p className="font-sans text-xs md:text-[13px] text-[#7b7b7b] mt-2 tracking-[0.16em] uppercase">
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
                      aria-label="Remove from favourites"
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
            <p className="font-sans text-xs text-[#8a8a8a] tracking-[0.14em] uppercase">
              {favorites.length} saved item{favorites.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setShowFavorites(false)}
              className="font-sans text-xs tracking-[0.16em] uppercase text-[#7d7d7d] hover:text-[#1a1a1a] transition-colors"
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
