<template>
  <div>
    <ul v-show="!loading" class="container">
      <li class="item" v-for="(item, index) in data" :key="index">
        <div class="item-wrapper" @click="fadeUsersImage(item.id)">
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
        <img class="modal_image" :src="animateImage.owner.avatar_url" alt="avatar_img"/>
      </div>
    </transition>

    <Loader v-show="loading" />

    <Pagination @setPageNumber="setPageNumber" :pages="pages" :pageNumber="pageNumber" />
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
      pages: 3,
    }
  },

  mounted() {
		this.fetchData();
		this.getDate();

    if (window.innerWidth < 1024 ) {
      window.addEventListener('scroll', this.infiniteScroll)
    }
	},

  destroyed() {
    window.removeEventListener('scroll', this.infiniteScroll);
  },

	watch: {
    // On change page number call fetchData method.
		pageNumber() {
			this.fetchData();
		},
	},

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
    },
    
    async fetchData() {  
      
      const params = {
        since: this.dateFormat,
			}

      this.loading = true
			await axios.get(`/gists/public?&page=${this.pageNumber}`, {params})
        .then(response => {
          this.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          this.$router.replace({ query: {page: this.pageNumber} })
          this.loading = false
        }); 

    },

    fadeUsersImage(itemId) {
      this.activeEl = itemId
      this.data.map(item => {
        item.id == itemId ? this.animateImage = item : ''
      })
      setTimeout(() => this.animateImage = null, 1000);
    },

    async infiniteScroll() {
      
      let bottomOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight

      const params = {
        since: this.dateFormat,
        page: this.pages,
			}
   
      if(bottomOfPage) {  
        await axios.get(`/gists/public?&page=${this.pageNumber}`, {params})
          .then(response => {
            response.data.map( item => {
              this.data.push(item)
            })
          })
          .catch(error => {
            console.log(error)
          })
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
