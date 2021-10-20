<template>
  <div>
    <ul v-if="!loading" class="container">
      <li class="item" v-for="(item, index) in data" :key="index">
        <div class="item-wrapper" @click="indicateState(item.id)">
          <div class="list-item_img">
            <img ref="userImage" class="image" :src="item.owner.avatar_url" alt="avatar_img"/>
            <div class="overlay" v-if="activeEl == item.id"></div>
          </div>
          <div class="list-item_file" :class="{ 'active_txt' : activeEl == item.id }">
            <p v-for="(file, index) in item.files" :key="index">{{ file.filename }}</p>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="loading" class="loader">
      <div class="loader_msg">
        Loading...
      </div>
    </div>

    <transition name="fade">
      <div v-if="animateImage" class="modal">
        <img ref="userImage" class="modal_image" :src="animateImage.owner.avatar_url" alt="avatar_img"/>
      </div>
    </transition>

    <Pagination @setPageNumber="setPageNumber" :totalItems="62" :pageNumber="pageNumber"></Pagination>
  </div>
</template>


<script>
import axios from 'axios'
import Pagination from './Pagination.vue'

export default {
  name: 'ListUsers',

  components: {
    Pagination,
  },

  data() {
    return {
      pageNumber: 1,
      data: null,
			dateFormat: null,
			loading: false,
      activeEl: null,
      animateImage: null,
    }
  },

  mounted() {
		this.fetchData();
		this.getDate();
	},

	watch: {
		pageNumber() {
			this.fetchData();
		}
	},

  methods: {
    getDate() {
			let d = new Date();
			d.setDate(d.getDate() - 1)
			this.dateFormat = d.toISOString().split('.')[0]+"Z"
		},

    setPageNumber(value) {
      isNaN(value) == false ? this.pageNumber = value + 1 : ''
      value == 'next' ? this.pageNumber = this.pageNumber + 1 : ''
      value == 'previous' ? this.pageNumber = this.pageNumber - 1 : ''
    },
    
    async fetchData() {
      this.loading = true

			const params = {
				since: this.dateFormat
			}

			let results = await axios.get(`/gists/public?&page=${this.pageNumber}`, {params}); 

			this.data = results.data
			this.loading = false
    },

    indicateState(itemId) {
      this.activeEl = itemId

      this.data.map(item => {
        item.id == itemId ? this.animateImage = item : ''
      })

      setTimeout(() => this.animateImage = null, 1000);
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
