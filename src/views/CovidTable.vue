<template>
    <b-container>
		<h1 class="mt-5">Covid cases by country</h1>
        <search-autocomplete :items="getCountries" v-model="search" @selected-item="fetchTableData"/>
		<sidebar-chart :showSidebar="showSidebarContent" :countryData="countryDataSet" @hideSidebar="showSidebarContent = false"/>

        <b-table
			striped
			hover
			:items="getTableItems"
			:fields="fields"
			:filter="filterItems"
			@row-clicked="getRowData"
			v-model="rowData"
		>
			<template slot="bottom-row">
				<td></td>
				<td></td>
				<td></td>
				<td class="text-right"><strong>TOTAL:</strong> {{ totalExpenses }}</td>
			</template>
		</b-table>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchAutocomplete from '@/components/SearchAutocomplete.vue';
import SidebarChart from './SidebarChart.vue';

export default {
	name: 'covid-table',
    components: {
        SearchAutocomplete,
		SidebarChart
    },
    data() {
        return {
            search: null,
			rowData: [],
			showSidebarContent: false,
			countryDataSet: {},
            fields: ['Country', 'Active', 'Deaths', 'Recovered']
        };
    },
	methods: {
		fetchTableData(value) {
			this.$store.dispatch('tableItemsGet', value);
		},
		getRowData(v) {
			this.showSidebarContent = !this.showSidebarContent;

			let chartDataSet = {
				'Active': v.Active,
				'Deaths': v.Deaths,
				'Recovered': v.Recovered
			}
			this.countryDataSet = chartDataSet;
		}
	},
    computed: {
		...mapGetters(['getCountries']),
        ...mapGetters(['getTableItems']),

		filterItems() {
			return this.search ? this.$store.state.selectedItem.Slug : null;
		},
		totalExpenses() {
			return this.rowData.reduce((sum, item) => {
				Object.keys(item).forEach(key => {
					if (typeof item[key] === 'number' && key !== 'Confirmed') {
						sum = sum + item[key];
					}
				});
				return sum;
			}, 0.00);
		}
    },
    created() {
        this.$store.dispatch('countriesGet');
    }
};
</script>
