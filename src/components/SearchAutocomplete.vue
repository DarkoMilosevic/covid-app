<template>
    <div class="autocomplete">
        <b-form-input
            type="text"
            placeholder="Search..."
            @input="onChange"
            v-model="search"
        />
        <b-list-group
            v-show="isOpen"
            class="autocomplete-results"
        >
            <b-list-group-item
                v-for="(result, i) in results"
                :key="i"
                @click="setResult(result)"
                class="autocomplete-result"
            >
                {{ result.Country }}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    name: 'search-autocomplete',
    props: {
        items: {
            type: Array,
            required: false,
            default: () => [],
        }
    },
    data() {
        return {
            isOpen: false,
            results: [],
            search: ''
        };
    },
    watch: {
        items: function (value, oldValue) {
            if (value.length !== oldValue.length) {
                this.results = value;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        setResult(result) {
            this.$store.commit('set_selected_item', result);
            this.$emit('selected-item', result);
            this.search = result.Country;
            this.isOpen = false;
        },
        filterResults() {
            this.results = this.items.filter((item) => {
                return (
                    item.Country.toLowerCase().indexOf(
                        this.search.toLowerCase()
                    ) > -1
                );
            });
        },
        onChange() {
            this.$emit('input', this.search);

            this.filterResults();
            this.isOpen = true;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        }
    },
};
</script>

<style>
.autocomplete {
    position: relative;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    max-width: 300px;
    max-height: 300px;
    overflow: auto;
    position: absolute;
    z-index: 999;
}

.autocomplete-result {
    cursor: pointer;
}
</style>