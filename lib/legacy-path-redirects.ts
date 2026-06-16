/**
 * Orphan / typo URLs discovered in GSC — permanent redirects to the homepage.
 * No matching route ever existed; likely truncated external links.
 */
export const LEGACY_PATH_REDIRECTS: ReadonlyArray<{
  source: string;
  destination: string;
}> = [
  { source: "/mo", destination: "/" },
];
