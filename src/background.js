const exclude = [
  'asana\.com'
]

updateIcon()

window.chrome.tabs.onUpdated.addListener(async function (id) {
  const tab = await getTab(id)

  var shouldExclude = exclude.some(e => {
    const regex = new RegExp(e, 'i')
    return regex.test(tab.url)
  })
  if (!shouldExclude && info.status === 'complete' && isEnabled()) {
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

function getTab (id) {
  return new Promise(r => {
    window.chrome.tabs.get(id, r)
  })
}
