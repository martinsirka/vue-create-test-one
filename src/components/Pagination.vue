<template>
	<div>
		<div class="pagination-row">
			<span v-for="(item, index) in new Array(numberPages)" :key="index">
				<p @click="setPageNumber(index)" class="pagination-button">{{ index + 1 }}</p>
			</span>
			<button @click="setPageNumber('previous')" class="prev_next-button"> ˂ </button> 
			<button @click="setPageNumber('next')" class="prev_next-button"> > </button>
		</div>
	</div>
</template>

<script>

export default {
  name: 'Pagination',

	props: {
		totalItems: {
			type: Number,
			required: true,
		}
	},

	data() {
		return {
			perPage: 30,
		}
	},

	computed: {
		numberPages() {
			return Math.ceil(this.totalItems / this.perPage);
		}
	},

	methods: {
		setPageNumber(value) {
			this.$emit('setPageNumber', value)
		}
	}
}
</script>

<style scoped lang="scss">
    
</style>