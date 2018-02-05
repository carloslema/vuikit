import { isRtl } from 'vuikit/src/util/dom'
import { merge, debounce } from 'vuikit/src/util/lang'
import { on, off } from 'vuikit/src/util/dom/event'
import { addClass, removeClass } from 'vuikit/src/util/class'

let id = 1

export default {
  bind (el, binding) {
    el.vkmarginid = id++

    on(window, 'resize', debounce(() => {
      update(el, binding)
    }, 10, true), `vk-margin-${el.vkmarginid}`)
  },
  inserted (el, binding, vnode) {
    vnode.context.$nextTick(() => update(el, binding))
  },
  componentUpdated (el, binding) {
    update(el, binding)
  },
  unbind (el) {
    off(window, 'resize', `vk-margin-${el.vkmarginid}`)
  }
}

function update (el, binding) {
  const options = merge({
    margin: 'uk-margin-small-top',
    firstColumn: 'uk-first-column'
  }, (binding.value || {}))

  const items = el.children

  if (!items.length || !isVisible(el)) {
    return
  }

  const { rows } = getRows(items)

  rows.forEach((row, i) =>
    row.forEach((el, j) => {
      removeClass(el, options.margin)
      removeClass(el, options.firstColumn)

      ;(i !== 0) && addClass(el, options.margin)
      ;(j === 0) && addClass(el, options.firstColumn)
    })
  )
}

function getRows (items) {
  const data = {}
  const rows = [[]]

  data.stacks = true

  for (var i = 0; i < items.length; i++) {
    const el = items[i]
    const dim = el.getBoundingClientRect()

    if (!dim.height) {
      continue
    }

    for (var j = rows.length - 1; j >= 0; j--) {
      const row = rows[j]

      if (!row[0]) {
        row.push(el)
        break
      }

      var leftDim = row[0].getBoundingClientRect()

      if (dim.top >= Math.floor(leftDim.bottom)) {
        rows.push([el])
        break
      }

      if (Math.floor(dim.bottom) > leftDim.top) {
        data.stacks = false

        if (dim.left < leftDim.left && !isRtl()) {
          row.unshift(el)
          break
        }

        row.push(el)
        break
      }

      if (j === 0) {
        rows.unshift([el])
        break
      }
    }
  }

  data.rows = rows

  return data
}

function isVisible (el) {
  return el.offsetHeight
}
