/* Client-safe URL mapper:
 *  - "/media/..."  → static file baked into the app (public/)
 *  - "/gh/..."     → file living in the GitHub repo, served by the jsDelivr CDN
 */
const REPO = "adlenebenmechta/adlene-portfolio";
const CDN = `https://cdn.jsdelivr.net/gh/${REPO}@main/public`;

export function mediaUrl(src: string | undefined): string {
  if (!src) return "";
  if (src.startsWith("/gh/")) return `${CDN}${src.slice(3)}`;
  return src;
}
