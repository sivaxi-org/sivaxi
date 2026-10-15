
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import hljs from 'highlight.js';

const MAX_CACHE_SIZE = 300;

const PREVIEWABLE_LANGUAGES = new Set([
  'html',
  'htm',
  'svg',
]);

@Injectable({
  providedIn: 'root',
})
export class MarkdownRendererService {
  private readonly cache = new Map<string, SafeHtml>();

  constructor(private readonly sanitizer: DomSanitizer) {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }

  render(content: string): SafeHtml {
    const source =
      typeof content === 'string' ? content : String(content ?? '');

    const cached = this.cache.get(source);

    if (cached) {
      return cached;
    }

    const html = marked.parse(source, {
      async: false,
      renderer: this.createRenderer(),
    });

    const safe = this.sanitizer.bypassSecurityTrustHtml(
      html as string,
    );

    if (this.cache.size >= MAX_CACHE_SIZE) {
      const oldest = this.cache.keys().next().value;

      if (oldest !== undefined) {
        this.cache.delete(oldest);
      }
    }

    this.cache.set(source, safe);

    return safe;
  }

  private createRenderer(): any {
    const renderer = new marked.Renderer();

    renderer.code = ({ text, lang }) => {
      const language = lang
        ?.trim()
        .toLowerCase()
        .split(/\s+/)[0];

      let highlightedCode: string;

      if (language && hljs.getLanguage(language)) {
        highlightedCode = hljs.highlight(text, {
          language,
        }).value;
      } else {
        highlightedCode = hljs.highlightAuto(text).value;
      }

      const languageLabel = language || 'text';
      const previewable = this.isPreviewable(language, text);

      const previewButton = previewable
        ? `
          <button
            type="button"
            data-action="preview"
            class="code-action code-action--preview"
            aria-label="Switch between code and preview"
          >
            Code
          </button>
        `
        : '';

      const initialIframe = previewable
        ? `
          <iframe
            class="code-block__iframe"
            sandbox="allow-scripts"
            title="Code preview"
            referrerpolicy="no-referrer"
            srcdoc="${this.escapeHtml(
              this.buildPreviewDocument(text),
            )}"
          ></iframe>
        `
        : '';

      return `
        <div
          class="code-block"
          data-code="${this.encodeCode(text)}"
          data-lang="${this.escapeHtml(languageLabel)}"
          data-previewable="${previewable}"
        >
          <style>
            .code-block {
              margin: 1rem 0;
              overflow: hidden;
              border: 1px solid var(--sivaxi-border-soft, #30333c);
              border-radius: 14px;
              background: var(--sivaxi-bg, #111318);
              color: var(--sivaxi-text, #f4f2ed);
            }

            .code-block__header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 12px;
              padding: 10px 14px;
              background: var(--sivaxi-surface, #1b1d24);
              border-bottom: 1px solid var(--sivaxi-border-soft, #30333c);
            }

            .code-block__language {
              color: var(--sivaxi-text-muted, #a1a1aa);
              font-size: 11px;
              font-weight: 700;
              letter-spacing: .08em;
              text-transform: uppercase;
            }

            .code-block__actions {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .code-block .code-action {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              min-height: 30px;
              padding: 5px 11px;
              border: 1px solid transparent;
              border-radius: 8px;
              font-family: inherit;
              font-size: 12px;
              font-weight: 600;
              line-height: 1.2;
              white-space: nowrap;
              cursor: pointer;
              transition:
                background-color 160ms ease,
                color 160ms ease,
                border-color 160ms ease,
                transform 160ms ease;
            }

            .code-block .code-action--preview {
              color: #b8e5d8;
              background: rgb(61 140 120 / 14%);
              border-color: rgb(61 140 120 / 35%);
            }

            .code-block .code-action--preview:hover {
              color: #ffffff;
              background: #3d8c78;
              border-color: #3d8c78;
            }

            .code-block .code-action--copy {
              color: var(--sivaxi-text-muted, #a1a1aa);
              background: transparent;
              border-color: var(--sivaxi-border-soft, #30333c);
            }

            .code-block .code-action--copy:hover {
              color: var(--sivaxi-text, #f4f2ed);
              background: rgb(255 255 255 / 6%);
              border-color: rgb(255 255 255 / 16%);
            }

            .code-block .code-action:active {
              transform: scale(.97);
            }

            .code-block .code-action:focus-visible {
              outline: 2px solid #3d8c78;
              outline-offset: 3px;
            }

            .code-block__code {
              overflow-x: auto;
            }

            .code-block__code pre {
              margin: 0;
              padding: 16px;
              overflow-x: auto;
              background: transparent;
              font-size: 13px;
              line-height: 1.65;
              tab-size: 2;
            }

            .code-block__code code {
              font-family:
                "JetBrains Mono",
                "Fira Code",
                Consolas,
                monospace;
            }

            .code-block__preview {
              overflow: hidden;
              background: #ffffff;
            }

            .code-block__iframe {
              display: block;
              width: 100%;
              min-height: 320px;
              border: 0;
              background: #ffffff;
            }

            .code-block__code[hidden],
            .code-block__preview[hidden] {
              display: none !important;
            }

            @media (max-width: 480px) {
              .code-block__header {
                padding: 9px 10px;
              }

              .code-block .code-action {
                min-height: 28px;
                padding: 5px 8px;
                font-size: 11px;
              }

              .code-block__code pre {
                padding: 12px;
                font-size: 12px;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .code-block .code-action {
                transition: none;
              }
            }
          </style>

          <div class="code-block__header">
            <span class="code-block__language">
              ${this.escapeHtml(languageLabel)}
            </span>

            <div class="code-block__actions">
              ${previewButton}

              <button
                type="button"
                data-action="copy"
                class="code-action code-action--copy"
              >
                Copy
              </button>
            </div>
          </div>

          <div
            class="code-block__code"
            ${previewable ? 'hidden' : ''}
          >
            <pre><code class="hljs">${highlightedCode}</code></pre>
          </div>

          <div
            class="code-block__preview"
            ${previewable ? '' : 'hidden'}
          >
            ${initialIframe}
          </div>
        </div>
      `;
    };

    return renderer;
  }

  handleClick(event: Event): void {
    const target = event.target as HTMLElement | null;

    const button = target?.closest<HTMLElement>(
      'button[data-action]',
    );

    if (!button) {
      return;
    }

    const block = button.closest<HTMLElement>('.code-block');

    if (!block) {
      return;
    }

    const code = decodeURIComponent(
      block.dataset['code'] ?? '',
    );

    switch (button.dataset['action']) {
      case 'copy':
        void this.copy(button, code);
        break;

      case 'preview':
        this.togglePreview(block, button, code);
        break;
    }
  }

  private async copy(
    button: HTMLElement,
    code: string,
  ): Promise<void> {
    const originalText = button.textContent?.trim() || 'Copy';
    const copied = await this.copyText(code);

    button.textContent = copied ? 'Copied!' : 'Copy failed';

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  }

  private async copyText(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Try the fallback below.
    }

    const textarea = document.createElement('textarea');

    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    document.body.appendChild(textarea);

    try {
      textarea.select();
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      textarea.remove();
    }
  }

  private togglePreview(
    block: HTMLElement,
    button: HTMLElement,
    code: string,
  ): void {
    const codePane = block.querySelector<HTMLElement>(
      '.code-block__code',
    );

    const previewPane = block.querySelector<HTMLElement>(
      '.code-block__preview',
    );

    if (!codePane || !previewPane) {
      return;
    }

    if (!previewPane.hidden) {
      previewPane.hidden = true;
      previewPane.replaceChildren();

      codePane.hidden = false;
      button.textContent = 'Preview';

      return;
    }

    const iframe = document.createElement('iframe');

    iframe.className = 'code-block__iframe';
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.setAttribute('title', 'Code preview');
    iframe.setAttribute('referrerpolicy', 'no-referrer');
    iframe.srcdoc = this.buildPreviewDocument(code);

    previewPane.replaceChildren(iframe);
    previewPane.hidden = false;

    codePane.hidden = true;
    button.textContent = 'Code';
  }

  private isPreviewable(
    language: string | undefined,
    code: string,
  ): boolean {
    if (language && PREVIEWABLE_LANGUAGES.has(language)) {
      return true;
    }

    if (!language) {
      return /^\s*(<!doctype\s+html|<html[\s>])/i.test(code);
    }

    return false;
  }

  private buildPreviewDocument(code: string): string {
    const trimmedCode = code.trim();

    if (/^\s*(<!doctype\s+html|<html[\s>])/i.test(trimmedCode)) {
      return trimmedCode;
    }

    if (/^\s*<svg[\s>]/i.test(trimmedCode)) {
      return `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            >
            <style>
              html, body {
                margin: 0;
                min-height: 100%;
                background: #ffffff;
              }

              body {
                box-sizing: border-box;
                display: grid;
                place-items: center;
                padding: 16px;
              }

              svg {
                max-width: 100%;
                max-height: 80vh;
                height: auto;
              }
            </style>
          </head>
          <body>
            ${trimmedCode}
          </body>
        </html>
      `;
    }

    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          >

          <style>
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }

            html {
              color-scheme: light;
            }

            body {
              margin: 0;
              padding: 16px;
              font-family:
                Inter,
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                sans-serif;
              color: #1f2937;
              background: #ffffff;
              line-height: 1.5;
            }

            img,
            video,
            canvas,
            svg {
              max-width: 100%;
            }

            pre {
              max-width: 100%;
              overflow: auto;
              padding: 12px;
              border-radius: 8px;
              background: #f3f4f6;
            }

            table {
              max-width: 100%;
              border-collapse: collapse;
            }

            th,
            td {
              padding: 8px;
              border: 1px solid #d1d5db;
              text-align: left;
            }

            input,
            button,
            select,
            textarea {
              font: inherit;
            }
          </style>
        </head>

        <body>
          ${trimmedCode}
        </body>
      </html>
    `;
  }

  private encodeCode(code: string): string {
    return encodeURIComponent(code).replace(/'/g, '%27');
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
