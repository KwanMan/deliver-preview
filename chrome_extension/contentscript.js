var s = document.createElement('script')
s.src = window.chrome.extension.getURL('sharingan.js')
;(document.head || document.documentElement).appendChild(s)
s.onload = function () {
  s.parentNode.removeChild(s)
}
