import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import store from './store';

new Vue({
	el: '#app',
	store,
	render: h => h(App)
});

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
