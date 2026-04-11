/** Parse focal point từ URL (_fp=X,Y), trả về src sạch và objectPosition CSS. */
export function parseFocalPoint(url: string): {
  src: string;
  objectPosition: string;
} {
  if (!url) return { src: url, objectPosition: "center" };
  const fpMatch = url.match(/[?&]_fp=([0-9]+),([0-9]+)/);
  if (fpMatch) {
    const x = Math.min(100, Math.max(0, parseInt(fpMatch[1])));
    const y = Math.min(100, Math.max(0, parseInt(fpMatch[2])));
    const src = url
      .replace(/([?&])_fp=[^&]+(&|$)/, (_, pre, post) => (post ? pre : ""))
      .replace(/[?&]$/, "");
    return { src, objectPosition: `${x}% ${y}%` };
  }
  return { src: url, objectPosition: "center" };
}
