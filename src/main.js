'use strict'

import Vue from 'vue'
import VueMq from 'vue-mq'

import App from './components/App/component.vue'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    lg: Infinity
  }
})

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
