<template>
  <div>
    <Pagination>
      <ul class="container">
        <li class="item" v-for="(item, index) in data" :key="index">
          <div class="item-wrapper">
            <img class="list-item_img" :src="item.owner.avatar_url" :alt="item.owner.type"/>
            <div class="list-item_file">
              <p v-for="(file, index) in item.files" :key="index">{{ file.filename }}</p>
            </div>
          </div>
        </li>
      </ul>
    </Pagination>
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
      data: null,
    }
  },

  async beforeCreate() {

    let d = new Date();
    d.setDate(d.getDate()-3)
    let dateFormat = d.toISOString().split('.')[0]+"Z"

    const params = {
      since: dateFormat,
      per_page: 30,
      page: 1
    }

    let data = await axios.get(`/gists/public`, {params}); 

    this.data = data.data

    console.log('DATA', this.data)
  },

}
</script>

<style scoped lang="scss">
.list{
  margin-top: 6rem;
}

.item {
  list-style: none;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.item-wrapper {
  display: flex;
  padding: 1rem 0;

    p {
      display: flex;
      align-items: center;
      margin: 0 0 0 1.5rem;
  }
}

.list-item_img {
  width: 6rem;
}

.list-item_file {
  display: flex;
  flex-wrap: wrap;
}
</style>
