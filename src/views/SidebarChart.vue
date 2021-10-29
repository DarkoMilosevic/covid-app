<template>
    <b-sidebar v-model="sidebarShow" no-header-close right width="50%">
		<b-row>
			<b-col>
				<div class="d-flex justify-content-end">
					<b-button @click.prevent="hideSidebar" variant="outline-danger" class="mr-5">Close</b-button>
				</div>
				<div class="px-3 py-2">
					<h3>Column chart:</h3>
					<column-chart :data="countryData"></column-chart>
				</div>
				<div class="px-3 py-2">
					<h3>Pie chart:</h3>
					<pie-chart :data="countryData"></pie-chart>
				</div>
			</b-col>
		</b-row>
    </b-sidebar>
</template>

<script>
export default {
    props: {
        showSidebar: {
            default: false,
            required: true
        },
        countryData: {
            value: Object,
            required: true
        }
    },
	computed: {
		sidebarShow: {
			get () {
				return this.showSidebar;
			},
			set (value) {
				this.$emit('update:showSidebar', value);
			}
		}
	},
	methods: {
		hideSidebar() {
			this.$emit('hideSidebar');
		}
	}
}
</script>