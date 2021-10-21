<template>
	<div>
		<div class="pagination-row">
			<span v-for="(item, index) in new Array(pages)" :key="index">
				<p @click="setPageNumber(index)" :key="`button-${index}`" :class="{ 'active_page' : isActive == index }" class="pagination-button">{{ index + 1 }}</p>
			</span>
			<button @click="prevNext('prev')" class="prev_next-button"> <Previous /> </button> 
			<button @click="prevNext('next')" class="prev_next-button"> <Next /> </button>
		</div>
	</div>
</template>

<script>
import Previous from './icons/ArrowLeft.vue'
import Next from './icons/ArrowRight.vue'

export default {
  name: 'Pagination',

	props: {
		pages: {
			type: Number,
			required: true,
		},
	},

	components: {
		Previous,
		Next,
	},

	data() {
		return {
			perPage: 30,
			isActive: 0,
		}
	},

	methods: {
		setPageNumber(index) {
			this.isActive = index
			this.$emit('setPageNumber', index)
		},

		prevNext(value) {
			value == 'next' && (this.isActive < this.pages - 1) ? this.isActive = this.isActive + 1 : ''
			value == 'prev' && (this.isActive > 0) ? this.isActive = this.isActive - 1 : ''
			
			this.$emit('setPageNumber', this.isActive)
		}
	}
}
</script>