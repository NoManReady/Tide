<!--页面通用布局，接收tabs数组参数等配置-->
<template>
  <div class="layout">
    <transition :name="pageAnimation||directionClass">
      <keep-alive :include="includes">
        <router-view class="layout-container" :class="containerClass" :style="pBottom" :sid="sid"></router-view>
      </keep-alive>
    </transition>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <tabbar v-model="activeTab" v-show="commonTabbar" class="animated tabbar-animated">
        <slot>
          <tabbar-item v-for="tab in tabs" :key="tab.id" :link="tab.link">
            <i class="iconfont" :class="[tab.icon]" slot="icon"></i>
            <span slot="label">{{tab.title}}</span>
          </tabbar-item>
        </slot>
      </tabbar>
    </transition>
    <slot name="other"></slot>
    <!-- 店铺选择confirm -->
    <div v-transfer-dom>
      <confirm v-model="showCheckShops" title="选择店铺" @on-cancel="_onShopCancel" @on-confirm="_onShopConfirm">
        <div v-for="item in shopList" :key="item.sid" class="tl mt10">
          <check-icon :value.sync="item.check" @click.native="_onSelectShop(item.sid)">{{item.name||'未知'}}</check-icon>
        </div>
      </confirm>
    </div>
    <!-- 定位 -->
    <div v-transfer-dom>
      <toast :is-show-mask="true" :time="15000" position="middle" :value="locationLoading" type="text" width="10em">
        <inline-loading></inline-loading>
        <p>城市定位中...</p>
      </toast>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'layout',
  title: '布局页面',
  props: {
    // router-view样式
    containerClass: {
      type: String,
      default: 'gc-layout-container'
    },
    // 页面底部tab
    tabs: {
      type: Array,
      default: () => []
    },
    // 页面过渡动画
    pageAnimation: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      includes: ['platform-select-city'],
      // tab-active索引
      activeTab: -1,
      // 店铺id
      sid: '',
      // 店铺confirm modal
      showCheckShops: false
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  created() {
    this._handlerTabbar()
    // 用户登出
    this.$bus.$on('$$userLogout', this._userLogout)
    // 重置索引
    this.$bus.$on('$$resetTabIndex', this._onResetTabIndex)
    // 进入子平台check
    this.$bus.$on('$$goManageSysCheck', this._goManageSysCheck)
    this.sid = this.$route.query.sid || this.shopSid
    if (!this.$store.getters.city || !this.$store.getters.city.id) {
      this.$geolocation()
    }
  },
  watch: {
    $route(to, from) {
      this._handlerTabbar()
    }
  },
  computed: {
    ...mapGetters(['commonTabbar', 'direction', 'userSignShops', 'shopSid', 'isSettle', 'locationLoading']),
    // bottom padding
    pBottom() {
      return {
        'padding-bottom': this.commonTabbar ? '50px' : 0
      }
    },
    // 动画方向
    directionClass() {
      return this.direction === 'forward' ? 'vux-pop-in' : 'vux-pop-out'
    },
    // 店铺列表
    shopList() {
      return this.userSignShops.map(s => {
        return {
          ...s,
          check: s.sid == this.sid
        }
      })
    }
  },
  methods: {
    ...mapActions(['setCommonTabbar', 'logout', 'setSid']),
    // 判断当前tab索引
    _getPageIndex() {
      return this.$route.meta.showTabbar > -1 ? this.$route.meta.showTabbar : -1
    },
    //切换tabbar
    _handlerTabbar() {
      let _index = this._getPageIndex();
      this.activeTab = _index
      if (_index > -1) {
        this.setCommonTabbar(true)
      } else {
        this.setCommonTabbar(false)
      }
    },
    //  重置tabindex
    _onResetTabIndex() {
      this.$nextTick(() => {
        this.activeTab = this._getPageIndex()
      })
    },
    //  用户登出
    _userLogout({ from }) {
      let vm = this
      this.$vux.confirm.show({
        content: '确认退出吗？',
        title: '友情提示',
        onCancel() {
        },
        onConfirm() {
          vm.logout().then(d => {
            vm.$router.replace({ name: 'login' })
          })
        }
      })
    },
    // 选择店铺
    _onSelectShop(sid) {
      this.sid = sid
    },
    // 选择店铺确定
    _onShopConfirm() {
      if (!this.sid && this.sid !== 0) {
        return
      }
      this.setSid(this.sid)
      this._redirectCheck()
    },
    // 选择店铺取消
    _onShopCancel() {
      this.sid = ''
    },
    // 判断是否具有sid
    _goManageSysCheck({ from, iSswitch }) {
      if (!this.isSettle) {
        this.$router.push({ name: 'platformSeller' })
      } else {
        if (this.userSignShops.length == 1 && !iSswitch) {
          this.setSid(this.userSignShops[0].sid)
          this._redirectCheck()
          return
        }
        // 如果不存在sid或则强制切换或则商铺数量大于2
        if ((!this.sid && this.sid !== 0) || iSswitch || this.userSignShops.length > 1) {
          this.sid = !this.sid && this.sid !== 0 ? this.userSignShops[0].sid : this.sid
          this.showCheckShops = true
        } else {
          this._redirectCheck()
        }
      }
    },
    // 判断sid，跳转店铺对应的管理页
    _redirectCheck() {
      if (this.shopSid === 0) {
        // 搬运
        this.$router.push({ name: 'delivery' })
      } else {
        // 商户
        this.$router.push({ name: 'business' })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.tabbar-animated {
  animation-duration: .2s;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.layout-container {
  height: 100%;
  overflow-y: auto;
}
</style>
