updateIcon()

window.chrome.tabs.onUpdated.addListener((id, info) => {
  if (info.status === 'complete' && isEnabled()) {
    window.chrome.tabs.executeScript(id, {
      file: 'contentscript.js'
    })
  }
})

window.chrome.browserAction.onClicked.addListener(tab => {
  setEnabled(!isEnabled())
  updateIcon()
})

function updateIcon () {
  if (isEnabled()) {
    window.chrome.browserAction.setIcon({ path: 'sharingan128.png' })
    window.chrome.browserAction.setTitle({ title: 'Disable Sharingan' })
  } else {
    window.chrome.browserAction.setIcon({ path: 'sharinganbw128.png' })
    window.chrome.browserAction.setTitle({ title: 'Enable Sharingan' })
  }
}

function isEnabled () {
  try {
    return JSON.parse(window.localStorage.enabled)
  } catch (e) {
    return true
  }
}

function setEnabled (enabled) {
  window.localStorage.enabled = enabled
}
