/**
 * Returns the localized value for a field on an API object.
 * Convention: English field is `${field}En`, Vietnamese field is `${field}`.
 * Falls back to the Vietnamese (base) field when the English one is null/empty.
 *
 * @example
 *   localizeField(product, "name", lang)       // product.nameEn || product.name
 *   localizeField(category, "description", lang) // category.descriptionEn || category.description
 */
export function localizeField<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  lang: "en" | "vi",
): string {
  if (!obj) return "";
  if (lang === "en") {
    const enValue = obj[`${field}En`];
    if (enValue && typeof enValue === "string" && enValue.trim() !== "") {
      return enValue.trim();
    }
  }
  const base = obj[field];
  if (typeof base === "string" && base.trim() !== "") {
    return base.trim();
  }

  const viValue = obj[`${field}Vi`];
  return typeof viValue === "string" ? viValue.trim() : "";
}
