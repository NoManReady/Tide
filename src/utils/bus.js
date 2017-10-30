import Vue from 'vue'
const bus = new Vue({})
let _on = bus.$on
let _emit = bus.$emit
bus.$on = (name, fn) => {
  if (bus._events[name]) {
    bus.$off(name)
  }
  _on.call(bus, name, fn)
}
bus.$emit = (name, params) => {
  if (!params || !params.from) {
    console.warn && console.warn('The paramter(from) is null')
  }
  _emit.call(bus, name, params)
}
export default bus