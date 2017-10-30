<template>
  <div class="platform-select-city">
    <x-header :left-options="{backText: ''}" class="x-header">选择城市</x-header>
    <!--<search :auto-fixed="autoFixed"></search>-->
    <index-list class="pt50" :height="indexListHeight">
      <div class="select-city-top" slot="indexListTop">
        <index-list-top :index="currentIndex">
          <div class="hd">
            当前定位城市
          </div>
          <div class="bd">
            <flexbox :gutter="0" wrap="wrap" justify="space-between">
              <flexbox-item :span="4">
                <div class="city-item">
                  <i class="iconfont f-theme icon-locationfill mr5"></i>
                  <inline-loading v-if="!city.name"></inline-loading>
                  <span v-else>{{city.name}}</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </index-list-top>
        <index-list-top :index="hotIndex">
          <div class="hd">
            热门城市
          </div>
          <div class="bd">
            <flexbox :gutter="0" wrap="wrap" justify="space-between">
              <flexbox-item :span="4" v-for="(item,index) in hotCity" :key="item.id">
                <div class="city-item" @click.prevent.stop="goBussiness(item)">{{item.name}}</div>
              </flexbox-item>
            </flexbox>
          </div>
        </index-list-top>
      </div>
      <index-section v-for="(cityList,index) in cityData" :key="index" :index="index" slot="indexListContent">
        <cell v-for="(item,index) in cityList" :key="item.id" v-tap @tap.native="goBussiness(item)">
          <span slot="title">
            {{item.name}}
          </span>
        </cell>
      </index-section>
    </index-list>
  </div>
</template>
<script>
import apis from '@/api'
import {
  Search,
  Flexbox,
  FlexboxItem,
  Group,
  Cell
} from 'vux'
import IndexList from '@/common/index-list/index-list'
import IndexSection from '@/common/index-list/index-section'
import IndexListTop from '@/common/index-list/index-list-top'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  saveToLocal
} from '@/utils/localStorage'
export default {
  name: 'platform-select-city',
  title: '选择城市',
  components: {
    Search,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    IndexList,
    IndexSection,
    IndexListTop
  },
  data() {
    return {
      autoFixed: false, //搜索
      hotCity: [],
      cityData: [],
      arrayAZ: [],
      currentIndex: '#',
      hotIndex: '@',
    }
  },
  created() {
    this.getSysCity();
  },

  computed: {
    ...mapGetters(['city']),
    indexListHeight() {
      let height = document.querySelector('#app').clientHeight;
      return parseInt(height);
    }
  },
  methods: {
    ...mapActions(['setCity']),
    getSysCity() {
      apis.sysCity().then(response => {
        this.hotCity = Object.freeze(response.hot);
        delete response.hot;
        this.cityData = Object.freeze(response);
        this.arrayAZ = Object.keys(this.cityData);
      })
    },
    goBussiness(item) {
      this.setCity(item);
      //判断哪个页面来，再跳到相应的页面
      this.$router.back()
    }
  }
}

</script>
<style lang="less">
.city-list {
  .weui-cells__title {
    display: none;
  }
  .weui-cells {
    background: transparent;
    &:before,
    &:after {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
@import '../../../style/scss/_mixin.scss';
.platform-select-city {
  .x-header {
    position: fixed;
  }
}


.city-list {
  padding: 0 15px;
  .hd {
    line-height: 40px;
    color: #999;
    font-size: 16px;
  }
  .bd {
    margin-left: -10px;
  }
  .city-item {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    color: #666;
    font-size: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    text-align: center;
    margin: 0 0 10px 10px;
  }
}
</style>
