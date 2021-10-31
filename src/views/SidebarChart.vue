<template>
    <b-sidebar v-model="sidebarShow" no-header-close right width="50%">
		<b-row>
			<b-col>
				<div class="px-3 py-2">
					<h3>Column chart:</h3>
					<column-chart :data="countryData"></column-chart>
				</div>
				<div class="px-3 py-2 mt-5">
					<h3>Pie chart:</h3>
					<pie-chart :data="countryData"></pie-chart>
				</div>
			</b-col>
		</b-row>
    </b-sidebar>
</template>

<script>
export default {
	name: 'sidebar-charts',
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
	}
}
</script>

<style>
.b-sidebar > .b-sidebar-body {
	overflow: hidden;
}
</style>