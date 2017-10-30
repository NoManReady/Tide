import { getStyle } from '@/utils'
const context = '$$back_top'
export const loadMore = {
  directives: {
    'back-top': {
      bind: (el, binding) => {
        let scrollEl = el
        let backEle = document.createElement('div')
        backEle.classList.add('back-to-top')
        const calc = () => {
          if (scrollEl.scrollTop >= binding.value) {
            binding.value()
          }
        }
        el.addEventListener('scroll', calc, false)
        el[context] = {
          event: calc
        }
      },
      unbind: (el) => {
        el.removeEventListener('scroll', el[context].event, )
      }
    }
  }
}
