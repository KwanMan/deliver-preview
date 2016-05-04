export function pollFor (condition, timeout) {
  const start = now()
  function poll (resolve) {
    const result = condition()
    if (result) {
      resolve(result)
    } else {
      if (now() - start < timeout * 1000) {
        window.setTimeout(() => poll(resolve), 100)
      }
    }
  }
  return new Promise(poll)
}

export function createElement (html) {
  const el = document.createElement('div')
  el.innerHTML = html
  return el.firstChild
}

function now () {
  return (new Date()).getTime()
}
