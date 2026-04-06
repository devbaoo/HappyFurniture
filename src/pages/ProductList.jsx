import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";
import { productService } from "../services/product.service";
import { categoryService } from "../services/category.service";
import { materialService } from "../services/material.service";
import { assemblyService } from "../services/assembly.service";
import useMegaMenu from "../hooks/useMegaMenu";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/LanguageContext";
import { localizeField } from "../utils/i18n";
import SEOHead from "../components/SEOHead";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";

/* ─── helpers ─────────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
];

/* ─── Dropdown wrapper ─────────────────────────────────────────── */
const FilterDropdown = ({ label, active, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center justify-center h-[36px] md:h-[40px] gap-1.5 px-3 text-[12px] md:text-[14px] bg-white transition-all duration-200 whitespace-nowrap ${active
          ? "ring-[0.5px] ring-primary text-primary font-medium"
          : "ring-[0.5px] ring-stone-400 text-stone-800 hover:ring-[#3c4a28] hover:text-[#3c4a28]"
          }`}
      >
        <span className="font-medium tracking-[0.06em] md:tracking-[0.08em] max-w-[90px] md:max-w-none truncate">{label}</span>
        <ChevronDown
          size={12}
          strokeWidth={1}
          className={`transition-transform duration-200 text-[#666] shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white ring-[0.5px] ring-stone-300 shadow-xl z-[40] w-max max-w-[calc(100vw-1rem)] px-3 py-2 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

/* ─── Skeleton card ────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-square bg-surface mb-3" />
    <div className="flex gap-2 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-6 h-6 sm:w-[26px] sm:h-[26px] rounded-sm bg-surface shrink-0" />
      ))}
    </div>
    <div className="h-3 bg-surface rounded mb-1 w-3/4" />
    <div className="h-3 bg-surface rounded w-1/3" />
  </div>
);

/* ─── Recently Viewed — localStorage ─────────────────────────── */
const RV_KEY = "hp_recently_viewed";
const RV_MAX = 6;

const saveRecentlyViewed = (products) => {
  if (!products.length) return;
  try {
    const existing = JSON.parse(localStorage.getItem(RV_KEY) || "[]");
    const existingIds = new Set(existing.map((p) => p.id));
    const fresh = products.filter((p) => !existingIds.has(p.id));
    const merged = [...fresh, ...existing].slice(0, RV_MAX);
    localStorage.setItem(RV_KEY, JSON.stringify(merged));
  } catch (e) { void e; }
};

const loadRecentlyViewed = () => {
  try { return JSON.parse(localStorage.getItem(RV_KEY) || "[]"); }
  catch (e) { void e; return []; }
};

/* ─── Main page ────────────────────────────────────────────────── */
const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories: megaCategories } = useMegaMenu();
  const { lang } = useLanguage();

  /* ── URL-driven state ────────────────────────────────────────── */
  const categoryId = searchParams.get("category") || "";
  const [nameFilter, setNameFilter] = useState(searchParams.get("name") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get("page") || 1));
  const [pageSize] = useState(Number(searchParams.get("pageSize") || 12));
  const [subCatId, setSubCatId] = useState(searchParams.get("subcat") || "");
  const [materialId, setMaterialId] = useState(searchParams.get("material") || "");
  const [assemblyId, setAssemblyId] = useState(searchParams.get("assembly") || "");

  /* ── Filter categories (Type dropdown) ───────────────────────── */
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterCatLoading, setFilterCatLoading] = useState(false);

  /* ── Materials (Material dropdown) ───────────────────────────── */
  const [materials, setMaterials] = useState([]);
  const [materialsLoading, setMaterialsLoading] = useState(false);

  /* ── Assemblies (Assembly dropdown) ──────────────────────────── */
  const [assemblies, setAssemblies] = useState([]);
  const [assembliesLoading, setAssembliesLoading] = useState(false);

  /* ── Products state ──────────────────────────────────────────── */
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Recently viewed ─────────────────────────────────────────── */
  const [recentlyViewed, setRecentlyViewed] = useState(loadRecentlyViewed);

  /* ── Favorites ───────────────────────────────────────────────── */
  const { favorites, toggleFavorite: handleToggleFavorite } = useFavorites();

  /* ── Category scroll (horizontal) ───────────────────────────── */
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  /* ── Derive current category label ──────────────────────────── */
  const allCategories = megaCategories.flatMap((c) => [c, ...(c.children || [])]);
  const activeCat = allCategories.find((c) => String(c.id) === categoryId);
  const activeCatLabel = activeCat ? localizeField(activeCat, "name", lang) : "";

  /* ── Sync nameFilter from URL (e.g. header search navigates here) */
  useEffect(() => {
    const urlName = searchParams.get("name") || "";
    setNameFilter(urlName);
  }, [searchParams]);

  /* ── Build params & fetch ────────────────────────────────────── */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [sortField, sortOrder] = sortBy
      ? sortBy.split("_")
      : [undefined, undefined];

    const effectiveCatId = subCatId || categoryId;

    try {
      const data = await productService.getProducts({
        ...(effectiveCatId ? { CategoryId: effectiveCatId } : {}),
        ...(materialId ? { MaterialId: materialId } : {}),
        ...(assemblyId ? { AssemblyId: assemblyId } : {}),
        ...(nameFilter ? { Name: nameFilter } : {}),
        ...(sortField ? { SortBy: sortField } : {}),
        ...(sortOrder ? { SortOrder: sortOrder } : {}),
        PageNumber: pageNumber,
        PageSize: pageSize,
      });
      const items = data.items ?? [];
      setProducts(items);
      setTotalCount(data.totalCount ?? 0);
      setTotalPages(data.totalPages ?? 1);
      // Save first few products of current view to recently viewed (keep nameEn for i18n)
      saveRecentlyViewed(items.slice(0, 4).map(p => ({
        id: p.id,
        name: p.name,
        nameEn: p.nameEn ?? null,
        slug: p.slug,
        images: p.images,
      })));
      setRecentlyViewed(loadRecentlyViewed());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [categoryId, subCatId, materialId, assemblyId, nameFilter, sortBy, pageNumber, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ── Sync filters → URL (for bookmarking / back-button) ──────── */
  useEffect(() => {
    const params = {};
    if (categoryId) params.category = categoryId;
    if (subCatId) params.subcat = subCatId;
    if (materialId) params.material = materialId;
    if (assemblyId) params.assembly = assemblyId;
    if (nameFilter) params.name = nameFilter;
    if (sortBy) params.sortBy = sortBy;
    if (pageNumber > 1) params.page = pageNumber;
    if (pageSize !== 12) params.pageSize = pageSize;
    setSearchParams(params, { replace: true });
  }, [categoryId, subCatId, materialId, assemblyId, nameFilter, sortBy, pageNumber, pageSize, setSearchParams]);

  /* ── Reset to page 1 whenever any filter changes ─────────────── */
  const applyFilter = (fn) => { fn(); setPageNumber(1); };

  /* ── Drag scroll handlers ────────────────────────────────────── */
  const onMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.pageX - scrollRef.current.offsetLeft);
    setDragScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.5;
  };

  /* ── Category Dots ───────────────────────────────────────────── */
  const [scrollDots, setScrollDots] = useState({ index: 0, total: 1 });
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollDots({ index: 0, total: 1 });
      return;
    }
    const dotsCount = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    const progress = Math.max(0, Math.min(1, el.scrollLeft / maxScroll));
    const index = Math.round(progress * (dotsCount - 1));
    setScrollDots({ index, total: dotsCount });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [megaCategories, handleScroll]);

  /* ── Fetch filter categories based on current categoryId ─────── */
  const prevCategoryIdRef = useRef(categoryId);
  useEffect(() => {
    if (prevCategoryIdRef.current !== categoryId) {
      setSubCatId("");
      prevCategoryIdRef.current = categoryId;
    }
  }, [categoryId]);

  useEffect(() => {
    let cancelled = false;
    setFilterCatLoading(true);
    (async () => {
      try {
        if (!categoryId) {
          const roots = await categoryService.getRootCategories();
          const safeRoots = Array.isArray(roots) ? roots : [];
          if (!cancelled) setFilterCategories(safeRoots);
        } else {
          const cat = await categoryService.getCategoryById(categoryId);
          const safeChildren = Array.isArray(cat?.children) ? cat.children : [];
          if (!cancelled) setFilterCategories(safeChildren);
        }
      } catch {
        if (!cancelled) setFilterCategories([]);
      } finally {
        if (!cancelled) setFilterCatLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [categoryId]);

  useEffect(() => {
    let cancelled = false;
    setMaterialsLoading(true);
    materialService.getActiveMaterials()
      .then((data) => {
        if (!cancelled) setMaterials(Array.isArray(data) ? data : []);
      })
      .catch(() => { if (!cancelled) setMaterials([]); })
      .finally(() => { if (!cancelled) setMaterialsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setAssembliesLoading(true);
    assemblyService.getActiveAssemblies()
      .then((data) => {
        if (!cancelled) setAssemblies(Array.isArray(data) ? data : []);
      })
      .catch(() => { if (!cancelled) setAssemblies([]); })
      .finally(() => { if (!cancelled) setAssembliesLoading(false); });
    return () => { cancelled = true; };
  }, []);

  /* ── Active filters summary (pill chips) ─────────────────────── */
  const hasActiveFilters = nameFilter || sortBy || subCatId || materialId || assemblyId;

  const clearAll = () => {
    setNameFilter("");
    setSortBy("");
    setSubCatId("");
    setMaterialId("");
    setAssemblyId("");
    setPageNumber(1);
  };

  return (
    <div>
      <SEOHead
        title={activeCatLabel ? `${activeCatLabel} — Collections` : "Collections"}
        description="Browse Happy Furniture's full collection of premium handcrafted furniture. Filter by category, material, and more to find your perfect piece."
        canonical={categoryId ? `/product?category=${categoryId}` : "/product"}
      />
      <PageBreadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Product", to: "/product" },
          ...(activeCatLabel ? [{ label: activeCatLabel }] : []),
        ]}
        containerClassName="mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full"
      />

      {/* ── Category scroll strip ────────────────────────────────── */}
      {megaCategories.length > 0 && (
        <section>
          <div className="mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full">
            <div className="pt-3 pb-1 md:pt-4">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className={`grid grid-flow-col auto-cols-[calc((100%-2*12px)/3)] md:auto-cols-[calc((100%-6*12px)/7.5)] gap-3 overflow-x-auto select-none pb-2 bg-scroll ${isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {/* "All" tile */}
                <Link
                  to="/product"
                  onClick={(e) => isDragging && e.preventDefault()}
                  draggable={false}
                  className="group relative block w-full overflow-hidden"
                >
                    <div
                    className={`w-full aspect-square md:aspect-[1/1.18] flex items-end justify-center transition-all duration-300 relative overflow-hidden ${!categoryId
                      ? "bg-primary"
                      : "bg-[#aaa] group-hover:bg-[#888]"
                      }`}
                  >
                    <span className="text-white text-[10px] font-semibold tracking-[0.12em] px-2 pb-2 uppercase text-center w-full truncate">
                      All
                    </span>
                  </div>
                </Link>

                {megaCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/product?category=${cat.id}`}
                    onClick={(e) => isDragging && e.preventDefault()}
                    draggable={false}
                    className="group relative block w-full overflow-hidden"
                  >
                    <div
                      className={`w-full aspect-square md:aspect-[1/1.18] flex items-end justify-center transition-all duration-300 relative overflow-hidden ${String(cat.id) === categoryId
                        ? "ring-2 ring-primary ring-inset"
                        : ""
                        }`}
                    >
                      {cat.imageUrl ? (
                        <img
                          src={cat.imageUrl}
                          alt={localizeField(cat, "name", lang)}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                          draggable={false}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#888] group-hover:bg-[#666] transition-colors duration-300" />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                      <span className="relative text-white text-[10px] font-semibold tracking-[0.12em] text-center leading-tight px-2 pb-2 uppercase z-10 w-full truncate">
                        {localizeField(cat, "name", lang)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <style dangerouslySetInnerHTML={{
                __html: `.cursor-grab::-webkit-scrollbar,.cursor-grabbing::-webkit-scrollbar{display:none}`
              }} />

              {/* Pagination Dots */}
              <div className="flex justify-center items-center gap-1.5 mt-0 mb-1" style={{ height: "17px" }}>
                {scrollDots.total > 1 && Array.from({ length: scrollDots.total }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === scrollDots.index ? "bg-[#333]" : "bg-[#ddd]"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Filter bar ───────────────────────────────────────────── */}
      <section className="bg-white py-1.5 z-[30] relative">
        <Container>
          <div className="flex items-center gap-[6px] flex-wrap">

            {/* Left side: FILTER button */}
            <button
              className="flex items-center justify-center gap-1.5 px-3 md:px-6 h-[36px] md:h-[40px] text-[12px] md:text-[14px] bg-white text-stone-800 tracking-[0.1em] md:tracking-[0.14em] ring-[0.5px] ring-stone-400 hover:ring-[#3c4a28] hover:text-[#3c4a28] transition-all duration-200 mr-1 md:mr-3 shrink-0 whitespace-nowrap"
            >
              <SlidersHorizontal size={13} strokeWidth={1.2} />
              <span className="font-medium">FILTER</span>
            </button>

            {/* Middle: Dropdowns all aligned to the left next to Filter */}
            <FilterDropdown
              label={subCatId ? (localizeField(filterCategories.find(c => String(c.id) === subCatId) || {}, "name", lang) || "Type") : "Type"}
              active={!!subCatId}
            >
              {filterCatLoading ? (
                <div className="text-[11px] text-muted py-1 px-1">Loading...</div>
              ) : filterCategories.length === 0 ? (
                <div className="text-[11px] text-muted py-1 px-1">No sub-categories</div>
              ) : (
                <ul className="min-w-[160px]">
                  {!categoryId && filterCategories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => {
                          setSearchParams((prev) => {
                            const p = new URLSearchParams(prev);
                            p.set("category", String(cat.id));
                            p.delete("subcat");
                            p.delete("page");
                            return p;
                          });
                        }}
                        className="w-full text-left py-1.5 px-2 text-[12px] tracking-[0.04em] hover:text-primary transition-colors text-[#333]"
                      >
                        {localizeField(cat, "name", lang)}
                      </button>
                    </li>
                  ))}
                  {categoryId && (
                    <>
                      {subCatId && (
                        <li>
                          <button
                            onClick={() => applyFilter(() => setSubCatId(""))}
                            className="w-full text-left py-1.5 px-2 text-[11px] tracking-[0.08em] uppercase text-muted hover:text-primary transition-colors border-b border-border mb-1"
                          >
                            Clear
                          </button>
                        </li>
                      )}
                      {filterCategories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => applyFilter(() => setSubCatId(String(cat.id) === subCatId ? "" : String(cat.id)))}
                            className={`w-full text-left py-1.5 px-2 text-[12px] tracking-[0.04em] hover:text-primary transition-colors ${String(cat.id) === subCatId ? "text-primary font-medium" : "text-[#333]"}`}
                          >
                            {localizeField(cat, "name", lang)}
                          </button>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              )}
            </FilterDropdown>

            <FilterDropdown
              label={materials.find(m => String(m.id) === materialId)?.name || "Material"}
              active={!!materialId}
            >
              {materialsLoading ? (
                <div className="text-[11px] text-muted py-1 px-1">Loading...</div>
              ) : materials.length === 0 ? (
                <div className="text-[11px] text-muted py-1 px-1">No materials</div>
              ) : (
                <ul className="min-w-[160px]">
                  {materialId && (
                    <li>
                      <button
                        onClick={() => applyFilter(() => setMaterialId(""))}
                        className="w-full text-left py-1.5 px-2 text-[11px] tracking-[0.08em] uppercase text-muted hover:text-primary transition-colors border-b border-border mb-1"
                      >
                        Clear
                      </button>
                    </li>
                  )}
                  {materials.map((m) => (
                    <li key={m.id}>
                      <button
                        onClick={() => applyFilter(() => setMaterialId(String(m.id) === materialId ? "" : String(m.id)))}
                        className={`w-full text-left py-1.5 px-2 text-[12px] tracking-[0.04em] hover:text-primary transition-colors ${String(m.id) === materialId ? "text-primary font-medium" : "text-[#333]"}`}
                      >
                        {m.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </FilterDropdown>

            <FilterDropdown
              label={assemblies.find(a => String(a.id) === assemblyId)?.name || "Assembly"}
              active={!!assemblyId}
            >
              {assembliesLoading ? (
                <div className="text-[11px] text-muted py-1 px-1">Loading...</div>
              ) : assemblies.length === 0 ? (
                <div className="text-[11px] text-muted py-1 px-1">No assembly types</div>
              ) : (
                <ul className="min-w-[160px]">
                  {assemblyId && (
                    <li>
                      <button
                        onClick={() => applyFilter(() => setAssemblyId(""))}
                        className="w-full text-left py-1.5 px-2 text-[11px] tracking-[0.08em] uppercase text-muted hover:text-primary transition-colors border-b border-border mb-1"
                      >
                        Clear
                      </button>
                    </li>
                  )}
                  {assemblies.map((a) => (
                    <li key={a.id}>
                      <button
                        onClick={() => applyFilter(() => setAssemblyId(String(a.id) === assemblyId ? "" : String(a.id)))}
                        className={`w-full text-left py-1.5 px-2 text-[12px] tracking-[0.04em] hover:text-primary transition-colors ${String(a.id) === assemblyId ? "text-primary font-medium" : "text-[#333]"}`}
                      >
                        {a.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </FilterDropdown>

          </div>
        </Container>
      </section>

      {/* ── Active filter chips ───────────────────────────────────── */}
      {hasActiveFilters && (
        <div className="border-b border-border">
          <Container>
            <div className="flex items-center gap-2 py-2 flex-wrap">
              {subCatId && (
                <span className="flex items-center gap-1 bg-surface px-3 py-1 text-[10px] tracking-[0.08em] uppercase">
                  Type: {localizeField(filterCategories.find(c => String(c.id) === subCatId) || {}, "name", lang) || subCatId}
                  <button onClick={() => applyFilter(() => setSubCatId(""))}><X size={10} /></button>
                </span>
              )}
              {materialId && (
                <span className="flex items-center gap-1 bg-surface px-3 py-1 text-[10px] tracking-[0.08em] uppercase">
                  Material: {materials.find(m => String(m.id) === materialId)?.name || materialId}
                  <button onClick={() => applyFilter(() => setMaterialId(""))}><X size={10} /></button>
                </span>
              )}
              {assemblyId && (
                <span className="flex items-center gap-1 bg-surface px-3 py-1 text-[10px] tracking-[0.08em] uppercase">
                  Assembly: {assemblies.find(a => String(a.id) === assemblyId)?.name || assemblyId}
                  <button onClick={() => applyFilter(() => setAssemblyId(""))}><X size={10} /></button>
                </span>
              )}
              {nameFilter && (
                <span className="flex items-center gap-1 bg-surface px-3 py-1 text-[10px] tracking-[0.08em] uppercase">
                  Name: {nameFilter}
                  <button onClick={() => applyFilter(() => setNameFilter(""))}><X size={10} /></button>
                </span>
              )}
              {sortBy && (
                <span className="flex items-center gap-1 bg-surface px-3 py-1 text-[10px] tracking-[0.08em] uppercase">
                  Sort: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <button onClick={() => applyFilter(() => setSortBy(""))}><X size={10} /></button>
                </span>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* ── Product grid ─────────────────────────────────────────── */}
      <section className="pt-4 pb-6">
        <Container>
          {loading && (
            <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-4 md:gap-x-2 md:gap-y-5">
              {Array.from({ length: pageSize }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {error && (
            <div className="py-12 text-center">
              <p className="text-sm text-red-500 mb-4">Failed to load products: {error}</p>
              <button
                onClick={fetchProducts}
                className="text-xs tracking-[0.14em] uppercase border border-primary px-6 py-2 hover:bg-primary hover:text-white transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="py-16 text-center">
              <SlidersHorizontal size={32} className="mx-auto text-muted mb-4" strokeWidth={1} />
              <p className="text-sm text-muted tracking-[0.02em] mb-2">No products found</p>
              <p className="text-xs text-muted/60">Try adjusting your filters</p>
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="mt-4 text-xs tracking-[0.14em] uppercase border border-border px-6 py-2 hover:border-primary hover:text-primary transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 md:gap-x-2 md:gap-y-5 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.slug ?? String(p.id)}
                  name={localizeField(p, "name", lang)}
                  images={p.images ?? []}
                  isFavorited={favorites.some((f) => f.id === (p.slug ?? String(p.id)))}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── Recently Viewed ──────────────────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section className="py-6 border-t border-border">
          <Container>
            <h3 className="font-heading text-lg uppercase tracking-[0.08em] font-normal mb-4 text-primary leading-[1.08]">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 md:gap-x-2 md:gap-y-5 lg:grid-cols-6">
              {recentlyViewed.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.slug ?? String(p.id)}
                  name={localizeField(p, "name", lang)}
                  isFavorited={favorites.some((f) => f.id === (p.slug ?? String(p.id)))}
                  onToggleFavorite={handleToggleFavorite}
                  images={p.images ?? []}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Pagination ───────────────────────────────────────────── */}
      {!loading && !error && totalPages > 1 && (
        <section className="pb-8 pt-2">
          <Container>
            <div className="flex items-center justify-center gap-1">
              <button
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => p - 1)}
                className="px-3 py-1.5 text-xs border border-border disabled:opacity-30 hover:border-primary hover:text-primary transition-colors disabled:cursor-not-allowed"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((pg) => pg === 1 || pg === totalPages || Math.abs(pg - pageNumber) <= 2)
                .reduce((acc, pg, i, arr) => {
                  if (i > 0 && pg - arr[i - 1] > 1) acc.push("...");
                  acc.push(pg);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-muted text-xs">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPageNumber(item)}
                      className={`w-8 h-8 text-xs border transition-colors ${pageNumber === item
                        ? "border-primary bg-primary text-white"
                        : "border-border hover:border-primary hover:text-primary"
                        }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                disabled={pageNumber >= totalPages}
                onClick={() => setPageNumber((p) => p + 1)}
                className="px-3 py-1.5 text-xs border border-border disabled:opacity-30 hover:border-primary hover:text-primary transition-colors disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
            <p className="text-center text-[10px] text-muted mt-3 tracking-wide">
              Page {pageNumber} of {totalPages} · {totalCount} products
            </p>
          </Container>
        </section>
      )}
    </div>
  );
};

export default ProductList;
