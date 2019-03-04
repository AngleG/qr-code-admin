import Vue from 'vue'
import elementTable from '../../views/common/table'
import customizePagination from '../../views/common/customize-pagination'
import baseItem from "../../views/base/base-item";
//注册全局组件
Vue.component('element-table', elementTable);
Vue.component('customize-pagination', customizePagination);
Vue.component('base-item', baseItem);
