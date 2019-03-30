import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

	state: {
		items: [],
		fields:['name', 'priceUsd', 'marketCapUsd', 'volumeUsd24Hr', 'scroll']
	},
	getters: {
		items: (state) => state.items,
		fields: (state) => state.fields,

	},
	mutations: {
		fillTable(state, data){
			let items = [];
			for (var i = 0; i < 15; i++) {
				items.push(data[i]);
				data[i].priceUsd = '$' + parseFloat(data[i].priceUsd).toFixed(2);
				data[i].marketCapUsd = '$' + parseInt(data[i].marketCapUsd);
				data[i].volumeUsd24Hr = '$' + parseInt(data[i].volumeUsd24Hr);
			}
			state.items = items;
		},
		decreaseTable(state){
			state.fields = ['name', 'priceUsd', 'scroll'];
		},
		increaseTable(state){
			state.fields = ['name', 'priceUsd', 'marketCapUsd', 'volumeUsd24Hr', 'scroll'];
		},
		updatePrice(state, data){
			for (let key in data) {
				console.log(key, data[key]);
				let coin = state.items.find(item => item.id === key);
				coin.priceUsd = parseFloat(data[key]).toFixed(2);
				coin.priceUsd = '$' + coin.priceUsd;
				coin._rowVariant = 'info';
				window.setTimeout(() => {
					coin._rowVariant = '';
				}, 100);
			}
		}
	},
	actions: {
		makeRequest(context){
			fetch('https://api.coincap.io/v2/assets').then(response => {
				if (response.status !== 200) {	
					console.log('ERROR Status Code: ' + response.status);
					return;
				} else {
					return response.clone().json();
				}
			}).then((obj) => {
				context.commit('fillTable', obj.data);
				context.dispatch('updatePrices');
			}).catch((error) => {
				console.log(error);
			});
		},
		updatePrices(context) {
			let names = '';
			context.state.items.forEach(item => {
				names += item.name.toLowerCase() + ',';
			});
			console.log(names);
			const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=' + names);
			pricesWs.onmessage = function(msg) {
				console.log(msg.data);
				let data = JSON.parse(msg.data);
				context.commit('updatePrice', data);
			};
		}
	},
	strict: process.env.NODE_ENV !== 'production'

});