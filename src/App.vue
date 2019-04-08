<template>
  <div id="app" v-loading="GLOBAL_LOADING">
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'GLOBAL_LOADING',
    ])
  }
}
</script>
