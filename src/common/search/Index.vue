<template>
  <div v-transfer-dom>
    <popup class="component_search" :value="value" width="100%" height="100%" position="right">
      <search v-model="keyword" :placeholder="placeholder" @on-cancel="onSearch" :auto-fixed="false" ref="searchfor" class="search-box" cancel-text="搜索" @on-submit="onSearch">
        <i class="iconfont icon-back search-back" slot="left" @click="onBack"></i>
      </search>
      <!--历史搜索-->
      <div class="history-seach search-list" v-if="showHistory">
        <div class="hd vux-flexbox">
          <div class="flex-one">历史搜索</div>
          <i class="iconfont icon-delete" @click="onClear"></i>
        </div>
        <div class="bd">
          <a class="search-item" v-for="(item,index) in historySearch" :key="item" @click.prevent="goSearchByHis(item)">
            <span class="">{{item}}</span>
          </a>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { saveToLocal, loadFromLocal, removeFromLocal } from '@/utils/localStorage'
export default {
  name: 'component_search',
  title: '搜索组件',
  props: {
    showHistory: {
      type: Boolean,
      default: true
    },
    historyKey: {
      type: String,
      default: 'other'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    word: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    searchFn: {
      type: Function
    }
  },
  data() {
    return {
      results: [],
      keyword: '',
      historySearch: []
    }
  },
  created() {
    if (this.showHistory) {
      this.historySearch = loadFromLocal(this._key) || []
    }
  },
  computed: {
    _key() {
      return this.historyKey + '-history_key'
    }
  },
  watch: {
    value(v) {
      if (v) {
        this.keyword = this.word
        this.setFocus()
      } else {
        this.$refs.searchfor.setBlur()
      }
    }
  },
  methods: {
    setFocus() {
      this.$nextTick(() => {
        this.$refs.searchfor.setFocus()
      })
    },
    onClear() {
      this.historySearch = []
      removeFromLocal(this._key)
    },
    onBack() {
      this.keyword = ''
      this.$emit('input', false)
    },
    goSearchByHis(item) {
      this.keyword = item
      this.onSearch()
    },
    onSearch() {
      let _word = this.keyword.replace(/^\s+|\s+$/g, '')
      if (_word) {
        let _index = this.historySearch.findIndex(his => his === _word)
        if (_index > -1) {
          this.historySearch.splice(_index, 1)
        }
        this.historySearch.unshift(_word)
        saveToLocal(this._key, this.historySearch.slice(0, 5))
      }
      this.$emit('input', false)
      if (this.word !== _word) {
        this.$emit('update:word', _word)
        this.searchFn()
      }
    }
  }

}

</script>
<style lang="less">
.weui-search-bar {
  background-color: @theme;
  &:before {
    border: none;
  }
  &__form {
    border-radius: 4px;
  }
  &__cancel-btn {
    color: #fff
  }
}
</style>
<style lang="scss" scoped>
@import '../../style/scss/_mixin.scss';
@import '../../style/scss/_available.scss';
.weui-search-bar__form {
  border-radius: 25px;
  overflow: hidden;
}

.component_search {
  background: #fff;
  .search-back {
    color: #fff;
    padding: 5px 6px 5px 2px;
  }
  .search-list {
    padding: 0 15px;
    .hd {
      line-height: 40px;
      color: #999;
      font-size: 15px;
    }
    .bd {
      margin-left: -10px;
    }
  }
  .search-item {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    background-color: #e5e5e5;
    color: #333;
    font-size: 13px;
    border-radius: 5px;
    text-align: center;
    padding: 0 10px;
    margin: 0 0 10px 10px;
  }
}
</style>
