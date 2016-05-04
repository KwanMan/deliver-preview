require('./main.css')

import { pollFor } from './lib/util'
import { buildBox, buildTextInput, buildButton } from './lib/build'
import { getPreviews, setPreviews, clearPreviews } from './lib/previews'

;(async function () {
  // Check for preview
  const creatives = getPreviews() || []
  await pollFor(() => document.body)

  const $container = buildBox({
    tabText: creatives.length
      ? 'Creatives: ' + creatives.join(', ')
      : 'No preview cookie'
  })
  const $creatives = buildTextInput({
    classes: ['qb-Preview-creatives'],
    placeholder: 'Creatives',
    value: creatives.join(', ')
  })
  const $submit = buildButton({
    classes: ['qb-Preview-submit'],
    text: 'Set previews',
    action: () => {
      const creatives = $creatives.querySelector('input').value.split(',').map(i => parseInt(i, 10))
      setPreviews(creatives)
      document.location.reload()
    }
  })
  const $clear = buildButton({
    classes: ['qb-Preview-clear'],
    text: 'Clear previews',
    action: () => {
      clearPreviews()
      document.location.reload()
    }
  })

  $container.appendChild($creatives)
  $container.appendChild($submit)
  $container.appendChild($clear)

  document.body.appendChild($container)
})()
