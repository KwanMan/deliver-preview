import { get, set, clearAll } from 'cookieman'

export function setPreviews (creatives) {
  const opts = {
    path: '/'
  }
  if (window.__qubit.qtracker.options.domain) {
    opts.domain = window.__qubit.qtracker.options.domain
  }
  set('smartserve_preview', 'true', opts)
  set('etcForceCreative', JSON.stringify(creatives), opts)
}

export function clearPreviews () {
  clearAll('smartserve_preview')
  clearAll('etcForceCreative')
}

export function getPreviews () {
  if (!isSmartserveSet()) {
    return false
  }
  const cookies = get('etcForceCreative')
  if (!cookies.length) {
    return false
  }
  let creatives
  try {
    creatives = JSON.parse(cookies[0].value)
  } catch (e) {
    return false
  }
  return Array.isArray(creatives) && creatives
}

function isSmartserveSet () {
  const cookies = get('smartserve_preview')
  return cookies.length && cookies[0].value === 'true'
}
