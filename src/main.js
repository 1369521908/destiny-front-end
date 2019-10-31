import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import './styles/element-variables.scss' // element-ui theme css

import App from './App'
import store from './store'
import router from './router'

import moment from 'moment'

// Avue
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

// AntV G2
import G2 from '@antv/g2'

import '@/icons' // icon
import '@/permission' // permission control

// Vxe-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

// clipboard
import clipboard from 'clipboard'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
/* import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}*/

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// use moment.js
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})
// use Avue
Vue.use(Avue, { locale: 'zh' })
// use AntV G2
Vue.use(G2)
// use Vxe-table
Vue.use(VXETable)
// use clipboard
Vue.prototype.clipboard = clipboard

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
