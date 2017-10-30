export default {
  computed: {
    errors() {
      return this.$verify.$errors
    }
  },
  methods: {
    onSubmit() {
      if (this.$verify.check()) {
        if (typeof (this.onSubmitConfirm) === 'function') {
          this.onSubmitConfirm()
        }
      } else {
        this.$vux.toast.show({
          text: this.$verify.$errorArray[0],
          type: 'warn',
          width: '10em'
        })
      }
    }
  }
}