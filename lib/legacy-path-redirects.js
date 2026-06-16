/**
 * Orphan / typo URLs discovered in GSC — permanent redirects to the homepage.
 * No matching route ever existed; likely truncated external links.
 * CommonJS for next.config.js (loaded before TS compilation).
 */
/** @type {ReadonlyArray<{ source: string; destination: string }>} */
const LEGACY_PATH_REDIRECTS = [{ source: "/mo", destination: "/" }];

module.exports = { LEGACY_PATH_REDIRECTS };
