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
		globalItems: null,
		selectedItem: {}
	},
	mutations: {
		set_countries(state, countries) {
			state.countries = countries;
		},
		set_table_items(state, tableItems) {
			state.tableItems = tableItems.Countries;
			state.globalItems = tableItems.Global.TotalConfirmed;
		},
		set_selected_item(state, selected) {
			state.selectedItem = selected;
		}
	},
	actions: {
		countriesGet({ commit }) {
			axios.get('https://api.covid19api.com/countries')
				.then(response => {
					commit('set_countries', response.data)
			})
		},
		tableItemsGet({ commit }) {
			axios.get('https://api.covid19api.com/summary')
				.then(response => {
					commit('set_table_items', response.data)
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
