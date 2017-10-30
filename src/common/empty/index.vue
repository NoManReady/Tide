<template>
    <div class="no-data">
        <div class="inner">
            <!--<i class="iconfont" :class="iconClass"></i>-->
            <i class="no-data-pic"></i>
            <p class="no-data-txt">{{emptyText}}</p>
        </div>
    </div>
</template>
<script>
export default {
    // props: {
    //     emptyText: {
    //         type: String
    //     }
    // },
    props: ['emptyText', 'iconClass'],
    computed: {
        // text() {
        //     return this.emptyText;
        // }
    },

}
</script>
<style lang="scss" scoped>
.no-data {
    padding: 30px 30px 50px;
    text-align: center;
    .inner {
        .no-data-pic {
            display: inline-block;
            width: 100px;
            height: 100px;
            background: url('../../assets/no-data.png') no-repeat center;
            background-size: 100px;
        }
        .no-data-txt{
            color: #999;
            font-size: 16px;
            margin-top:8px;
        }
    }
}
</style>