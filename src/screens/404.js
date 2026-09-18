/**
 * SEHAT KENDRA — 404 / Fallback Screen
 */

export async function render404() {
  return `
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:50vh;padding:var(--space-2xl) var(--gutter-mobile);text-align:center;">
  <div style="width:5rem;height:5rem;border-radius:var(--radius-full);background:var(--color-surface-container-high);display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-lg);">
    <span class="icon" style="font-size:2.5rem;color:var(--color-on-surface-variant);" aria-hidden="true">search_off</span>
  </div>
  <h1 class="t-headline-lg" style="color:var(--color-on-surface);margin:0 0 var(--space-xs);">Page Not Found</h1>
  <p class="t-body-md" style="color:var(--color-on-surface-variant);max-width:420px;margin:0 0 var(--space-xl);">
    The page you are looking for does not exist or may have moved. Please check the URL or navigate back to the home page.
  </p>
  <a href="#/" class="btn btn-primary" data-route="/">
    <span class="icon icon-md" aria-hidden="true">home</span>
    Back to Home
  </a>
</div>`;
}
