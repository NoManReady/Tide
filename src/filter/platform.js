import Vue from 'vue';
//类型(1:上游,2:批发商,3:零售商)
Vue.filter('homeShopType', function(value) {
    let text = ''
    switch (value) {
        case 1:
            text = '上游';
            break;
        case 2:
            text = '批发商';
            break;
        case 3:
            text = '零售商';
            break;
    }
    return text;
})