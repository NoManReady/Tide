/**
 * Simple directive for mocking tap event
 */
export default {
  name: 'tap',
  bind (el, { value, modifiers }) {
    const threshold = window.innerWidth / 10
    let startPoint
    el.addEventListener('touchstart', e => {
      startPoint = null
      if (e.touches && e.touches.length === 1) {
        // fix e.touches bug in iOS 8.1.3
        startPoint = {
          pageX: e.touches[0].pageX,
          pageY: e.touches[0].pageY
        }
      }
    })
    el.addEventListener('touchmove', e => {
      if (startPoint) {
        if (Math.sqrt(Math.pow(e.touches[0].pageX - startPoint.pageX, 2) + Math.pow(e.touches[0].pageY - startPoint.pageY, 2)) > threshold) {
          startPoint = null
        }
      }
    })
    el.addEventListener('touchend', originalEvent => {
      if (startPoint) {
        startPoint = null
        if (modifiers.prevent) {
          originalEvent.preventDefault()
        }
        if (modifiers.stop) {
          originalEvent.stopPropagation()
        }
        // dispatch a tap event
        const tapEvent = createEvent('tap', !modifiers.capture, { originalEvent })
        if (modifiers.delay) {
          // useful for hiding el after tap that has a link inside
          // see: components/navibar.vue
          setTimeout(() => {
            el.dispatchEvent(tapEvent)
          }, value || 300)
        } else {
          el.dispatchEvent(tapEvent)
        }
      }
    })
  }
}

function createEvent (name, bubbles, mixins = {}) {
  const tapEvent = document.createEvent('HTMLEvents')
  tapEvent.initEvent(name, bubbles, true)
  return Object.assign(tapEvent, mixins)
}
