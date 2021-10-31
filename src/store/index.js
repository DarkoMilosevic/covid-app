import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
	state: {
		countries: [],
		tableItems: [],
		selectedItem: {}
	},
	mutations: {
		set_countries(state, countries) {
			state.countries = countries;
		},
		set_table_items(state, tableItems) {
			state.tableItems = tableItems;
		},
		set_selected_item(state, selected) {
			state.selectedItem = selected;
		}
	},
	actions: {
		countriesGet({ commit }) {
			axios.get('https://api.covid19api.com/countries')
				.then(response => {
					commit('set_countries', response.data);
			})
		},
		tableItemsGet({ commit }, value) {
			axios.get(`https://api.covid19api.com/total/dayone/country/${value.Slug}`)
				.then(response => {
					let covidStats = [];
					let	countryStats = response.data.reduce((sum, item) => {
							Object.keys(item).forEach(key => {
								if (typeof item[key] === 'number') {
									sum[key] = (sum[key] || 0) + item[key];
								}
							});
							return {'Country': value.Country, ...sum};
						}, {});
					covidStats[0] = countryStats;
					commit('set_table_items', covidStats);
			})
		}
	},
	getters: {
		getCountries: (state) => {
			return state.countries;
		},
		getTableItems: (state) => {
			return state.tableItems;
		}
	}
})
