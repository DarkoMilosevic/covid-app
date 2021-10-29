<template>
    <b-container>
		<h1>Covid cases</h1>
        <search-autocomplete :items="getCountries" v-model="search"/>
		<sidebar-chart :showSidebar="showSidebarCont" :countryData="countryDataSet" @hideSidebar="showSidebarCont = false"/>

        <b-table
			striped
			hover
			:items="getTableItems"
			:fields="fields"
			:filter="filterItems"
			:per-page="perPage"
			:current-page="currentPage"
			@row-clicked="getRowData"
			v-model="visibleRows"
		>
			<template slot="bottom-row">
				<td></td>
				<td></td>
				<td></td>
				<td>TOTALS: {{ totalExpenses }}</td>
			</template>
		</b-table>
        <b-pagination v-model="currentPage" :total-rows="getTableItems.length" :per-page="perPage"></b-pagination>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchAutocomplete from '@/components/SearchAutocomplete.vue';
import SidebarChart from './SidebarChart.vue';

export default {
    components: {
        SearchAutocomplete,
		SidebarChart
    },
    data() {
        return {
            search: null,
            currentPage: 1,
            perPage: 10,
			visibleRows: [],
			showSidebarCont: false,
			countryDataSet: {},
            fields: ['Country', 'TotalConfirmed', 'TotalDeaths', 'TotalRecovered']
        };
    },
	methods: {
		getRowData(v) {
			this.showSidebarCont = true;

			let chartDataSet = {
				'Total Confirmed': v.TotalConfirmed,
				'Total Deaths': v.TotalDeaths,
				'Total Recovered': v.TotalRecovered
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
			return this.visibleRows.reduce((acc, item) => {
				return acc + item.TotalConfirmed;
			}, 0.00)
		}
    },
    created() {
		this.$store.dispatch('tableItemsGet');
        this.$store.dispatch('countriesGet');
    }
};
</script>
