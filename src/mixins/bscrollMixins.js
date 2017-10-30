let _timer = null
export default {
  data() {
    return {
      scrollerParams: {
        page: 1,
        items: [],
        total: 0
      }
    }
  },
  mounted() {
    this.onFetch().then(d => {
      if (!d && this.$refs.scroller) {
        this.$refs.scroller.disabledUpLoad()
      }
    })
  },
  methods: {
    // 刷新
    onFresh() {
      console.log('fresh')
      // 暂存之前的page，只刷新一页
      let _page = this.scrollerParams.page
      this.scrollerParams.page = 1
      return new Promise((resolve, reject) => {
        this._loadList()
          .then(d => {
            this.scrollerParams.page = _page
            this.scrollerParams.total = d.count
            this.scrollerParams.items.splice(0, this.scrollerParams.items.length, ...d.list)
            this.$nextTick(() => {
              this.$refs.scroller.refresh()
            })
            resolve(true)
          })
      })
    },
    // 获取数据
    onFetch() {
      console.log('fetch')
      return new Promise((resolve, reject) => {
        this._loadList()
          .then(d => {
            this.scrollerParams.page++
            this.scrollerParams.total = d.count
            this.scrollerParams.items.push(...d.list)
            this.$nextTick(() => {
              this.$refs.scroller.refresh()
            })
            resolve(this.scrollerParams.items.length < this.scrollerParams.total)
          })
      })
    },
    // 清楚keyword
    onClear() {
      this.query.keyword = ''
      this.onSearch()
    },
    // 搜索数据
    onSearch() {
      console.log('search')
      this.scrollerParams.page = 1
      return new Promise((resolve, reject) => {
        if (_timer) {
          clearTimeout(_timer)
        }
        _timer = window.setTimeout(() => {
          this._loadList()
            .then(d => {
              this.scrollerParams.total = d.count
              this.scrollerParams.items = d.list
              this.$nextTick(() => {
                this.$refs.scroller.refresh()
              })
              resolve(true)
            })
        }, 500)
      })
    },
    assignQuery(query = {}) {
      return Object.assign({ page: this.scrollerParams.page }, query)
    }
  }
}