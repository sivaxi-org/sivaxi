import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface IconItem {
  name: string;
  icon: string;
}

interface IconifySearchResponse {
  icons: string[];
  total: number;
  limit: number;
  start: number;
}

/**
 * Strips fixed width/height and hardcoded fill/stroke colors so the
 * SVG inherits size and color from whatever wraps it (Tailwind classes
 * on a container div, e.g. "h-6 w-6 text-blue-500").
 */
export function normalizeIconSvg(svgString: string): string {

  const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  const svg = doc.documentElement;

  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  svg.querySelectorAll('[fill]:not([fill="none"])').forEach(el =>
    el.setAttribute('fill', 'currentColor')
  );

  svg.querySelectorAll('[stroke]:not([stroke="none"])').forEach(el =>
    el.setAttribute('stroke', 'currentColor')
  );

  return new XMLSerializer().serializeToString(svg);

}

/**
 * Client-side sanitizer for user-pasted/uploaded SVG, used ONLY so the
 * in-app preview (rendered via innerHTML) doesn't execute anything
 * malicious in the user's own session. This is NOT a security boundary -
 * anyone can call your API directly and skip this entirely. The backend
 * MUST re-sanitize (e.g. DOMPurify with an SVG profile, or svgo + a
 * strict allowlist) before persisting or serving this to other users.
 *
 * Returns null if the input isn't parseable as a valid <svg> document.
 */
export function sanitizeSvgForPreview(svgString: string): string | null {

  const trimmed = svgString.trim();

  if (!trimmed) {
    return null;
  }

  let doc: Document;

  try {
    doc = new DOMParser().parseFromString(trimmed, 'image/svg+xml');
  } catch {
    return null;
  }

  if (doc.querySelector('parsererror')) {
    return null;
  }

  const svg = doc.documentElement;

  if (svg.nodeName.toLowerCase() !== 'svg') {
    return null;
  }

  // Remove the highest-risk elements outright
  ['script', 'foreignObject', 'iframe', 'embed', 'object'].forEach(tag => {
    svg.querySelectorAll(tag).forEach(el => el.remove());
  });

  // Strip event-handler attributes and any href pointing outside the document
  const stripDangerousAttrs = (el: Element): void => {

    [...el.attributes].forEach(attr => {

      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();

      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
        return;
      }

      if (
        (name === 'href' || name === 'xlink:href') &&
        !value.startsWith('#')
      ) {
        el.removeAttribute(attr.name);
      }

    });

    [...el.children].forEach(stripDangerousAttrs);

  };

  stripDangerousAttrs(svg);

  return new XMLSerializer().serializeToString(svg);

}

/** Sanitize (preview-safety) + normalize (CSS control) in one call. */
export function sanitizeAndNormalizeCustomSvg(svgString: string): string | null {

  const sanitized = sanitizeSvgForPreview(svgString);

  if (!sanitized) {
    return null;
  }

  return normalizeIconSvg(sanitized);

}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  private readonly apiUrl = 'https://api.iconify.design';

  constructor(private http: HttpClient) {}

  searchIcons(query: string, limit = 30): Observable<IconItem[]> {

    const params = new HttpParams()
      .set('query', query)
      .set('limit', String(limit));

    return this.http
      .get<IconifySearchResponse>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response =>
          (response.icons ?? []).map(icon => ({
            name: icon.includes(':') ? icon.split(':')[1] : icon,
            icon
          }))
        )
      );

  }

  /**
   * Fetches the raw SVG markup for one icon, e.g. "mdi:home" ->
   * https://api.iconify.design/mdi/home.svg. Only called once, at
   * selection time - not for every result in the search grid.
   */
  getIconSvg(iconId: string): Observable<string> {

    const [prefix, name] = iconId.split(':');

    return this.http.get(
      `${this.apiUrl}/${prefix}/${name}.svg`,
      { responseType: 'text' }
    );

  }

}