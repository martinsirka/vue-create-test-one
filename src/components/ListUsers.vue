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

    <transition name="fade">
      <div v-if="animateImage" class="modal">
        <img ref="userImage" class="modal_image" :src="animateImage.owner.avatar_url" alt="avatar_img"/>
      </div>
    </transition>

    <Loader v-show="loading" />

    <Pagination @setPageNumber="setPageNumber" :pages="pages" />
  </div>
</template>


<script>
import axios from 'axios'
import Pagination from './Pagination.vue'
import Loader from './Loader.vue'

export default {
  name: 'ListUsers',

  components: {
    Pagination,
    Loader,
  },

  data() {
    return {
      pageNumber: 1,
      data: null,
			loading: false,
      activeEl: null,
      animateImage: null,
      dateFormat: null,
      pages: 10,
    }
  },

  mounted() {
		this.fetchData();
		this.getDate();
    window.addEventListener('scroll', this.infiniteScroll);
	},

  destroyed() {
    window.removeEventListener('scroll', this.infiniteScroll);
  },

	// watch: {
  //   // On change page number call fetchData method.
	// 	pageNumber() {
	// 		this.fetchData();
	// 	}
	// },

  methods: {
    getDate() {
			let d = new Date();
			d.setDate(d.getDate() - 3)
			this.dateFormat = d.toISOString().split('.')[0]+"Z"
		},

    setPageNumber(value) {
      isNaN(value) == false ? this.pageNumber = value + 1 : ''
      value == 'next' && (this.pageNumber < this.pages - 1) ? this.pageNumber = this.pageNumber + 1 : ''
      value == 'prev' && (this.pageNumber > 1)  ? this.pageNumber = this.pageNumber - 1 : ''

      this.fetchData();
    },
    
    async fetchData() {  
      this.loading = false
      
			const params = {
        since: this.dateFormat,
        page: this.pages,
			}


			let results = await axios.get(`/gists/public?&page=${this.pageNumber}`, {params}); 
			this.data = results.data

      // this.$router.replace({ query: {page: this.pageNumber} })
			this.loading = false
    },

    indicateState(itemId) {
      this.activeEl = itemId
      this.data.map(item => {
        item.id == itemId ? this.animateImage = item : ''
      })
      setTimeout(() => this.animateImage = null, 1000);
    },

    infiniteScroll() {

      if ( window.innerWidth > 1024 ) return

      let bottomOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight

      const params = {
        since: this.dateFormat,
        page: this.pages,
			}
   
      if(bottomOfPage) {
        
        this.loading = true
        
        axios.get(`/gists/public?&page=${this.pageNumber}`, {params})
          .then(response => {
            response.data.map( item => {
              this.data.push(item)
            })

            console.log(this.data)
          })
          .finally(
            this.loading = false
          );
      }
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
