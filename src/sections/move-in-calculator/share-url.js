// Merge functional estimate state into the configured public share URL.
export function estimateShareUrl(base, parameters) {
  try {
    const url = new URL(base)
    for (const [key, value] of parameters) url.searchParams.set(key, value)
    return url.href
  } catch {
    return `${base}?${parameters}`
  }
}
