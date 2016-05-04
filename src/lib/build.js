import { createElement } from './util'

export function buildTextInput ({ classes = [], placeholder = '', value = '' }) {
  let html = ''
  html += `<div class="qs-TextInput ${classes.join(' ')}">`
  html += `<input class="qs-TextInput-input" placeholder="${placeholder}" type="text" value="${value}"/>`
  html += '</div>'
  return createElement(html)
}

export function buildButton ({ classes = [], text = '', action = () => {} }) {
  let html = `<div class="qs-Button qs-Button--sizeSmall ${classes.join(' ')}">${text}</div>`
  const $button = createElement(html)
  $button.addEventListener('click', action)
  return $button
}

export function buildBox ({ tabText = '' }) {
  let html = ''
  html += '<div class="qb-Preview">'
  html += `<div class="qb-Preview-tab">${tabText}</div>`
  html += '</div>'
  const $wrapper = createElement(html)
  $wrapper.querySelector('.qb-Preview-tab').addEventListener('click', () => {
    $wrapper.classList.toggle('qb-isOpen')
  })
  return $wrapper
}
